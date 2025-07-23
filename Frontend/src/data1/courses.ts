// export const teachers = {
//     'korobov-ivan': {
//         id: 'korobov-ivan',
//         name: 'Иван Коробов',
//         role: 'Intern React Developer',
//         photo: 'https://i.ibb.co/8Dt19H53/photo-2025-04-05-03-57-00.jpg',
//         description: 'Стажер фронтенд-разработчик в Яндекс.Отзывах'
//     },
//     'alyona-shinkareva': {
//         id: 'alyona-shinkareva',
//         name: 'Алёна Шинкарева',
//         role: 'Junior React Developer',
//         photo: 'https://i.ibb.co/tTYH1KvM/alyona-shinkareva.png',
//         description: 'Frontend разработчик, специализируется на React и TypeScript'
//     },
//     'kseniya-kirjushkina': {
//         id: 'kseniya-kirjushkina',
//         name: 'Кирюшкина Ксения',
//         role: 'Beginner React Developer',
//         photo: 'https://i.ibb.co/PvV4k4sc/photo-2025-04-05-04-06-46.jpg',
//         description: 'Frontend разработчик, эксперт по современным JavaScript фреймворкам'
//     },
//     'ivan-petrov': {
//         id: 'ivan-petrov',
//         name: 'Иван Петров',
//         role: 'Senior Developer',
//         photo: '/teachers/ivan-petrov.jpg',
//         description: 'Опытный разработчик с более чем 10-летним стажем в Python и ML'
//     },
//     'maria-sidorova': {
//         id: 'maria-sidorova',
//         name: 'Мария Сидорова',
//         role: 'Team Lead',
//         photo: '/teachers/maria-sidorova.jpg',
//         description: 'Руководитель команды разработки и опытный преподаватель'
//     },
//     'ekaterina-ryazanova': {
//         id: 'ekaterina-ryazanova',
//         name: 'Екатерина Рязанова',
//         role: 'Beginner React Developer',
//         photo: 'https://i.ibb.co/y93nDJG/me.jpg',
//         description: 'Frontend разработчик'
//     },
//     'nikita-tarasevich': {
//         id: 'nikita-tarasevich',
//         name: 'Никита Тарасевич',
//         role: 'Intern ML Engineer',
//         photo: 'https://i.ibb.co/svGkv1WZ/photo-2025-04-19-08-27-36.jpg',
//         description: 'Стажер ML разработчик ТатИТнефть'
//     }
// };

