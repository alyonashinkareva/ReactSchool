import requests

BASE_URL = "http://localhost:8000/api"

users_data = [
    {'username': 'Андрей Волков', 'email': 'andrey@example.com', 'avatar': 'https://i.ibb.co/XWxYZ2M/user1.jpg',
     "password": "12345"},
    {'username': 'Марина Соколова', 'email': 'marina@example.com', 'avatar': 'https://i.ibb.co/ThR7N4Z/user2.jpg',
     "password": "12345"}
]
comments_data = {
    'python-developer': {
        'python-basics': [
            {
                'author': 'Андрей Волков',
                'avatar': 'https://i.ibb.co/XWxYZ2M/user1.jpg',
                'text': 'Отличная лекция! Очень доступно объяснены основы Python.',
                'date': '2024-03-15T10:30:00.000Z',
                'user_id': 1
            }
        ]
    },
    'react-developer': {
        'react-hooks': [
            {
                'author': 'Марина Соколова',
                'avatar': 'https://i.ibb.co/ThR7N4Z/user2.jpg',
                'text': 'Наконец-то я поняла, как работают хуки в React!',
                'date': '2024-03-16T14:20:00.000Z',
                'user_id': 2
            }
        ]
    }
}

ratings_data = [
    {'user_id': 1, 'lecture_id': 1, 'course_id': 1, 'like': True, 'date': '2024-03-15T10:35:00.000Z'},
    {'user_id': 2, 'lecture_id': 4, 'course_id': 2, 'like': True, 'date': '2024-03-16T14:25:00.000Z'}
]

reviews_data = [
    {
        'author': 'Андрей Волков', 'avatar': 'https://i.ibb.co/XWxYZ2M/user1.jpg',
        'rating': 5, 'date': '2024-03-15',
        'text': 'Отличный курс по Python! Все очень понятно и структурировано.',
        'course_id': 1, 'user_id': 1
    },
    {
        'author': 'Марина Соколова', 'avatar': 'https://i.ibb.co/ThR7N4Z/user2.jpg',
        'rating': 4, 'date': '2024-03-16',
        'text': 'Хороший курс по React, особенно понравился раздел про хуки.',
        'course_id': 2, 'user_id': 2
    }
]

course_progress_data = [
    {'user_id': 1, 'course_id': 1, 'completed_lectures': ['python-basics'], 'last_watched_lecture': 'python-basics',
     'overall_progress': 25, 'last_position': 350, 'last_updated': '2024-03-15T10:40:00.000Z'},
    {'user_id': 2, 'course_id': 2, 'completed_lectures': ['react-hooks'], 'last_watched_lecture': 'react-hooks',
     'overall_progress': 33, 'last_position': 450, 'last_updated': '2024-03-16T14:30:00.000Z'}
]

lecture_history_data = [
    {'user_id': 1, 'lecture_id': 'python-basics', 'watched_duration': 350, 'total_duration': 600, 'completed': False,
     'last_position': 350, 'last_updated': '2024-03-15T10:40:00.000Z'},
    {'user_id': 2, 'lecture_id': 'react-hooks', 'watched_duration': 450, 'total_duration': 500, 'completed': True,
     'last_position': 450, 'last_updated': '2024-03-16T14:30:00.000Z'}
]

