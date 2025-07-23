#!/usr/bin/env python3
import init_data

print("🧪 Создаем преподавателей...")
init_data.seed_teachers()
print("✅ Преподаватели созданы!")

print("\n🧪 Тестируем создание курса...")
init_data.seed_courses()
print("✅ Курсы созданы!") 