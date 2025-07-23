#!/usr/bin/env python3
"""
Скрипт для проверки и создания пользователей в базе данных
"""
import requests
from sqlalchemy.orm import Session
from db.cfg import engine
from db.models import User
from db.utils import get_db


def check_existing_users():
    """Проверяет существующих пользователей в базе данных"""
    # Создаем сессию для работы с БД
    session = Session(bind=engine)
    
    try:
        users = session.query(User).all()
        print(f"Найдено пользователей в БД: {len(users)}")
        
        for user in users:
            print(f"  - ID: {user.id}, Username: {user.username}, Email: {user.email}")
        
        return users
    finally:
        session.close()


def create_test_users():
    """Создает тестовых пользователей через API"""
    BASE_URL = "http://localhost:8000/api"
    
    test_users = [
        {
            'username': 'Андрей Волков',
            'email': 'andrey@example.com',
            'password': '12345'
        },
        {
            'username': 'Марина Соколова',
            'email': 'marina@example.com',
            'password': '12345'
        }
    ]
    
    for user in test_users:
        try:
            response = requests.post(f"{BASE_URL}/register", json=user)
            if response.status_code == 201:
                print(f"✅ Пользователь '{user['username']}' создан успешно")
            elif response.status_code == 400 and "already registered" in response.text:
                print(f"ℹ️  Пользователь '{user['username']}' уже существует")
            else:
                print(f"❌ Ошибка создания пользователя '{user['username']}': {response.status_code} - {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"❌ Ошибка подключения при создании пользователя '{user['username']}': {e}")


def create_test_progress():
    """Создает тестовый прогресс для существующих пользователей"""
    BASE_URL = "http://localhost:8000/api"
    
    # Проверяем существующих пользователей
    session = Session(bind=engine)
    try:
        users = session.query(User).all()
        if not users:
            print("❌ Нет пользователей в базе данных. Создайте пользователей сначала.")
            return
        
        # Создаем прогресс для первого пользователя
        user = users[0]
        test_progress = {
            'user_id': user.id,
            'course_id': 1,
            'completed_lectures': ['python-basics'],
            'last_watched_lecture': 'python-basics',
            'overall_progress': 25,
            'last_position': 350,
            'last_updated': '2024-03-15T10:40:00.000Z'
        }
        
        try:
            response = requests.post(f"{BASE_URL}/progress", json=test_progress)
            if response.status_code in [200, 201]:
                print(f"✅ Прогресс для пользователя {user.id} создан успешно")
            else:
                print(f"❌ Ошибка создания прогресса: {response.status_code} - {response.text}")
        except requests.exceptions.RequestException as e:
            print(f"❌ Ошибка подключения при создании прогресса: {e}")
    
    finally:
        session.close()


if __name__ == "__main__":
    print("🔍 Проверка пользователей в базе данных...")
    
    # Проверяем существующих пользователей
    users = check_existing_users()
    
    # Если пользователей нет, создаем их
    if not users:
        print("\n👤 Создание тестовых пользователей...")
        create_test_users()
        
        # Проверяем снова
        print("\n🔍 Повторная проверка пользователей...")
        users = check_existing_users()
    
    # Создаем тестовый прогресс
    if users:
        print("\n📊 Создание тестового прогресса...")
        create_test_progress()
    
    print("\n✅ Проверка завершена!") 