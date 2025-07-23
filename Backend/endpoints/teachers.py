from fastapi import Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session, joinedload

from db.models import Teacher, Skill, TeacherCourse, EducationItem, Lecture, Course
from db.utils import get_db
from pydantic_models.models import TeacherCreate, TeacherDetailSchema

teacher_router = APIRouter()
@teacher_router.get("/teachers")
def list_teachers(db: Session = Depends(get_db)):
    return db.query(Teacher).all()

@teacher_router.get("/teachers/{teacher_id}", response_model=TeacherDetailSchema)
def get_teacher(teacher_id: int, db: Session = Depends(get_db)):
    teacher = db.query(Teacher).options(
        joinedload(Teacher.skills),
        joinedload(Teacher.courses),
        joinedload(Teacher.education)
    ).filter(Teacher.id == teacher_id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return teacher

@teacher_router.post("/teachers", status_code=201)
def create_teacher(data: TeacherCreate, db: Session = Depends(get_db)):
    # Create teacher
    teacher = Teacher(
        name=data.name,
        role=data.role,
        photo=data.photo,
        profile_url=data.profileUrl,
        description=data.description,
        github=data.github,
        phone=data.phone,
        email=data.email,
        telegram=data.telegram,
        location=data.location
    )
    
    # Добавляем teacher в сессию сначала
    db.add(teacher)
    db.flush()  # Сохраняем в базу, но не коммитим транзакцию
    
    # Skills - теперь можно безопасно добавлять связи
    for name in data.skills:
        skill = db.query(Skill).filter_by(name=name).first()
        if not skill:
            skill = Skill(name=name)
            db.add(skill)
            db.flush()  # Убеждаемся, что skill тоже в сессии
        teacher.skills.append(skill)
    
    # Courses
    for c in data.courses:
        teacher.courses.append(TeacherCourse(
            title=c.title,
            description=c.description,
            image_class=c.imageClass
        ))
    
    # Education
    for e in data.education:
        teacher.education.append(EducationItem(
            period=e.period,
            institution=e.institution,
            location=e.location,
            details=e.details or ""
        ))
    
    db.commit()
    db.refresh(teacher)
    return teacher

@teacher_router.get("/teachers/{teacher_id}/lectures")
def get_teacher_lectures(teacher_id: int, db: Session = Depends(get_db)):
    """Получить все лекции, которые ведёт преподаватель"""
    teacher = db.query(Teacher).get(teacher_id)
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    # Получаем лекции с информацией о курсах
    lectures = db.query(Lecture).options(
        joinedload(Lecture.course)
    ).filter(Lecture.teachers.contains(teacher)).all()
    
    # Группируем лекции по курсам
    courses_with_lectures = {}
    for lecture in lectures:
        course = lecture.course
        if course.id not in courses_with_lectures:
            courses_with_lectures[course.id] = {
                "course_id": course.id,
                "course_title": course.title,
                "course_description": course.description,
                "lectures": []
            }
        courses_with_lectures[course.id]["lectures"].append({
            "id": lecture.id,
            "title": lecture.title,
            "number": lecture.number
        })
    
    return list(courses_with_lectures.values())

@teacher_router.post("/lectures/{lecture_id}/teachers/{teacher_id}")
def assign_teacher_to_lecture(lecture_id: int, teacher_id: int, db: Session = Depends(get_db)):
    """Назначить преподавателя на лекцию"""
    lecture = db.query(Lecture).get(lecture_id)
    teacher = db.query(Teacher).get(teacher_id)
    
    if not lecture:
        raise HTTPException(status_code=404, detail="Lecture not found")
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    
    # Проверяем, не назначен ли уже этот преподаватель на эту лекцию
    if teacher not in lecture.teachers:
        lecture.teachers.append(teacher)
        db.commit()
        return {"message": f"Teacher {teacher.name} assigned to lecture {lecture.title}"}
    else:
        return {"message": f"Teacher {teacher.name} is already assigned to lecture {lecture.title}"}