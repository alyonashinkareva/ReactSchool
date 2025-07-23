import { User } from './authService';

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  avatar?: string;
  userId?: string;
}

interface Rating {
  userId: string;
  lectureId: string;
  courseId: string;
  like: boolean;
  date: string;
}

interface RatingStats {
  likes: number;
  dislikes: number;
}

// Ключи для localStorage
const COMMENTS_KEY = 'react_school_comments';
const RATINGS_KEY = 'react_school_ratings';

// Начальные демо-комментарии
const initialComments = {
  'python-developer': {
    'python-basics': [
      {
        id: 'comment_1',
        author: 'Андрей Волков',
        avatar: 'https://i.ibb.co/XWxYZ2M/user1.jpg',
        text: 'Отличная лекция! Очень доступно объяснены основы Python. Преподаватель дает много примеров из реальной практики, а не только сухую теорию.',
        date: '12.05.2023',
        userId: 'demo_user_1'
      },
      {
        id: 'comment_2',
        author: 'Марина Соколова',
        avatar: 'https://i.ibb.co/ThR7N4Z/user2.jpg',
        text: 'Спасибо за подробное объяснение! Было очень понятно, даже для новичка. Особенно понравились практические задания в конце.',
        date: '15.05.2023',
        userId: 'demo_user_2'
      }
    ]
  },
  'react-developer': {
    'react-hooks': [
      {
        id: 'comment_3',
        author: 'Дмитрий Иванов',
        avatar: 'https://i.ibb.co/NtwD3Cs/user4.jpg',
        text: 'Наконец-то я понял, как работают хуки в React! Спасибо за подробное объяснение и примеры с использованием useEffect и useContext.',
        date: '20.06.2023',
        userId: 'demo_user_3'
      },
      {
        id: 'comment_4',
        author: 'Ольга Смирнова',
        avatar: 'https://i.ibb.co/0GJh2v2/user5.jpg',
        text: 'Лекция очень полезная, но мне кажется можно было бы добавить больше примеров с useReducer и useMemo. В целом понравилось, буду применять на практике!',
        date: '22.06.2023',
        userId: 'demo_user_4'
      },
      {
        id: 'comment_5',
        author: 'Алексей Кузнецов',
        avatar: 'https://i.ibb.co/qyCnW2x/user3.jpg',
        text: 'Очень понравилось объяснение кастомных хуков! Теперь могу оптимизировать свой код и избавиться от дублирования логики в компонентах.',
        date: '25.06.2023',
        userId: 'demo_user_5'
      }
    ],
    'react-basics': [
      {
        id: 'comment_6',
        author: 'Максим Козлов',
        avatar: 'https://i.ibb.co/nLs9ncB/user6.jpg',
        text: 'Отличное введение в React! Понравилось объяснение про компонентный подход и однонаправленный поток данных. Сразу все встало на свои места.',
        date: '10.07.2023',
        userId: 'demo_user_6'
      },
      {
        id: 'comment_7',
        author: 'Екатерина Новикова',
        avatar: 'https://i.ibb.co/vwnQRnK/user7.jpg',
        text: 'Спасибо за урок! Очень доступно объяснена концепция JSX и работа с пропсами. Жду следующих лекций!',
        date: '12.07.2023',
        userId: 'demo_user_7'
      }
    ]
  }
};

// Функция для инициализации комментариев при первом использовании
const initializeCommentsIfNeeded = () => {
  const savedComments = localStorage.getItem(COMMENTS_KEY);
  if (!savedComments) {
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(initialComments));
  }
};

