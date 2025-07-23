// import { User } from '../types/auth';
// import { Comment, Rating } from '../types/comments';
// import { Course } from '../types/courses';
// import { CourseProgress, LectureHistory } from '../types/progress';
// import { Review } from '../types/reviews';

// // Моковые пользователи
// export const users: User[] = [
//   {
//     id: 'user_1',
//     username: 'Андрей Волков',
//     email: 'andrey@example.com',
//     avatar: 'https://i.ibb.co/XWxYZ2M/user1.jpg'
//   },
//   {
//     id: 'user_2',
//     username: 'Марина Соколова',
//     email: 'marina@example.com',
//     avatar: 'https://i.ibb.co/ThR7N4Z/user2.jpg'
//   }
// ];

// // Моковые комментарии
// export const comments: Record<string, Record<string, Comment[]>> = {
//   'python-developer': {
//     'python-basics': [
//       {
//         id: 'comment_1',
//         author: 'Андрей Волков',
//         avatar: 'https://i.ibb.co/XWxYZ2M/user1.jpg',
//         text: 'Отличная лекция! Очень доступно объяснены основы Python.',
//         date: '2024-03-15T10:30:00.000Z',
//         userId: 'user_1'
//       }
//     ]
//   },
//   'react-developer': {
//     'react-hooks': [
//       {
//         id: 'comment_2',
//         author: 'Марина Соколова',
//         avatar: 'https://i.ibb.co/ThR7N4Z/user2.jpg',
//         text: 'Наконец-то я поняла, как работают хуки в React!',
//         date: '2024-03-16T14:20:00.000Z',
//         userId: 'user_2'
//       }
//     ]
//   }
// };

// // Моковые рейтинги
// export const ratings: Rating[] = [
//   {
//     userId: 'user_1',
//     lectureId: 'python-basics',
//     courseId: 'python-developer',
//     like: true,
//     date: '2024-03-15T10:35:00.000Z'
//   },
//   {
//     userId: 'user_2',
//     lectureId: 'react-hooks',
//     courseId: 'react-developer',
//     like: true,
//     date: '2024-03-16T14:25:00.000Z'
//   }
// ];

// // Моковые отзывы
// export const reviews: Review[] = [
//   {
//     id: 'review_1',
//     author: 'Андрей Волков',
//     avatar: 'https://i.ibb.co/XWxYZ2M/user1.jpg',
//     rating: 5,
//     date: '2024-03-15',
//     text: 'Отличный курс по Python! Все очень понятно и структурировано.',
//     course: 'python-developer',
//     userId: 'user_1'
//   },
//   {
//     id: 'review_2',
//     author: 'Марина Соколова',
//     avatar: 'https://i.ibb.co/ThR7N4Z/user2.jpg',
//     rating: 4,
//     date: '2024-03-16',
//     text: 'Хороший курс по React, особенно понравился раздел про хуки.',
//     course: 'react-developer',
//     userId: 'user_2'
//   }
// ];

// // Моковый прогресс курсов
// export const courseProgress: CourseProgress[] = [
//   {
//     userId: 'user_1',
//     courseId: 'python-developer',
//     completedLectures: ['python-basics'],
//     lastWatchedLecture: 'python-basics',
//     overallProgress: 25,
//     lastPosition: 350,
//     lastUpdated: '2024-03-15T10:40:00.000Z'
//   },
//   {
//     userId: 'user_2',
//     courseId: 'react-developer',
//     completedLectures: ['react-hooks'],
//     lastWatchedLecture: 'react-hooks',
//     overallProgress: 33,
//     lastPosition: 450,
//     lastUpdated: '2024-03-16T14:30:00.000Z'
//   }
// ];

// // Моковая история лекций
// export const lectureHistory: LectureHistory[] = [
//   {
//     lectureId: 'python-basics',
//     watchedDuration: 350,
//     totalDuration: 600,
//     completed: false,
//     lastPosition: 350
//   },
//   {
//     lectureId: 'react-hooks',
//     watchedDuration: 450,
//     totalDuration: 500,
//     completed: true,
//     lastPosition: 450
//   }
// ];

