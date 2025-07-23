import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from db.models import Course, Module, Lecture
from db.utils import get_db
from pydantic_models.models import CourseCreate, CourseSchema

courses_router = APIRouter()


@courses_router.get("/courses", response_model=list[CourseSchema])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).options(
        joinedload(Course.lectures).joinedload(Lecture.teachers),
        joinedload(Course.modules).joinedload(Module.lectures).joinedload(Lecture.teachers)
    ).all()


@courses_router.get("/courses/{course_id}", response_model=CourseSchema)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).options(
        joinedload(Course.lectures).joinedload(Lecture.teachers),
        joinedload(Course.modules).joinedload(Module.lectures).joinedload(Lecture.teachers)
    ).get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


# POST /courses
@courses_router.post("/courses", status_code=201)
def create_course(data: CourseCreate, db: Session = Depends(get_db)):
    payload = data.model_dump(exclude={"modules"})
    tags_list = payload.pop("tags")
    reqs_list = payload.pop("requirements")

    course = Course(
        **payload,
        tags=json.dumps(tags_list),
        requirements=json.dumps(reqs_list),
    )

    # build the module+lecture tree
    for mod_data in data.modules:
        module = Module(
            external_id=mod_data.external_id,
            title=mod_data.title,
            description=mod_data.description,
            order=mod_data.order,
        )
        module.course = course  # ← sets module.course_id for you

        for lec_data in mod_data.lectures:
            lecture = Lecture(
                external_id=lec_data.external_id,
                title=lec_data.title,
                number=lec_data.order,
                video_url=lec_data.videoUrl,
                prerequisites=json.dumps(lec_data.prerequisites or []),
                attachments=json.dumps(lec_data.attachments or []),
                presentation_slides=json.dumps(lec_data.presentation_slides or []),
            )
            lecture.module = module  # ← sets lecture.module_id
            lecture.course = course  # ← sets lecture.course_id

            module.lectures.append(lecture)

        course.modules.append(module)

    db.add(course)
    db.commit()
    db.refresh(course)
    return "OK"


# PUT /courses/{course_id}
@courses_router.put("/courses/{course_id}", response_model=CourseSchema)
def update_course(course_id: int, data: CourseCreate, db: Session = Depends(get_db)):
    course = db.query(Course).get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Обновляем поля
    payload = data.model_dump(exclude={"modules"}, exclude_unset=True)
    if "tags" in payload:
        course.tags = json.dumps(payload.pop("tags"))
    if "requirements" in payload:
        course.requirements = json.dumps(payload.pop("requirements"))
    for k, v in payload.items():
        setattr(course, k, v)

    # Обновляем модули + лекции
    if data.modules is not None:
        course.modules.clear()
        for mod in data.modules:
            m = Module(
                external_id=mod.external_id,
                title=mod.title,
                description=mod.description,
                order=mod.order,
            )
            for lec in mod.lectures:
                m.lectures.append(
                    Lecture(
                        external_id=lec.external_id,
                        title=lec.title,
                        description=lec.description,
                        duration=lec.duration,
                        order=lec.order,
                        video_url=lec.videoUrl,
                        prerequisites=json.dumps(lec.prerequisites or []),
                        attachments=json.dumps(lec.attachments or []),
                        presentation_slides=json.dumps(lec.presentation_slides or []),
                    )
                )
            course.modules.append(m)

    db.commit()
    db.refresh(course)
    return course


@courses_router.delete("/courses/{course_id}", status_code=204)
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).get(course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    db.delete(course)
    db.commit()
