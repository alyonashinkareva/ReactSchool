#!/usr/bin/env python3
"""
Скрипт для добавления демонстрационных отзывов в базу данных
"""

from datetime import datetime
from db.cfg import engine, Base
from db.models import Review, User, Course
from sqlalchemy.orm import sessionmaker

# Создаем сессию
Session = sessionmaker(bind=engine)
session = Session()

def init_demo_reviews():
    """Добавляет демонстрационные отзывы в базу данных"""
    
    print("Создание демонстрационных отзывов...")
    
    # Получаем существующих пользователей и курсы
    users = session.query(User).all()
    courses = session.query(Course).all()
    
    if not users:
        print("Нет пользователей в базе данных. Сначала создайте пользователей.")
        return
        
    if not courses:
        print("Нет курсов в базе данных. Сначала создайте курсы.")
        return
    
    # Демонстрационные отзывы
    demo_reviews = [
        {
            "author": "Анна Иванова",
            "avatar": "https://i.pravatar.cc/150?img=1",
            "rating": 5,
            "date": "2024-01-15",
            "text": "Отличный курс! Очень подробно и понятно объясняется материал. Преподаватели профессионалы своего дела. Благодаря этому курсу я смогла найти работу мечты в IT-компании.",
            "course_id": courses[0].id if courses else 1,
            "user_id": users[0].id if users else 1
        },
        {
            "author": "Михаил Петров",
            "avatar": "https://i.pravatar.cc/150?img=2",
            "rating": 4,
            "date": "2024-01-18",
            "text": "Хороший курс для начинающих. Есть небольшие недочеты в подаче материала, но в целом все отлично. Рекомендую всем, кто хочет изучить современные технологии.",
            "course_id": courses[0].id if courses else 1,
            "user_id": users[1].id if len(users) > 1 else users[0].id
        },
        {
            "author": "Елена Сидорова",
            "avatar": "https://i.pravatar.cc/150?img=3",
            "rating": 5,
            "date": "2024-01-22",
            "text": "Превосходный курс! Структура обучения продумана до мелочей. Много практических заданий, которые помогают закрепить материал. Поддержка от преподавателей на высшем уровне.",
            "course_id": courses[1].id if len(courses) > 1 else courses[0].id,
            "user_id": users[0].id if users else 1
        },
        {
            "author": "Дмитрий Козлов",
            "avatar": "https://i.pravatar.cc/150?img=4",
            "rating": 4,
            "date": "2024-01-25",
            "text": "Курс понравился, много нового узнал. Единственное пожелание - больше реальных примеров из практики. Но в целом качество обучения высокое.",
            "course_id": courses[1].id if len(courses) > 1 else courses[0].id,
            "user_id": users[1].id if len(users) > 1 else users[0].id
        },
        {
            "author": "Ольга Васильева",
            "avatar": "https://i.pravatar.cc/150?img=5",
            "rating": 5,
            "date": "2024-01-28",
            "text": "Отличная школа! Перешла с другой специальности в IT благодаря этим курсам. Преподаватели объясняют сложные вещи простыми словами. Очень довольна результатом!",
            "course_id": courses[0].id if courses else 1,
            "user_id": users[2].id if len(users) > 2 else users[0].id
        }
    ]
    
    # Проверяем, есть ли уже отзывы
    existing_reviews = session.query(Review).count()
    if existing_reviews > 0:
        print(f"В базе данных уже есть {existing_reviews} отзывов. Пропускаем создание демо-данных.")
        return
    
    # Добавляем отзывы в базу данных
    for review_data in demo_reviews:
        review = Review(**review_data)
        session.add(review)
    
    try:
        session.commit()
        print(f"Успешно добавлено {len(demo_reviews)} демонстрационных отзывов!")
    except Exception as e:
        session.rollback()
        print(f"Ошибка при добавлении отзывов: {e}")
    finally:
        session.close()

if __name__ == "__main__":
    # Создаем таблицы если их нет
    Base.metadata.create_all(bind=engine)
    
    # Инициализируем демо-отзывы
    init_demo_reviews() 