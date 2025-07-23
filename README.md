# React Course Platform

Учебная платформа для курсов по React с информацией о преподавателях.

## Установка и запуск

### Предварительные требования
- Node.js (версия 14+)
- npm

### Установка зависимостей

```bash
npm install
```

```bash
npm install react-router-dom @vitejs/plugin-react typescript @types/react @types/react-dom eslint-plugin-react-hooks eslint-plugin-react-refresh @typescript-eslint/eslint-plugin
```


### Запуск приложения в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу http://localhost:5173

### Сборка для продакшена

```bash
npm run build
```

## Структура проекта

Компоненты создаются по следующем правилам:


1) ComponentName.css - стили компонента
2) ComponentName.typings.ts - описание пропсов (ComponentNameProp)
3) ComponentName.tsx - сам код компонента (импортирует ComponentNameProps)
4) index.tsx - импорт стилей и компонента для экспорта

```
src/
├── components/               
│   ├── ComponentName/  
│   │   ├── ComponentName.css                     
│   │   ├── ComponentName.tsx        
│   │   ├── .typings.ts        
│   │   └── index.tsx        
```

Для компонентов, использующихся только внутри одного компонента (например лист лекций для страницы курса) - занести их в папку компонента сделующим образом:

1. Создаем папку внутри папки компонента "-ИмяПодкомпонента"
2. Основной файл в ней называем "ИмяКомпонента-ИмяПодкомпонента.tsx"
3. Остальные файлы как обычно (index, typing, css и тд)

Пример: src/components/TeacherProfile

```
-SubComponent/         
├── ComponentName-SubComponent.tsx
├── ComponentName-SubComponent.css      
├── .typings.ts        
└── index.tsx        
```


## Особенности проекта

- Использование React и TypeScript для типизации
- Маршрутизация через React Router
- Адаптивный дизайн для различных устройств
- Модульная структура компонентов
- Анимации и интерактивные элементы
- Профили преподавателей с подробной информацией

## Структура бэкенда

### Архитектура данных

#### Курсы и лекции
```typescript
Course -> Module (1:N)
Module -> Lecture (1:N)
Lecture -> Attachment (1:N)
Lecture -> Lecture (N:N, prerequisites)
```

- **Курс (Course)**: Содержит основную информацию о курсе и модули
- **Модуль (Module)**: Тематический блок курса, содержащий лекции
- **Лекция (Lecture)**: Учебный материал с видео и вложениями
- **Вложение (Attachment)**: Дополнительные материалы (PDF, код, ссылки)

### API Клиенты

#### 1. Курсы (`CoursesApi`)
```typescript
// Получение курсов
getCourses(): Promise<Course[]>
getCourse(courseId: string): Promise<Course | null>
getCourseModules(courseId: string): Promise<Module[]>
getModule(courseId: string, moduleId: string): Promise<Module | null>

// Работа с лекциями
getModuleLectures(courseId: string, moduleId: string): Promise<Lecture[]>
getLecture(courseId: string, moduleId: string, lectureId: string): Promise<Lecture | null>
getNextLecture(courseId: string, currentLectureId: string): Promise<Lecture | null>
getPreviousLecture(courseId: string, currentLectureId: string): Promise<Lecture | null>

// Поиск и фильтрация
searchCourses(query: string): Promise<Course[]>
getCoursesByLevel(level: 'beginner' | 'intermediate' | 'advanced'): Promise<Course[]>
getCoursesByTags(tags: string[]): Promise<Course[]>
```

#### 2. Аутентификация (`AuthApi`)
```typescript
login(username: string, password: string): Promise<AuthData>
register(username: string, password: string): Promise<AuthData>
getCurrentUser(token: string): Promise<User | null>
logout(): Promise<void>
```

#### 3. Комментарии и рейтинги (`CommentsApi`)
```typescript
getComments(courseId: string, lectureId: string): Promise<Comment[]>
addComment(courseId: string, lectureId: string, comment: Comment): Promise<Comment>
deleteComment(courseId: string, lectureId: string, commentId: string): Promise<void>
getRatingStats(courseId: string, lectureId: string): Promise<RatingStats>
setRating(rating: Rating): Promise<Rating>
```

#### 4. Прогресс обучения (`ProgressApi`)
```typescript
getCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null>
getUserProgress(userId: string): Promise<CourseProgress[]>
updateProgress(progress: CourseProgress): Promise<CourseProgress>
getLectureHistory(lectureId: string): Promise<LectureHistory | null>
```

#### 5. Отзывы (`ReviewsApi`)
```typescript
getReviews(): Promise<Review[]>
addReview(review: Review): Promise<Review>
deleteReview(reviewId: string): Promise<void>
getReviewsForCourse(courseId: string): Promise<Review[]>
```

### Использование API

```typescript
import { api } from './api';

// Пример использования
async function example() {
  try {
    // Авторизация
    const authData = await api.auth.login('username', 'password');
    
    // Получение курса
    const course = await api.courses.getCourse('react-developer');
    
    // Получение прогресса
    const progress = await api.progress.getCourseProgress(
      authData.user.id,
      course.id
    );
    
    // Добавление комментария
    const comment = await api.comments.addComment(
      course.id,
      'lecture-1',
      {
        text: 'Отличная лекция!',
        author: authData.user.username,
        avatar: authData.user.avatar
      }
    );
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### Особенности реализации

1. **Эмуляция API**:
   - Использование `localStorage` для хранения данных
   - Эмуляция задержек сети для реалистичного поведения
   - Базовый класс `ApiClient` для общей логики запросов

2. **Типизация**:
   - Строгая типизация через TypeScript
   - Интерфейсы для всех сущностей
   - Типы для запросов и ответов

3. **Моковые данные**:
   - Предзаполненные курсы и лекции
   - Демо-пользователи
   - Примеры комментариев и отзывов

4. **Навигация**:
   - Поддержка prerequisites для лекций
   - Навигация между лекциями (следующая/предыдущая)
   - Отслеживание прогресса

5. **Безопасность**:
   - Проверка авторизации
   - Валидация данных
   - Защита от несанкционированного доступа

### Подготовка к реальному API

Для перехода на реальный бэкенд необходимо:

1. Заменить `localStorage` на реальные HTTP-запросы
2. Добавить конфигурацию API (базовый URL, заголовки)
3. Реализовать обработку ошибок сети
4. Добавить механизм обновления токенов
5. Настроить кэширование данных

Текущая архитектура позволяет легко заменить моковые данные на реальные, сохраняя тот же интерфейс для компонентов.