// Сервис для работы с комментариями
export const commentService = {
  // Получить комментарии для конкретной лекции
  getComments(courseId: string, lectureId: string): Comment[] {
    initializeCommentsIfNeeded();
    
    const commentsData = localStorage.getItem(COMMENTS_KEY);
    if (!commentsData) return [];
    
    const allComments = JSON.parse(commentsData);
    return (allComments[courseId] && allComments[courseId][lectureId]) 
      ? allComments[courseId][lectureId] 
      : [];
  },

  // Добавить комментарий
  addComment(courseId: string, lectureId: string, user: User, text: string): Comment {
    const comment: Comment = {
      id: `comment_${Date.now()}`,
      author: user.username,
      avatar: user.avatar || 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle',
      text,
      date: new Date().toLocaleDateString(),
      userId: user.id
    };

    const commentsData = localStorage.getItem(COMMENTS_KEY);
    const allComments = commentsData ? JSON.parse(commentsData) : {};
    
    if (!allComments[courseId]) {
      allComments[courseId] = {};
    }
    
    if (!allComments[courseId][lectureId]) {
      allComments[courseId][lectureId] = [];
    }
    
    allComments[courseId][lectureId].push(comment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
    
    return comment;
  },

  // Удалить комментарий
  deleteComment(courseId: string, lectureId: string, commentId: string): void {
    const commentsData = localStorage.getItem(COMMENTS_KEY);
    if (!commentsData) return;
    
    const allComments = JSON.parse(commentsData);
    
    if (allComments[courseId] && allComments[courseId][lectureId]) {
      allComments[courseId][lectureId] = allComments[courseId][lectureId]
        .filter((comment: Comment) => comment.id !== commentId);
      
      localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
    }
  }
};

// Сервис для работы с лайками/дизлайками
export const ratingService = {
  // Получить статистику лайков/дизлайков для лекции
  getRatingStats(courseId: string, lectureId: string): RatingStats {
    const ratingsData = localStorage.getItem(RATINGS_KEY);
    if (!ratingsData) return { likes: 0, dislikes: 0 };
    
    const allRatings: Rating[] = JSON.parse(ratingsData);
    const lectureRatings = allRatings.filter(
      rating => rating.courseId === courseId && rating.lectureId === lectureId
    );
    
    const likes = lectureRatings.filter(rating => rating.like).length;
    const dislikes = lectureRatings.filter(rating => !rating.like).length;
    
    return { likes, dislikes };
  },

  // Получить оценку пользователя для лекции
  getUserRating(courseId: string, lectureId: string, userId: string): Rating | null {
    const ratingsData = localStorage.getItem(RATINGS_KEY);
    if (!ratingsData) return null;
    
    const allRatings: Rating[] = JSON.parse(ratingsData);
    return allRatings.find(
      rating => rating.courseId === courseId && 
               rating.lectureId === lectureId && 
               rating.userId === userId
    ) || null;
  },

  // Установить оценку (лайк/дизлайк)
  setRating(courseId: string, lectureId: string, userId: string, like: boolean): void {
    const ratingsData = localStorage.getItem(RATINGS_KEY);
    const allRatings: Rating[] = ratingsData ? JSON.parse(ratingsData) : [];
    
    // Удаляем предыдущую оценку пользователя, если она есть
    const filteredRatings = allRatings.filter(
      rating => !(rating.courseId === courseId && 
                 rating.lectureId === lectureId && 
                 rating.userId === userId)
    );
    
    // Добавляем новую оценку
    filteredRatings.push({
      userId,
      courseId,
      lectureId,
      like,
      date: new Date().toISOString()
    });
    
    localStorage.setItem(RATINGS_KEY, JSON.stringify(filteredRatings));
  },

  // Удалить оценку
  removeRating(courseId: string, lectureId: string, userId: string): void {
    const ratingsData = localStorage.getItem(RATINGS_KEY);
    if (!ratingsData) return;
    
    const allRatings: Rating[] = JSON.parse(ratingsData);
    const filteredRatings = allRatings.filter(
      rating => !(rating.courseId === courseId && 
                 rating.lectureId === lectureId && 
                 rating.userId === userId)
    );
    
    localStorage.setItem(RATINGS_KEY, JSON.stringify(filteredRatings));
  }
};

export default commentService; 