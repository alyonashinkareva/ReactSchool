from typing import Optional, List
import json

from pydantic import BaseModel, Field, field_validator, model_validator


def to_camel(string: str) -> str:
    components = string.split('_')
    return components[0] + ''.join(x.capitalize() for x in components[1:])


class SkillSchema(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
        populate_by_name = True
        alias_generator = to_camel


class TeacherCourseSchema(BaseModel):
    id: int
    title: str
    description: str
    image_class: str = Field(..., alias='imageClass')

    class Config:
        from_attributes = True
        populate_by_name = True
        alias_generator = to_camel


class EducationItemSchema(BaseModel):
    id: int
    period: str
    institution: str
    location: str
    details: str

    class Config:
        from_attributes = True
        populate_by_name = True
        alias_generator = to_camel


class CourseUpdate(BaseModel):
    title: Optional[str]
    description: Optional[str]
    image: Optional[str]
    is_available: Optional[bool]
    duration: Optional[int]
    is_popular: Optional[bool]
    background_color: Optional[str]


class TeacherCourseCreate(BaseModel):
    title: str
    description: str
    imageClass: str


class EducationItemCreate(BaseModel):
    period: str
    institution: str
    location: str
    details: Optional[str] = ""


class TeacherCreate(BaseModel):
    name: str
    role: str
    photo: str
    profileUrl: Optional[str]
    description: str
    github: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    telegram: Optional[str] = None
    location: Optional[str] = None
    skills: List[str] = []
    courses: List[TeacherCourseCreate] = []
    education: List[EducationItemCreate] = []

    @field_validator('skills')
    @classmethod
    def skill_not_empty(cls, v):
        for skill in v:
            if not skill.strip():
                raise ValueError('Skill must be non-empty')
        return v

    class Config:
        alias_generator = to_camel


class CourseProgressSchema(BaseModel):
    user_id: str
    course_id: str
    completed_lectures: List[str]
    last_watched_lecture: str
    overall_progress: int
    last_position: int
    last_updated: str

    class Config:
        from_attributes = True


class LectureHistorySchema(BaseModel):
    lecture_id: str
    watched_duration: int
    total_duration: int
    completed: bool
    last_position: int

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    avatar: Optional[str] = None


class UserRegister(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class UserSchema(BaseModel):
    id: int
    username: str
    email: str
    avatar: Optional[str] = None

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    user: UserSchema
    message: str


class ReviewCreate(BaseModel):
    author: str
    avatar: Optional[str] = None
    rating: int
    date: str
    text: str
    course_id: int
    user_id: int


class ReviewSchema(ReviewCreate):
    id: int

    class Config:
        from_attributes = True


class CommentCreate(BaseModel):
    author: str
    avatar: Optional[str]
    text: str
    date: str
    lecture_id: int
    course_id: int
    user_id: int


class CommentSchema(CommentCreate):
    id: int

    class Config:
        from_attributes = True


class RatingCreate(BaseModel):
    user_id: int
    lecture_id: str
    course_id: int
    like: bool
    date: str


class RatingSchema(RatingCreate):
    class Config:
        from_attributes = True


class ProgressCreate(BaseModel):
    user_id: int
    course_id: int
    completed_lectures: List[str]
    last_watched_lecture: str
    overall_progress: int
    last_position: int
    last_updated: str


class ProgressSchema(ProgressCreate):
    class Config:
        from_attributes = True


class HistoryCreate(BaseModel):
    user_id: int
    lecture_id: str
    watched_duration: int
    total_duration: int
    completed: bool
    last_position: int
    last_updated: Optional[str] = None


class HistorySchema(HistoryCreate):
    id: int
    
    class Config:
        from_attributes = True


class LectureCreate(BaseModel):
    external_id: str
    title: str
    description: str
    duration: int
    order: int
    # content: Optional[str] = None
    videoUrl: Optional[str] = None
    teacher_ids: List[int] = []
    tags: Optional[List[str]] = []
    prerequisites: Optional[List[str]] = []
    attachments: Optional[List[dict]] = []
    presentation_slides: Optional[List[str]] = []  # Слайды презентации

    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, data):
        """Парсим JSON поля из строк в списки/объекты если нужно"""
        if isinstance(data, dict):
            # Парсим JSON поля если они строки
            for field in ['attachments', 'tags', 'prerequisites', 'presentation_slides']:
                if field in data and data[field] is not None:
                    if isinstance(data[field], str):
                        try:
                            data[field] = json.loads(data[field])
                        except (json.JSONDecodeError, TypeError):
                            data[field] = []
        return data

    @field_validator('external_id', 'title')
    @classmethod
    def not_empty(cls, v):
        if not v.strip(): 
            raise ValueError('Field must be non-empty')
        return v


class TeacherSchema(BaseModel):
    id: int
    name: str
    role: Optional[str]
    photo: Optional[str]
    description: Optional[str]
    class Config:
        from_attributes = True


class TeacherDetailSchema(BaseModel):
    id: int
    name: str
    role: Optional[str] = None
    photo: Optional[str] = None
    profile_url: Optional[str] = Field(None, alias='profileUrl')
    description: Optional[str] = None
    github: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    telegram: Optional[str] = None
    location: Optional[str] = None
    skills: List[SkillSchema] = []
    courses: List[TeacherCourseSchema] = []
    education: List[EducationItemSchema] = []
    
    class Config:
        from_attributes = True
        populate_by_name = True


class LectureSchema(BaseModel):
    id: int
    title: str
    number: int
    content: Optional[str] = None
    videoUrl: Optional[str] = None
    teachers: List[TeacherSchema]
    tags: Optional[List[str]] = []
    attachments: Optional[List[dict]] = []
    presentationSlides: Optional[List[str]] = []

    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, data):
        """Парсим JSON поля из строк в списки/объекты"""
        if hasattr(data, '__dict__'):
            # Если это объект SQLAlchemy
            data_dict = data.__dict__.copy()
            
            # Парсим JSON поля
            for field in ['attachments', 'tags', 'presentation_slides']:
                if field in data_dict and data_dict[field] is not None:
                    if isinstance(data_dict[field], str):
                        try:
                            data_dict[field] = json.loads(data_dict[field])
                        except (json.JSONDecodeError, TypeError):
                            data_dict[field] = []
                    elif data_dict[field] is None:
                        data_dict[field] = []
            
            # Переименовываем поля для соответствия схеме
            if 'video_url' in data_dict:
                data_dict['videoUrl'] = data_dict['video_url']
            if 'presentation_slides' in data_dict:
                data_dict['presentationSlides'] = data_dict['presentation_slides']
            
            return data_dict
        return data

    class Config:
        from_attributes = True
        populate_by_name = True


