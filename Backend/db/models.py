from sqlalchemy import (Column, Integer, String, Boolean, ForeignKey, Text, JSON)
from sqlalchemy.orm import relationship

from db.cfg import Base, teacher_skill, lecture_teacher, lecture_tag


class Lecture(Base):
    __tablename__ = 'lectures'
    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True)
    title = Column(String, nullable=False)
    number = Column(Integer, nullable=False)
    content = Column(Text, nullable=True)
    video_url = Column(String, nullable=True)
    course_id = Column(Integer, ForeignKey('courses.id'), nullable=False)
    module_id = Column(Integer, ForeignKey('modules.id'), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(Integer, nullable=True)
    order = Column(Integer, nullable=True)
    prerequisites = Column(JSON, nullable=True, default=list)
    attachments   = Column(JSON, nullable=True, default=list)
    presentation_slides = Column(JSON, nullable=True, default=list)
    # Relationships
    module = relationship('Module', back_populates='lectures')
    teachers = relationship('Teacher', secondary=lecture_teacher, back_populates='lectures')
    tags = relationship('Tag', secondary=lecture_tag, back_populates='lectures')
    course = relationship("Course", back_populates="lectures")

class Tag(Base):
    __tablename__ = 'tags'
    id  = Column(Integer, primary_key=True, index=True)
    tag = Column(String, unique=True, index=True)

    lectures = relationship(
        'Lecture',
        secondary=lecture_tag,
        back_populates='tags'
    )


class Skill(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    teachers = relationship('Teacher', secondary=teacher_skill, back_populates='skills')


class TeacherCourse(Base):
    __tablename__ = 'teacher_courses'
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    title = Column(String)
    description = Column(Text)
    image_class = Column(String)
    teacher = relationship('Teacher', back_populates='courses')


class EducationItem(Base):
    __tablename__ = 'education_items'
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey('teachers.id'))
    period = Column(String)
    institution = Column(String)
    location = Column(String)
    details = Column(String)
    teacher = relationship('Teacher', back_populates='education')


class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, index=True)

    description = Column(Text)
    cover = Column(String)
    author_id = Column(Integer, ForeignKey('teachers.id'))
    level = Column(String)
    duration = Column(Integer)
    tags = Column(Text)
    requirements = Column(Text)
    price = Column(Integer)
    discount = Column(Integer, nullable=True)
    is_popular = Column(Boolean, default=False)
    is_available = Column(Boolean, default=True)
    background_color = Column(String, default='#e6f2ea')
    created_at = Column(String)
    updated_at = Column(String)

    author = relationship('Teacher', backref='authored_courses')
    modules = relationship('Module', back_populates='course', cascade='all, delete-orphan', lazy='joined')
    lectures = relationship('Lecture', back_populates='course', cascade='all, delete-orphan', lazy='joined')


class Module(Base):
    __tablename__ = 'modules'
    id = Column(Integer, primary_key=True, index=True)
    external_id = Column(String, unique=True, index=True)
    title = Column(String)
    description = Column(Text)
    order = Column(Integer)
    course_id = Column(Integer, ForeignKey('courses.id'),  nullable=False)

    course = relationship('Course', back_populates='modules')
    lectures = relationship('Lecture', back_populates='module', cascade='all, delete-orphan', lazy='joined')





class Teacher(Base):
    __tablename__ = 'teachers'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    photo = Column(String)
    profile_url = Column(String)
    description = Column(Text)
    github = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    telegram = Column(String, nullable=True)
    location = Column(String, nullable=True)
    skills = relationship('Skill', secondary=teacher_skill, back_populates='teachers')
    courses = relationship('TeacherCourse', back_populates='teacher', cascade='all, delete-orphan')
    education = relationship('EducationItem', back_populates='teacher', cascade='all, delete-orphan')
    lectures = relationship('Lecture', secondary=lecture_teacher, back_populates='teachers')


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    avatar = Column(String, nullable=True)


class Review(Base):
    __tablename__ = 'reviews'
    id = Column(Integer, primary_key=True, index=True)
    author = Column(String, nullable=False)
    avatar = Column(String)
    rating = Column(Integer, nullable=False)
    date = Column(String, nullable=False)
    text = Column(Text, nullable=False)
    course_id = Column(Integer, ForeignKey('courses.id'))
    user_id = Column(Integer, ForeignKey('users.id'))


class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, index=True)
    author = Column(String, nullable=False)
    avatar = Column(String)
    text = Column(Text, nullable=False)
    date = Column(String, nullable=False)
    lecture_id = Column(Integer)
    course_id = Column(Integer)
    user_id = Column(Integer, ForeignKey('users.id'))


class Rating(Base):
    __tablename__ = 'ratings'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    lecture_id = Column(Integer, primary_key=True)
    course_id = Column(Integer, primary_key=True)
    like = Column(Boolean, nullable=False)
    date = Column(String, nullable=False)


class CourseProgress(Base):
    __tablename__ = 'course_progress'
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    course_id = Column(Integer, ForeignKey('courses.id'), primary_key=True)
    completed_lectures = Column(Text)  # JSON list
    last_watched_lecture = Column(String)
    overall_progress = Column(Integer, default=0)
    last_position = Column(Integer, default=0)
    last_updated = Column(String)

    # Relationships
    user = relationship('User', backref='course_progress')
    course = relationship('Course', backref='user_progress')


class LectureHistory(Base):
    __tablename__ = 'lecture_history'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    lecture_id = Column(String, nullable=False)
    watched_duration = Column(Integer, default=0)
    total_duration = Column(Integer, default=0)
    completed = Column(Boolean, default=False)
    last_position = Column(Integer, default=0)
    last_updated = Column(String)

    # Relationships
    user = relationship('User', backref='lecture_history')
