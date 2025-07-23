import json
import os
from pathlib import Path

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func

from db.cfg import engine, Base
from db.models import Review, Comment, Rating, \
    CourseProgress, LectureHistory, User
from db.utils import get_db
from endpoints.courses import courses_router
from endpoints.lectures import lectures_router
from endpoints.teachers import teacher_router
from endpoints.users import users_router
from pydantic_models.models import ReviewSchema, CommentSchema, RatingSchema, ReviewCreate, \
    CommentCreate, RatingCreate, ProgressCreate, HistoryCreate

app = FastAPI(openapi_prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*", "localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)


app.include_router(teacher_router)
app.include_router(courses_router)
app.include_router(users_router)
app.include_router(lectures_router)


# Эндпоинт для отдачи видеофайлов
@app.get("/video/{course_id}/{lecture_file}")
async def get_video_file(course_id: int, lecture_file: str):
    """Отдает видеофайл лекции"""
    # Убираем расширение из имени файла, если оно есть
    clean_filename = lecture_file.replace('.mp4', '')
    
    # Путь к видеофайлу
    video_path = Path(f"common/data/course_{course_id}/{clean_filename}.mp4")
    
    # Проверяем, что файл существует
    if not video_path.exists():
        raise HTTPException(status_code=404, detail="Video file not found")
    
    return FileResponse(
        path=str(video_path),
        media_type='video/mp4',
        filename=f"{clean_filename}.mp4"
    )


# ===== Review, Comment, Rating, Progress, History Endpoints =====

@app.get("/reviews")
def get_reviews(course_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Review)
    if course_id:
        query = query.filter(Review.course_id == course_id)
    return query.all()


@app.get("/reviews/course/{course_id}/stats")
def get_course_rating_stats(course_id: int, db: Session = Depends(get_db)):
    reviews = db.query(Review).filter(Review.course_id == course_id).all()
    
    if not reviews:
        return {
            "averageRating": 0,
            "totalReviews": 0,
            "ratingDistribution": [0, 0, 0, 0, 0]
        }
    
    ratings = [review.rating for review in reviews]
    average_rating = sum(ratings) / len(ratings)
    
    # Распределение рейтингов (1-5 звезд)
    distribution = [0, 0, 0, 0, 0]
    for rating in ratings:
        if 1 <= rating <= 5:
            distribution[rating - 1] += 1
    
    return {
        "averageRating": round(average_rating, 1),
        "totalReviews": len(reviews),
        "ratingDistribution": distribution
    }


@app.post("/reviews", response_model=ReviewSchema, status_code=201)
def create_review(data: ReviewCreate, db: Session = Depends(get_db)):
    rev = Review(**data.dict())
    db.add(rev)
    db.commit()
    db.refresh(rev)
    return rev


@app.get("/comments")
def get_comments(lecture_id: int = None, course_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Comment)
    if lecture_id:
        query = query.filter(Comment.lecture_id == lecture_id)
    if course_id:
        query = query.filter(Comment.course_id == course_id)
    return query.order_by(Comment.date.desc()).all()


@app.get("/comments/lecture/{lecture_id}")
def get_lecture_comments(lecture_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.lecture_id == lecture_id).order_by(Comment.date.desc()).all()
    return comments


@app.post("/comments", response_model=CommentSchema, status_code=201)
def create_comment(data: CommentCreate, db: Session = Depends(get_db)):
    com = Comment(**data.dict())
    db.add(com)
    db.commit();
    db.refresh(com)
    return com


@app.post("/ratings", response_model=RatingSchema, status_code=201)
def create_rating(data: RatingCreate, db: Session = Depends(get_db)):
    rt = Rating(**data.dict())
    db.add(rt)
    db.commit()
    db.refresh(rt)
    return rt


@app.post("/progress", status_code=201)
def create_progress(data: ProgressCreate, db: Session = Depends(get_db)):
    # Check if progress already exists
    existing = db.query(CourseProgress).filter(
        CourseProgress.user_id == data.user_id,
        CourseProgress.course_id == data.course_id
    ).first()
    
    if existing:
        # Update existing progress
        existing.completed_lectures = json.dumps(data.completed_lectures)
        existing.last_watched_lecture = data.last_watched_lecture
        existing.overall_progress = data.overall_progress
        existing.last_position = data.last_position
        existing.last_updated = data.last_updated
        db.commit()
        db.refresh(existing)
        return data
    else:
        # Create new progress
        cp = CourseProgress(
            user_id=data.user_id,
            course_id=data.course_id,
            completed_lectures=json.dumps(data.completed_lectures),
            last_watched_lecture=data.last_watched_lecture,
            overall_progress=data.overall_progress,
            last_position=data.last_position,
            last_updated=data.last_updated
        )
        db.add(cp)
        db.commit()
        db.refresh(cp)
        return data


