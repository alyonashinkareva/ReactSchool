#!/usr/bin/env python3
import requests
import json
import time

BASE_URL = 'http://localhost:8000/api'

# Уникальный пользователь для этого теста
timestamp = str(time.time()).replace('.', '')
test_user = {
    'username': 'uniqueuser' + timestamp,
    'email': 'unique' + timestamp + '@example.com',
    'password': 'test1234'
}

print('🧪 Тестируем с пользователем:', test_user['username'])

# Регистрация
resp = requests.post(f'{BASE_URL}/register', json=test_user)
print('📡 Регистрация:', resp.status_code)
if resp.status_code == 201:
    result = resp.json()
    print('✅ Регистрация успешна!')
    print('👤 Пользователь:', result['user']['username'])
    print('🆔 ID:', result['user']['id'])
else:
    print('❌ Ошибка регистрации:', resp.text)

# Вход
login_data = {'email': test_user['email'], 'password': test_user['password']}
resp = requests.post(f'{BASE_URL}/login', json=login_data)
print('📡 Вход:', resp.status_code)
if resp.status_code == 200:
    print('✅ Вход успешен!')
else:
    print('❌ Ошибка входа:', resp.text) 