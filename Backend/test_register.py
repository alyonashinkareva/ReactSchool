#!/usr/bin/env python3
"""
Простой тест для проверки регистрации пользователей
"""
import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_user_registration():
    """Тестируем регистрацию нового пользователя"""
    
    # Тестовые данные пользователя
    test_user = {
        "username": "testuser",
        "email": "testuser@example.com", 
        "password": "test1234"
    }
    
    print("🧪 Тестируем регистрацию пользователя...")
    print(f"Данные: {test_user}")
    
    try:
        # Отправляем запрос на регистрацию
        response = requests.post(f"{BASE_URL}/register", json=test_user)
        
        print(f"📡 Статус ответа: {response.status_code}")
        print(f"📄 Тело ответа: {response.text}")
        
        if response.status_code == 201:
            result = response.json()
            print("✅ Регистрация успешна!")
            print(f"👤 Пользователь: {result['user']['username']}")
            print(f"📧 Email: {result['user']['email']}")
            print(f"🆔 ID: {result['user']['id']}")
            return True
        else:
            print("❌ Регистрация не удалась")
            return False
            
    except requests.exceptions.ConnectionError:
        print("🔴 Ошибка: Не удается подключиться к серверу")
        print("Убедитесь, что backend запущен на http://localhost:8000")
        return False
    except Exception as e:
        print(f"🔴 Неожиданная ошибка: {e}")
        return False

def test_duplicate_registration():
    """Тестируем регистрацию дублирующего пользователя"""
    
    duplicate_user = {
        "username": "testuser", 
        "email": "testuser@example.com",
        "password": "test1234"
    }
    
    print("\n🧪 Тестируем регистрацию дублирующего пользователя...")
    
    try:
        response = requests.post(f"{BASE_URL}/register", json=duplicate_user)
        
        print(f"📡 Статус ответа: {response.status_code}")
        print(f"📄 Тело ответа: {response.text}")
        
        if response.status_code == 400:
            print("✅ Правильно обработан дублирующий пользователь")
            return True
        else:
            print("❌ Дублирующий пользователь не был корректно обработан")
            return False
            
    except Exception as e:
        print(f"🔴 Ошибка: {e}")
        return False

def test_login():
    """Тестируем вход пользователя"""
    
    login_data = {
        "email": "testuser@example.com",
        "password": "test1234"
    }
    
    print("\n🧪 Тестируем вход пользователя...")
    
    try:
        response = requests.post(f"{BASE_URL}/login", json=login_data)
        
        print(f"📡 Статус ответа: {response.status_code}")
        print(f"📄 Тело ответа: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Вход успешен!")
            print(f"👤 Пользователь: {result['user']['username']}")
            return True
        else:
            print("❌ Вход не удался")
            return False
            
    except Exception as e:
        print(f"🔴 Ошибка: {e}")
        return False

if __name__ == "__main__":
    print("🚀 Запускаем тесты регистрации и входа пользователей\n")
    
    # Тест 1: Регистрация нового пользователя
    success1 = test_user_registration()
    
    # Тест 2: Попытка зарегистрировать дублирующего пользователя  
    success2 = test_duplicate_registration()
    
    # Тест 3: Вход пользователя
    success3 = test_login()
    
    print(f"\n📊 Результаты тестов:")
    print(f"Регистрация: {'✅' if success1 else '❌'}")
    print(f"Дублирование: {'✅' if success2 else '❌'}")
    print(f"Вход: {'✅' if success3 else '❌'}")
    
    if all([success1, success2, success3]):
        print("\n🎉 Все тесты прошли успешно!")
    else:
        print("\n⚠️ Некоторые тесты не прошли") 