class ModuleCreate(BaseModel):
    external_id: str
    title: str
    description: str
    order: int
    lectures: List[LectureCreate]


class ModuleSchema(ModuleCreate):
    id: int
    lectures: List[LectureSchema]

    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, data):
        """Парсим JSON поля из строк в списки/объекты"""
        if hasattr(data, '__dict__'):
            data_dict = data.__dict__.copy()
            return data_dict
        return data

    class Config:
        from_attributes = True


class CourseCreate(BaseModel):
    title: str
    description: str
    cover: str
    author_id: int
    level: str
    duration: int
    tags: List[str]
    requirements: List[str]
    price: int
    discount: Optional[int] = None
    is_popular: bool
    is_available: Optional[bool] = True
    background_color: Optional[str] = '#e6f2ea'
    created_at: str
    updated_at: str
    modules: Optional[List[ModuleCreate]] = []

    @field_validator('title', 'description', 'cover', 'level')
    @classmethod
    def not_empty(cls, v):
        if not v.strip():
            raise ValueError('Field must be non-empty')
        return v


class CourseSchema(CourseCreate):
    id: int
    modules: List[ModuleSchema]
    lectures: List[LectureSchema] = []

    @model_validator(mode='before')
    @classmethod
    def parse_json_fields(cls, data):
        """Парсим JSON поля из строк в списки/объекты"""
        if hasattr(data, '__dict__'):
            data_dict = data.__dict__.copy()
            
            # Парсим JSON поля
            for field in ['tags', 'requirements']:
                if field in data_dict and data_dict[field] is not None:
                    if isinstance(data_dict[field], str):
                        try:
                            data_dict[field] = json.loads(data_dict[field])
                        except (json.JSONDecodeError, TypeError):
                            data_dict[field] = []
            
            return data_dict
        return data

    class Config:
        from_attributes = True