// export const courses = {
//     'python-developer': {
//         id: 'python-developer',
//         title: 'Python-разработчик',
//         lectures: [
//             {
//                 id: 'introduction',
//                 title: 'Введение в Python',
//                 number: 1,
//                 tags: ['Основы', 'Начинающий', 'Теория', 'Python', 'Введение', 'Синтаксис'],
//                 teachers: [teachers['korobov-ivan'], teachers['alyona-shinkareva']],
//                 rating: {
//                     value: 4.5,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             },
//             {
//                 id: 'basics',
//                 title: 'Основы программирования на Python',
//                 number: 2,
//                 tags: ['Основы', 'Переменные', 'Типы данных', 'Практика', 'Условия', 'Циклы', 'Функции'],
//                 teachers: [teachers['alyona-shinkareva'], teachers['kseniya-kirjushkina']],
//                 rating: {
//                     value: 4.9,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             }
//         ],
//         description:
//             'Курс поможет овладеть основным синтаксисом и принципами языка. \n' +
//             'Для этого не потребуется специальной подготовки — достаточно базовых знаний \n' +
//             'по информатике и математике. В последней главе вы прикоснётесь к главной \n' +
//             'суперсиле языка — большому количеству прикладных библиотек.'
//     },
//     'qa-engineer': {
//         id: 'qa-engineer',
//         title: 'Инженер по тестированию',
//         lectures: [
//             {
//                 id: 'testing-intro',
//                 title: 'Введение в тестирование',
//                 number: 1,
//                 tags: ['Основы', 'Тестирование', 'Теория', 'Начинающий', 'QA', 'Качество', 'Методологии'],
//                 teachers: [teachers['korobov-ivan'], teachers['alyona-shinkareva']],
//                 rating: {
//                     value: 4.2,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             },
//             {
//                 id: 'automation',
//                 title: 'Автоматизация тестирования',
//                 number: 2,
//                 tags: ['Автоматизация', 'Продвинутый', 'Практика', 'Инструменты', 'Selenium', 'API', 'CI/CD'],
//                 teachers: [teachers['alyona-shinkareva'], teachers['kseniya-kirjushkina']],
//                 rating: {
//                     value: 4.0,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             }
//         ],
//         description:
//             'Курс поможет овладеть основным синтаксисом и принципами языка. \n' +
//             'Для этого не потребуется специальной подготовки — достаточно базовых знаний \n' +
//             'по информатике и математике. В последней главе вы прикоснётесь к главной \n' +
//             'суперсиле языка — большому количеству прикладных библиотек.'
//     },
//     'data-scientist': {
//         id: 'data-scientist',
//         title: 'Data scientist',
//         lectures: [
//             {
//                 id: 'data-analysis',
//                 title: 'Анализ данных',
//                 number: 1,
//                 tags: ['Анализ данных', 'Pandas', 'Numpy', 'Практика', 'Визуализация', 'Matplotlib', 'Seaborn'],
//                 teachers: [teachers['korobov-ivan'], teachers['kseniya-kirjushkina']],
//                 rating: {
//                     value: 4.5,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             },
//             {
//                 id: 'machine-learning',
//                 title: 'Машинное обучение',
//                 number: 2,
//                 tags: ['ML', 'Алгоритмы', 'Продвинутый', 'Нейросети', 'TensorFlow', 'Scikit-learn', 'Deep Learning'],
//                 teachers: [teachers['alyona-shinkareva'], teachers['kseniya-kirjushkina']],
//                 rating: {
//                     value: 4.84,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             }
//         ],
//         description:
//             'Курс поможет овладеть основным синтаксисом и принципами языка. \n' +
//             'Для этого не потребуется специальной подготовки — достаточно базовых знаний \n' +
//             'по информатике и математике. В последней главе вы прикоснётесь к главной \n' +
//             'суперсиле языка — большому количеству прикладных библиотек.'
//     },
//     'frontend-developer': {
//         id: 'frontend-developer',
//         title: 'Фронтенд-разработчик',
//         lectures: [
//             {
//                 id: 'html-css',
//                 title: 'HTML и CSS',
//                 number: 1,
//                 tags: ['HTML', 'CSS', 'Верстка', 'Основы', 'Начинающий', 'Flexbox', 'Grid', 'Responsive'],
//                 teachers: [teachers['korobov-ivan'], teachers['alyona-shinkareva']],
//                 rating: {
//                     value: 4.5,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             },
//             {
//                 id: 'javascript',
//                 title: 'JavaScript основы',
//                 number: 2,
//                 tags: ['JavaScript', 'Основы', 'Переменные', 'Функции', 'Практика', 'ES6', 'DOM', 'Events'],
//                 teachers: [teachers['alyona-shinkareva'], teachers['kseniya-kirjushkina']],
//                 rating: {
//                     value: 4.5,
//                     count: 10
//                 },
//                 comments: [
//                     {
//                         id: "1",
//                         author: "Анна Петрова",
//                         text: "Отличная лекция! Очень понятно объяснили основы.",
//                         date: "15.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     },
//                     {
//                         id: "2",
//                         author: "Иван Сидоров",
//                         text: "Спасибо за материал. Хотелось бы больше практических примеров.",
//                         date: "18.04.2023",
//                         avatar: "https://i.ibb.co/7QZGsBD/avatar-default.png"
//                     }
//                 ],
//             }
//         ],
//         description:
//             'Курс поможет овладеть основным синтаксисом и принципами языка. \n' +
//             'Для этого не потребуется специальной подготовки — достаточно базовых знаний \n' +
//             'по информатике и математике. В последней главе вы прикоснётесь к главной \n' +
//             'суперсиле языка — большому количеству прикладных библиотек.'
//     }
// }; 