courses_new_data = [
    {
        'title': 'Python Developer',
        'description': 'Полный курс по Python разработке',
        'cover': 'https://cdn.skillbox.pro/landgen/blocks/start-screen/156946/thumbnail_sm/d42b4089-b306-4b88-ab2a-3f52057e6fbe-2x.webp',
        'author_id': 1,
        'level': 'beginner',
        'duration': 20,
        'tags': ['python', 'backend', 'programming'],
        'requirements': ['Базовые знания компьютера'],
        'price': 15000,
        'discount': None,
        'is_popular': True,
        'is_available': True,
        'background_color': '#e6f2ea',
        'created_at': '2024-01-01T00:00:00.000Z',
        'updated_at': '2024-03-15T10:00:00.000Z',
        'modules': [
            {
                'external_id': 'python-basics-module',
                'title': 'Основы Python',
                'description': 'Базовые концепции языка Python',
                'order': 1,
                'lectures': [
                    {
                        'external_id': 'python-basics',
                        'title': 'Введение в Python',
                        'description': 'Установка Python и первая программа',
                        'duration': 3600,
                        'order': 1,
                        'videoUrl': 'https://rutube.ru/shorts/b2fda1d79b304098a68ab7288687a443/',
                        'prerequisites': [],
                        'attachments': [],
                        'presentation_slides': [
                            'https://i.ibb.co/S4VVxzVx/React-pptx.png',
                            'https://i.ibb.co/PsjHbd7h/React-pptx-1.png', 
                            'https://i.ibb.co/jvGthHX6/React-pptx-2.png',
                            'https://i.ibb.co/JhC72Mr/React-pptx-3.png',
                            'https://i.ibb.co/jPxNW3Lk/React-pptx-4.png'
                        ]
                    },
                    {
                        'external_id': 'python-variables',
                        'title': 'Переменные и типы данных',
                        'description': 'Изучение основных типов данных в Python',
                        'duration': 4800,
                        'order': 2,
                        'videoUrl': None,
                        'prerequisites': ['python-basics'],
                        'attachments': [],
                        'presentation_slides': [
                            'https://i.ibb.co/S4VVxzVx/React-pptx.png',
                            'https://i.ibb.co/PsjHbd7h/React-pptx-1.png',
                            'https://i.ibb.co/jvGthHX6/React-pptx-2.png',
                            'https://i.ibb.co/JhC72Mr/React-pptx-3.png',
                            'https://i.ibb.co/jPxNW3Lk/React-pptx-4.png'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'title': 'React Developer',
        'description': 'Современная React разработка',
        'cover': 'https://cdn.skillbox.pro/landgen/blocks/start-screen/455266/thumbnail_sm/8c8944fd-6e96-4c3c-954e-156b2a756351-2x.webp',
        'author_id': 2,
        'level': 'intermediate',
        'duration': 10,
        'tags': ['react', 'frontend', 'javascript'],
        'requirements': ['JavaScript', 'HTML', 'CSS'],
        'price': 20000,
        'discount': 15,
        'is_popular': True,
        'is_available': True,
        'background_color': '#e3f2fd',
        'created_at': '2024-02-01T00:00:00.000Z',
        'updated_at': '2024-03-16T14:00:00.000Z',
        'modules': [
            {
                'external_id': 'react-basics-module',
                'title': 'Основы React',
                'description': 'Базовые концепции React',
                'order': 1,
                'lectures': [
                    {'external_id': 'react-intro', 'title': 'Введение в React',
                     'description': 'Что такое React и зачем он нужен',
                     'duration': 3600, 'order': 1, 'prerequisites': [], 'attachments': [],
                     'presentation_slides': [
                         'https://i.ibb.co/S4VVxzVx/React-pptx.png',
                         'https://i.ibb.co/PsjHbd7h/React-pptx-1.png',
                         'https://i.ibb.co/jvGthHX6/React-pptx-2.png',
                         'https://i.ibb.co/JhC72Mr/React-pptx-3.png',
                         'https://i.ibb.co/jPxNW3Lk/React-pptx-4.png'
                     ]}
                ]
            },
            {
                'external_id': 'react-hooks-module',
                'title': 'React Hooks',
                'description': 'Работа с хуками в React',
                'order': 2,
                'lectures': [
                    {
                        'external_id': 'react-hooks',
                        'title': 'Введение в хуки',
                        'description': 'Основные хуки React',
                        'duration': 5400,
                        'order': 1,
                        'prerequisites': ['react-intro'],
                        'attachments': [
                            {'id': 'hooks-cheatsheet', 'title': 'Шпаргалка по хукам', 'type': 'pdf',
                             'url': 'https://example.com/hooks-cheatsheet.pdf'},
                            {'id': 'hooks-examples', 'title': 'Примеры использования', 'type': 'code',
                             'url': 'https://example.com/hooks-examples.js'}
                        ],
                        'presentation_slides': [
                            'https://i.ibb.co/S4VVxzVx/React-pptx.png',
                            'https://i.ibb.co/PsjHbd7h/React-pptx-1.png',
                            'https://i.ibb.co/jvGthHX6/React-pptx-2.png',
                            'https://i.ibb.co/JhC72Mr/React-pptx-3.png',
                            'https://i.ibb.co/jPxNW3Lk/React-pptx-4.png'
                        ]
                    }
                ]
            }
        ]
    },
    {
        'title': 'ML Start',
        'description': 'Вводный курс по машинному обучению для начинающих. Изучите основы ML, алгоритмы классификации и регрессии, работу с данными и первые шаги в создании ML-моделей. ',
        'cover': 'https://cdn.skillbox.pro/wbd-front/skillbox-static/main-page-new/mini-catalog/big/2623-new-sm@1x.png',
        'author_id': 5,
        'level': 'beginner',
        'duration': 1,
        'tags': ['machine learning', 'python', 'data science', 'artificial intelligence'],
        'requirements': ['Базовые знания Python', 'Математика на уровне школы'],
        'price': 150000,
        'discount': 10,
        'is_popular': True,
        'is_available': True,
        'background_color': '#f3e5f5',
        'created_at': '2024-03-01T00:00:00.000Z',
        'updated_at': '2024-03-20T12:00:00.000Z',
        'modules': [
            {
                'external_id': 'ml-basics-module',
                'title': 'Основы машинного обучения',
                'description': 'Введение в мир машинного обучения',
                'order': 1,
                'lectures': [
                    {
                        'external_id': 'ml-introduction',
                        'title': 'Что такое машинное обучение?',
                        'description': 'Введение в машинное обучение, основные понятия и области применения',
                        'duration': 2400,
                        'order': 1,
                        'videoUrl': '/api/video/3/lecture_1.mp4',
                        'prerequisites': [],
                        'attachments': [],
                        'presentation_slides': []
                    }
                ]
            }
        ]
    }
]

teachers_data = [
    {
        "name": "Алёна Шинкарева",
        "role": "Junior React Developer",
        "photo": "https://i.ibb.co/tTYH1KvM/alyona-shinkareva.png",
        "profileUrl": "/teachers/alyona-shinkareva",
        "description": (
            "Начинающий фронтенд-разработчик со знаниями React, Vue, JavaScript, TypeScript, HTML, CSS. "
            "Студентка 3 курса университета ИТМО, направления Прикладная математика и информатика."
        ),
        "github": "https://github.com/alyonashinkareva",
        "phone": "7(908)516-56-66",
        "email": "alyona.i.shinkareva@yandex.com",
        "telegram": "https://t.me/alyonashinkareva",
        "skills": [
            "React",
            "Vue",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "CSS/SCSS",
            "HTML"
        ],
        "location": "Saint-Petersburg, Russia",
        "courses": [
            {
                "title": "Python Developer",
                "description": "Полный курс по Python разработке",
                "imageClass": "python-bg"
            },
            {
                "title": "React Developer",
                "description": "Современная React разработка",
                "imageClass": "react-bg"
            }
        ],
        "education": [
            {
                "period": "2022 - nowadays",
                "institution": "ITMO University",
                "location": "Saint-Petersburg, Russia",
                "details": ""
            },
            {
                "period": "2019 - 2022",
                "institution": "Lyceum 33",
                "location": "Rostov-on-Don, Russia",
                "details": "grades 8 - 11"
            },
            {
                "period": "2015 - 2019",
                "institution": "Specialized Lyceum for gifted children 165",
                "location": "Almaty, Kazakhstan",
                "details": "grades 5 - 8"
            },
            {
                "period": "2010 - 2015",
                "institution": "\"Akniet\" private school",
                "location": "Almaty, Kazakhstan",
                "details": "grades 0 - 4"
            }
        ]
    },
    {
        "name": "Иван Коробов",
        "role": "Intern React Developer",
        "photo": "https://i.ibb.co/8Dt19H53/photo-2025-04-05-03-57-00.jpg",
        "profileUrl": "/teachers/korobov-ivan",
        "description": (
            "Стажер фронтенд-разработчик в Яндекс.Отзывах. Студент 3 курса университета ИТМО, "
            "направления Прикладная математика и информатика."
        ),
        "github": "https://github.com/korobov-ivan",
        "phone": "7(999)123-45-67",
        "email": "ivan.korobov@yandex.com",
        "telegram": "https://t.me/korobov_ivan",
        "skills": ["React", "Redux", "TypeScript", "SCSS"],
        "location": "Saint-Petersburg, Russia",
        "courses": [
            {
                "title": "React Developer",
                "description": "Современная React разработка",
                "imageClass": "react-bg"
            }
        ],
        "education": [
            {
                "period": "2022 - nowadays",
                "institution": "ITMO University",
                "location": "Saint-Petersburg, Russia",
                "details": "Прикладная математика и информатика"
            }
        ]
    },
    {
        "name": "Ксения Кирюшкина",
        "role": "Beginner React Developer",
        "photo": "https://i.ibb.co/PvV4k4sc/photo-2025-04-05-04-06-46.jpg",
        "profileUrl": "/teachers/kseniya-kirjushkina",
        "description": (
            "Начинающий фронтенд разработчик со знаниями React, JS, HTML, CSS. Студент университета Итмо, ФИТИП"
        ),
        "github": "https://github.com/kseniya-kirjushkina",
        "phone": "7(921)456-78-90",
        "email": "kseniya.kirjushkina@gmail.com",
        "telegram": "https://t.me/kseniya_kirjushkina",
        "skills": ["React", "JavaScript", "CSS", "HTML"],
        "location": "Saint-Petersburg, Russia",
        "courses": [
            {
                "title": "React Developer",
                "description": "Современная React разработка",
                "imageClass": "react-bg"
            }
        ],
        "education": [
            {
                "period": "2022 - nowadays",
                "institution": "ITMO University",
                "location": "Saint-Petersburg, Russia",
                "details": "ФИТИП"
            }
        ]
    },
    {
        "name": "Екатерина Рязанова",
        "role": "Beginner React Developer",
        "photo": "https://i.ibb.co/y93nDJG/me.jpg",
        "profileUrl": "/teachers/ekaterina-ryazanova",
        "description": (
            "Начинающий фронтенд разработчик со знаниями React, JS, HTML, CSS."
        ),
        "github": "https://github.com/ekaterina-ryazanova",
        "phone": "7(812)987-65-43",
        "email": "ekaterina.ryazanova@mail.ru",
        "telegram": "https://t.me/ekaterina_ryazanova",
        "skills": ["React", "JavaScript", "CSS", "HTML"],
        "location": "Saint-Petersburg, Russia",
        "courses": [],
        "education": [
            {
                "period": "2021 - nowadays",
                "institution": "University",
                "location": "Saint-Petersburg, Russia",
                "details": "Информационные технологии"
            }
        ]
    },
    {
        "name": "Никита Тарасевич",
        "role": "Intern ML Engineer",
        "photo": "https://i.ibb.co/svGkv1WZ/photo-2025-04-19-08-27-36.jpg",
        "profileUrl": "/teachers/nikita-tarasevich",
        "description": (
            "Стажер ML разработчик ТатИТнефть. Студент 3 курса ИТМО, направления ПМИ"
        ),
        "github": "https://github.com/nikita-tarasevich",
        "phone": "7(950)321-98-76",
        "email": "nikita.tarasevich@yandex.ru",
        "telegram": "https://t.me/nikita_tarasevich",
        "skills": ["Python", "Machine Learning", "Data Science", "Deep Learning"],
        "location": "Saint-Petersburg, Russia",
        "courses": [
            {
                "title": "ML Start",
                "description": "Вводный курс по машинному обучению для начинающих",
                "imageClass": "ml-bg"
            },
            {
                "title": "Python Developer",
                "description": "Полный курс по Python разработке",
                "imageClass": "python-bg"
            }
        ],
        "education": [
            {
                "period": "2022 - nowadays",
                "institution": "ITMO University",
                "location": "Saint-Petersburg, Russia",
                "details": "Прикладная математика и информатика"
            }
        ]
    }
]


def seed_teachers():
    for teacher in teachers_data:
        resp = requests.post(f"{BASE_URL}/teachers", json=teacher)
        print(f"Teacher '{teacher['name']}':", resp.status_code, resp.text)


def seed_users():
    for user in users_data:
        payload = {
            'username': user['username'],
            'email': user['email'],
            'password': user['password']
        }
        resp = requests.post(f"{BASE_URL}/register", json=payload)
        print(f"User '{user['username']}':", resp.status_code)
        if resp.status_code >= 400:
            print(f"Error response: {resp.text}")


def seed_users_direct():
    """Альтернативный метод создания пользователей напрямую (если нужен)"""
    for user in users_data:
        payload = {
            'username': user['username'],
            'email': user['email'],
            'avatar': user.get('avatar'),
            'password': user['password']
        }
        resp = requests.post(f"{BASE_URL}/users", json=payload)
        print(f"User direct '{user['username']}':", resp.status_code)
        if resp.status_code >= 400:
            print(f"Error response: {resp.text}")


def seed_courses():
    # получаем все курсы
    resp = requests.get(f"{BASE_URL}/courses")
    existing = resp.json()
    for c in courses_new_data:
        # ищем по title
        course = next((x for x in existing if x['title'] == c['title']), None)
        payload = {
            'title': c['title'],
            'description': c['description'],
            'cover': c.get('cover'),
            'author_id': c['author_id'],
            'level': c['level'],
            'duration': c['duration'],
            'tags': c['tags'],
            'requirements': c['requirements'],
            'price': c['price'],
            'discount': c.get('discount'),
            'is_popular': c['is_popular'],
            'is_available': c.get('is_available', True),
            'background_color': c.get('background_color', '#e6f2ea'),
            'created_at': c['created_at'],
            'updated_at': c['updated_at'],
            'modules': c['modules']
        }
        if course:
            pass
            # обновляем
            # resp = requests.put(f"{BASE_URL}/courses/{course['id']}", json=payload)
            # print(f"Updated course '{c['title']}': {resp.status_code}")
        else:
            # создаём
            resp = requests.post(f"{BASE_URL}/courses", json=payload)
            print(f"Created course '{c['title']}': {resp.status_code}")


# def seed_courses_new():
#     for course in courses_new_data:
#         payload = {
#             'title': course['title'],
#             'description': course['description'],
#             'cover': course.get('cover'),
#             'author_id': course['author_id'],
#             'level': course['level'],
#             'duration': course['duration'],
#             'tags': course['tags'],
#             'requirements': course['requirements'],
#             'price': course['price'],
#             'discount': course.get('discount'),
#             'is_popular': course['is_popular'],
#             'created_at': course['created_at'],
#             'updated_at': course['updated_at'],
#             'modules': course['modules']
#         }
#         resp = requests.post(f"{BASE_URL}/courses", json=payload)
#         print(f"Course '{course['title']}':", resp.status_code)


def seed_reviews():
    for r in reviews_data:
        payload = {k: r[k] for k in ['author', 'avatar', 'rating', 'date', 'text', 'course_id', 'user_id']}
        resp = requests.post(f"{BASE_URL}/reviews", json=payload)
        print(f"Review by '{r['author']}':", resp.status_code)


def seed_comments():
    for course_id, lectures in comments_data.items():
        for lecture_id, comments in lectures.items():
            for c in comments:
                payload = {k: c[k] for k in ['author', 'avatar', 'text', 'date']}
                payload.update({'lecture_id': lecture_id, 'course_id': course_id, 'user_id': c['user_id']})
                resp = requests.post(f"{BASE_URL}/comments", json=payload)
                print(f"Comment from '{c['author']}':", resp.status_code)


def seed_ratings():
    for rt in ratings_data:
        resp = requests.post(f"{BASE_URL}/ratings", json=rt)
        print(f"Rating {rt}:", resp.status_code)


def seed_course_progress():
    for pr in course_progress_data:
        payload = pr.copy()
        payload['completed_lectures'] = pr['completed_lectures']
        resp = requests.post(f"{BASE_URL}/progress", json=payload)
        print(f"Progress {pr['user_id']}/{pr['course_id']}:", resp.status_code)


def seed_lecture_history():
    for lh in lecture_history_data:
        resp = requests.post(f"{BASE_URL}/history", json=lh)
        print(f"History for {lh['lecture_id']}:", resp.status_code)


def seed_teacher_lecture_assignments():
    """Создаёт связи между преподавателями и лекциями"""
    print("Назначение преподавателей на лекции...")

    # Получаем список всех преподавателей
    teachers_resp = requests.get(f"{BASE_URL}/teachers")
    if teachers_resp.status_code != 200:
        print("Ошибка получения преподавателей")
        return
    teachers = teachers_resp.json()

    # Получаем список всех курсов с лекциями
    courses_resp = requests.get(f"{BASE_URL}/courses")
    if courses_resp.status_code != 200:
        print("Ошибка получения курсов")
        return
    courses = courses_resp.json()

    # Назначаем преподавателей на лекции
    assignments = [
        # Python курс - Алёна Шинкарева (id: 1) и Никита Тарасевич (id: 5)
        {"course_title": "Python Developer", "teacher_names": ["Алёна Шинкарева", "Никита Тарасевич"]},
        # React курс - Алёна Шинкарева (id: 1), Иван Коробов (id: 2), Ксения Кирюшкина (id: 3)
        {"course_title": "React Developer", "teacher_names": ["Алёна Шинкарева", "Иван Коробов", "Ксения Кирюшкина"]},
        # ML Start курс - Никита Тарасевич (id: 5)
        {"course_title": "ML Start", "teacher_names": ["Никита Тарасевич"]},
    ]

    for assignment in assignments:
        # Найти курс по названию
        course = next((c for c in courses if c["title"] == assignment["course_title"]), None)
        if not course:
            print(f"Курс {assignment['course_title']} не найден")
            continue

        # Найти преподавателей по именам
        course_teachers = []
        for teacher_name in assignment["teacher_names"]:
            teacher = next((t for t in teachers if t["name"] == teacher_name), None)
            if teacher:
                course_teachers.append(teacher)
            else:
                print(f"Преподаватель {teacher_name} не найден")

        # Назначить преподавателей на все лекции курса
        if course.get("lectures"):
            for lecture in course["lectures"]:
                for teacher in course_teachers:
                    resp = requests.post(
                        f"{BASE_URL}/lectures/{lecture['id']}/teachers/{teacher['id']}"
                    )
                    if resp.status_code in [200, 201]:
                        print(f"✅ {teacher['name']} назначен на лекцию '{lecture['title']}'")
                    else:
                        print(f"❌ Ошибка назначения {teacher['name']} на лекцию '{lecture['title']}'")

        # Если лекции находятся в модулях
        if course.get("modules"):
            for module in course["modules"]:
                if module.get("lectures"):
                    for lecture in module["lectures"]:
                        for teacher in course_teachers:
                            resp = requests.post(
                                f"{BASE_URL}/lectures/{lecture['id']}/teachers/{teacher['id']}"
                            )
                            if resp.status_code in [200, 201]:
                                print(f"✅ {teacher['name']} назначен на лекцию '{lecture['title']}'")
                            else:
                                print(f"❌ Ошибка назначения {teacher['name']} на лекцию '{lecture['title']}'")

    print("Назначение преподавателей завершено!")


if __name__ == "__main__":
    print("🚀 Инициализация данных...")

    print("1️⃣ Создание пользователей...")
    seed_users()

    print("2️⃣ Создание преподавателей...")
    seed_teachers()

    print("3️⃣ Создание курсов...")
    seed_courses()

    print("4️⃣ Назначение преподавателей на лекции...")
    seed_teacher_lecture_assignments()

    print("5️⃣ Создание отзывов...")
    seed_reviews()

    print("6️⃣ Создание комментариев...")
    seed_comments()

    print("7️⃣ Создание рейтингов...")
    seed_ratings()

    print("8️⃣ Создание прогресса курсов...")
    seed_course_progress()

    print("9️⃣ Создание истории лекций...")
    seed_lecture_history()

    print("✅ Инициализация завершена!")
