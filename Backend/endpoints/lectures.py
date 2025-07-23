from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.models import Lecture, Teacher, Tag
from db.utils import get_db
from pydantic_models.models import LectureSchema, LectureCreate

lectures_router=APIRouter()


@lectures_router.get('/lectures')
def list_lectures(db: Session = Depends(get_db)):
    return db.query(Lecture).all()


@lectures_router.get('/lectures/{lecture_id}', response_model=LectureSchema)
def get_lecture(lecture_id: int, db: Session = Depends(get_db)):
    lec = db.query(Lecture).get(lecture_id)
    if not lec: raise HTTPException(404, 'Lecture not found')
    return lec


@lectures_router.post('/lectures', response_model=LectureSchema, status_code=201)
def create_lecture(data: LectureCreate, db: Session = Depends(get_db)):
    # Create or fetch tags
    tag_objs = []
    for t in data.tags:
        tag = db.query(Tag).get(t) or Tag(tag=t)
        tag_objs.append(tag)
    # Fetch teachers
    teacher_objs = db.query(Teacher).filter(Teacher.id.in_(data.teacher_ids)).all()
    lec = Lecture(
        external_id=data.external_id,
        title=data.title,
        number=data.number,
        content=data.content,
        video_url=data.video_url,
        presentation_slides=data.presentation_slides,
        teachers=teacher_objs,
        tags=tag_objs,
        course_id=None  # Must set via query param or include in LectureCreate
    )
    db.add(lec)
    db.commit()
    db.refresh(lec)
    return lec


@lectures_router.put('/lectures/{lecture_id}', response_model=LectureSchema)
def update_lecture(lecture_id: int, data: LectureCreate, db: Session = Depends(get_db)):
    lec = db.query(Lecture).get(lecture_id)
    if not lec: raise HTTPException(404, 'Lecture not found')
    for field, value in data.model_dump().items():
        if field in ('tags', 'teacher_ids'): continue
        setattr(lec, field, value)
    # Update tags
    lec.tags = []
    for t in data.tags:
        tag = db.query(Tag).get(t) or Tag(tag=t)
        lec.tags.append(tag)
    # Update teachers
    lec.teachers = db.query(Teacher).filter(Teacher.id.in_(data.teacher_ids)).all()
    db.commit()
    db.refresh(lec)
    return lec


@lectures_router.delete('/lectures/{lecture_id}', status_code=204)
def delete_lecture(lecture_id: int, db: Session = Depends(get_db)):
    lec = db.query(Lecture).get(lecture_id)
    if not lec: raise HTTPException(404, 'Lecture not found')
    db.delete(lec)
    db.commit()