// // Моковые курсы
// export const courses: Course[] = [
//   {
//     id: 'python-developer',
//     title: 'Python Developer',
//     description: 'Полный курс по Python разработке',
//     cover: 'https://example.com/python-cover.jpg',
//     author: 'Андрей Волков',
//     authorId: 'user_1',
//     level: 'beginner',
//     duration: 86400, // 24 часа
//     tags: ['python', 'backend', 'programming'],
//     requirements: ['Базовые знания компьютера'],
//     price: 15000,
//     is_popular: true,
//     modules: [
//       {
//         id: 'python-basics-module',
//         title: 'Основы Python',
//         description: 'Базовые концепции языка Python',
//         order: 1,
//         lectures: [
//           {
//             id: 'python-basics',
//             moduleId: 'python-basics-module',
//             title: 'Введение в Python',
//             description: 'Установка Python и первая программа',
//             duration: 3600,
//             order: 1,
//             videoUrl: 'https://example.com/python-intro.mp4',
//             attachments: [
//               {
//                 id: 'python-setup-guide',
//                 title: 'Руководство по установке',
//                 type: 'pdf',
//                 url: 'https://example.com/python-setup.pdf'
//               }
//             ]
//           },
//           {
//             id: 'python-variables',
//             moduleId: 'python-basics-module',
//             title: 'Переменные и типы данных',
//             description: 'Изучение основных типов данных в Python',
//             duration: 4800,
//             order: 2,
//             videoUrl: 'https://example.com/python-variables.mp4',
//             prerequisites: ['python-basics']
//           }
//         ]
//       }
//     ],
//     createdAt: '2024-01-01T00:00:00.000Z',
//     updatedAt: '2024-03-15T10:00:00.000Z'
//   },
//   {
//     id: 'react-developer',
//     title: 'React Developer',
//     description: 'Современная React разработка',
//     cover: 'https://example.com/react-cover.jpg',
//     author: 'Марина Соколова',
//     authorId: 'user_2',
//     level: 'intermediate',
//     duration: 72000, // 20 часов
//     tags: ['react', 'frontend', 'javascript'],
//     requirements: ['JavaScript', 'HTML', 'CSS'],
//     price: 20000,
//     discount: 15,
//     is_popular: true,
//     modules: [
//       {
//         id: 'react-basics-module',
//         title: 'Основы React',
//         description: 'Базовые концепции React',
//         order: 1,
//         lectures: [
//           {
//             id: 'react-intro',
//             moduleId: 'react-basics-module',
//             title: 'Введение в React',
//             description: 'Что такое React и зачем он нужен',
//             duration: 3600,
//             order: 1,
//             videoUrl: 'https://example.com/react-intro.mp4'
//           }
//         ]
//       },
//       {
//         id: 'react-hooks-module',
//         title: 'React Hooks',
//         description: 'Работа с хуками в React',
//         order: 2,
//         lectures: [
//           {
//             id: 'react-hooks',
//             moduleId: 'react-hooks-module',
//             title: 'Введение в хуки',
//             description: 'Основные хуки React',
//             duration: 5400,
//             order: 1,
//             videoUrl: 'https://example.com/react-hooks.mp4',
//             prerequisites: ['react-intro'],
//             attachments: [
//               {
//                 id: 'hooks-cheatsheet',
//                 title: 'Шпаргалка по хукам',
//                 type: 'pdf',
//                 url: 'https://example.com/hooks-cheatsheet.pdf'
//               },
//               {
//                 id: 'hooks-examples',
//                 title: 'Примеры использования',
//                 type: 'code',
//                 url: 'https://example.com/hooks-examples.js'
//               }
//             ]
//           }
//         ]
//       }
//     ],
//     createdAt: '2024-02-01T00:00:00.000Z',
//     updatedAt: '2024-03-16T14:00:00.000Z'
//   }
// ]; 