import os

from sqlalchemy import create_engine, Table, Column, ForeignKey, Integer
from sqlalchemy.orm import sessionmaker, declarative_base

# DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/reactschool")
DATABASE_URL = "postgresql://postgres:postgres@db:5432/reactschool"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

# ===== Association Table =====
teacher_skill = Table(
    'teacher_skill', Base.metadata,
    Column('teacher_id', ForeignKey('teachers.id'), primary_key=True),
    Column('skill_id', ForeignKey('skills.id'), primary_key=True)
)

# association tables
lecture_teacher = Table(
    'lecture_teacher', Base.metadata,
    Column('lecture_id', Integer, ForeignKey('lectures.id'), primary_key=True),
    Column('teacher_id', Integer, ForeignKey('teachers.id'), primary_key=True)
)

lecture_tag = Table(
    'lecture_tag', Base.metadata,
    Column('lecture_id', Integer, ForeignKey('lectures.id'), primary_key=True),
    Column('tag_id',     Integer, ForeignKey('tags.id'),     primary_key=True)
)
