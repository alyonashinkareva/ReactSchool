#!/usr/bin/env python3
import requests
import json

BASE_URL = "http://localhost:8000/api"

# Простой тестовый курс
test_course = {
    "title": "Test Course",
    "description": "Test Description", 
    "cover": "https://example.com/cover.jpg",
    "author_id": 1,
    "level": "beginner",
    "duration": 10,
    "tags": ["test"],
    "requirements": ["none"],
    "price": 1000,
    "is_popular": False,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
    "modules": []
}

print("🧪 Тестируем создание курса...")
print(f"Данные: {json.dumps(test_course, indent=2)}")

try:
    response = requests.post(f"{BASE_URL}/courses", json=test_course)
    
    print(f"📡 Статус ответа: {response.status_code}")
    print(f"📄 Тело ответа: {response.text}")
    
    if response.status_code == 201:
        print("✅ Курс создан успешно!")
    else:
        print("❌ Ошибка создания курса")
        
except Exception as e:
    print(f"🔴 Ошибка: {e}") 