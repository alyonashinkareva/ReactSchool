from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db.models import User
from db.utils import get_db
from pydantic_models.models import UserSchema, UserCreate, UserRegister, UserLogin, AuthResponse

users_router = APIRouter()


@users_router.post("/register", response_model=AuthResponse, status_code=201)
def register_user(data: UserRegister, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create new user (storing password as plain text - not secure but as requested)
    user = User(
        username=data.username,
        email=data.email,
        password=data.password
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Use model_validate instead of from_orm for Pydantic v2
    user_schema = UserSchema.model_validate(user)
    
    return AuthResponse(
        user=user_schema,
        message="User registered successfully"
    )


@users_router.post("/login", response_model=AuthResponse)
def login_user(data: UserLogin, db: Session = Depends(get_db)):
    # Find user by email
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check password (plain text comparison - not secure but as requested)
    if user.password != data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Use model_validate instead of from_orm for Pydantic v2
    user_schema = UserSchema.model_validate(user)
    
    return AuthResponse(
        user=user_schema,
        message="Login successful"
    )


@users_router.post("/users", response_model=UserSchema, status_code=201)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    user = User(**data.model_dump())
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserSchema.model_validate(user)


@users_router.get("/users/{user_id}", response_model=UserSchema)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserSchema.model_validate(user)


@users_router.get("/users/", response_model=List[UserSchema])
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [UserSchema.model_validate(user) for user in users]