@app.get("/progress/courses/{course_id}")
def get_course_progress(course_id: int, user_id: int, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        print(f"Warning: User with ID {user_id} not found in database. Available users: {[u.id for u in db.query(User).all()]}")
        return None
        
    progress = db.query(CourseProgress).filter(
        CourseProgress.user_id == user_id,
        CourseProgress.course_id == course_id
    ).first()
    
    if not progress:
        print(f"No progress found for user {user_id} in course {course_id}")
        return None
        
    # Parse completed_lectures JSON
    completed_lectures = json.loads(progress.completed_lectures) if progress.completed_lectures else []
    
    return {
        "userId": str(progress.user_id),
        "courseId": progress.course_id,
        "completedLectures": completed_lectures,
        "lastWatchedLecture": progress.last_watched_lecture,
        "overallProgress": progress.overall_progress,
        "lastPosition": progress.last_position,
        "lastUpdated": progress.last_updated
    }


@app.get("/progress/my-progress")
def get_user_progress(user_id: int, db: Session = Depends(get_db)):
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        print(f"Warning: User with ID {user_id} not found in database. Available users: {[u.id for u in db.query(User).all()]}")
        return []
        
    progress_list = db.query(CourseProgress).filter(CourseProgress.user_id == user_id).all()
    
    result = []
    for progress in progress_list:
        completed_lectures = json.loads(progress.completed_lectures) if progress.completed_lectures else []
        result.append({
            "userId": str(progress.user_id),
            "courseId": progress.course_id,
            "completedLectures": completed_lectures,
            "lastWatchedLecture": progress.last_watched_lecture,
            "overallProgress": progress.overall_progress,
            "lastPosition": progress.last_position,
            "lastUpdated": progress.last_updated
        })
    
    return result


@app.put("/progress/courses/{course_id}")
def update_course_progress(course_id: int, user_id: int, progress_data: dict, db: Session = Depends(get_db)):
    progress = db.query(CourseProgress).filter(
        CourseProgress.user_id == user_id,
        CourseProgress.course_id == course_id
    ).first()
    
    if not progress:
        # Create new progress if doesn't exist
        progress = CourseProgress(
            user_id=user_id,
            course_id=course_id,
            completed_lectures=json.dumps(progress_data.get('completedLectures', [])),
            last_watched_lecture=progress_data.get('lastWatchedLecture', ''),
            overall_progress=progress_data.get('overallProgress', 0),
            last_position=progress_data.get('lastPosition', 0),
            last_updated=progress_data.get('lastUpdated', '')
        )
        db.add(progress)
    else:
        # Update existing progress
        if 'completedLectures' in progress_data:
            progress.completed_lectures = json.dumps(progress_data['completedLectures'])
        if 'lastWatchedLecture' in progress_data:
            progress.last_watched_lecture = progress_data['lastWatchedLecture']
        if 'overallProgress' in progress_data:
            progress.overall_progress = progress_data['overallProgress']
        if 'lastPosition' in progress_data:
            progress.last_position = progress_data['lastPosition']
        if 'lastUpdated' in progress_data:
            progress.last_updated = progress_data['lastUpdated']
    
    db.commit()
    db.refresh(progress)
    
    completed_lectures = json.loads(progress.completed_lectures) if progress.completed_lectures else []
    return {
        "userId": str(progress.user_id),
        "courseId": progress.course_id,
        "completedLectures": completed_lectures,
        "lastWatchedLecture": progress.last_watched_lecture,
        "overallProgress": progress.overall_progress,
        "lastPosition": progress.last_position,
        "lastUpdated": progress.last_updated
    }


@app.get("/progress/lectures/{lecture_id}")
def get_lecture_history(lecture_id: str, user_id: int, db: Session = Depends(get_db)):
    history = db.query(LectureHistory).filter(
        LectureHistory.user_id == user_id,
        LectureHistory.lecture_id == lecture_id
    ).first()
    
    if not history:
        return None
        
    return {
        "lectureId": history.lecture_id,
        "watchedDuration": history.watched_duration,
        "totalDuration": history.total_duration,
        "completed": history.completed,
        "lastPosition": history.last_position
    }


@app.put("/progress/lectures/{lecture_id}")
def update_lecture_history(lecture_id: str, user_id: int, history_data: dict, db: Session = Depends(get_db)):
    history = db.query(LectureHistory).filter(
        LectureHistory.user_id == user_id,
        LectureHistory.lecture_id == lecture_id
    ).first()
    
    if not history:
        # Create new history if doesn't exist
        history = LectureHistory(
            user_id=user_id,
            lecture_id=lecture_id,
            watched_duration=history_data.get('watchedDuration', 0),
            total_duration=history_data.get('totalDuration', 0),
            completed=history_data.get('completed', False),
            last_position=history_data.get('lastPosition', 0),
            last_updated=history_data.get('lastUpdated', '')
        )
        db.add(history)
    else:
        # Update existing history
        if 'watchedDuration' in history_data:
            history.watched_duration = history_data['watchedDuration']
        if 'totalDuration' in history_data:
            history.total_duration = history_data['totalDuration']
        if 'completed' in history_data:
            history.completed = history_data['completed']
        if 'lastPosition' in history_data:
            history.last_position = history_data['lastPosition']
        if 'lastUpdated' in history_data:
            history.last_updated = history_data['lastUpdated']
    
    db.commit()
    db.refresh(history)
    
    return {
        "lectureId": history.lecture_id,
        "watchedDuration": history.watched_duration,
        "totalDuration": history.total_duration,
        "completed": history.completed,
        "lastPosition": history.last_position
    }


@app.delete("/progress/courses/{course_id}")
def reset_course_progress(course_id: int, user_id: int, db: Session = Depends(get_db)):
    progress = db.query(CourseProgress).filter(
        CourseProgress.user_id == user_id,
        CourseProgress.course_id == course_id
    ).first()
    
    if progress:
        db.delete(progress)
        db.commit()
    
    return {"message": "Progress reset successfully"}


@app.post("/history", status_code=201)
def create_history(data: HistoryCreate, db: Session = Depends(get_db)):
    lh = LectureHistory(
        user_id=data.user_id,
        lecture_id=data.lecture_id,
        watched_duration=data.watched_duration,
        total_duration=data.total_duration,
        completed=data.completed,
        last_position=data.last_position,
        last_updated=data.last_updated if hasattr(data, 'last_updated') else None
    )
    db.add(lh)
    db.commit()
    db.refresh(lh)
    return lh
