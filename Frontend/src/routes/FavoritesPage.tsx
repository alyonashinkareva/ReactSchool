import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { favoritesService, FavoriteLecture } from '../services/favoritesService';
import '../styles/FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [favoriteLectures, setFavoriteLectures] = useState<FavoriteLecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        const favorites = await favoritesService.getFavoriteLectures(user.id);
        setFavoriteLectures(favorites);
      } catch (err) {
        setError('Не удалось загрузить понравившиеся лекции');
        console.error('Error loading favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();

    // Слушаем изменения избранного
    const handleFavoritesChange = (event: CustomEvent) => {
      if (event.detail.userId === user?.id) {
        loadFavorites();
      }
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange as EventListener);

    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange as EventListener);
    };
  }, [isAuthenticated, user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="favorites-page">
        <Header />
        <div className="favorites-container">
          <div className="favorites-header">
            <h1>Понравившиеся лекции</h1>
          </div>
          <div className="favorites-empty">
            <div className="empty-icon">❤️</div>
            <h2>Войдите в аккаунт</h2>
            <p>Чтобы просматривать понравившиеся лекции, необходимо войти в систему</p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="favorites-page">
        <Header />
        <div className="favorites-container">
          <div className="favorites-header">
            <h1>Понравившиеся лекции</h1>
          </div>
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Загрузка понравившихся лекций...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-page">
        <Header />
        <div className="favorites-container">
          <div className="favorites-header">
            <h1>Понравившиеся лекции</h1>
          </div>
          <div className="favorites-error">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <Header />
      <div className="favorites-container">
        <div className="favorites-header">
          <h1>Понравившиеся лекции</h1>
          <p className="favorites-subtitle">
            {favoriteLectures.length > 0 
              ? `У вас ${favoriteLectures.length} понравившихся лекций`
              : 'Пока нет понравившихся лекций'
            }
          </p>
        </div>

        {favoriteLectures.length === 0 ? (
          <div className="favorites-empty">
            <div className="empty-icon">📚</div>
            <h2>Нет понравившихся лекций</h2>
            <p>Лайкайте лекции, которые вам понравились, и они появятся здесь</p>
            <Link to="/courses" className="browse-courses-btn">
              Посмотреть курсы
            </Link>
          </div>
        ) : (
          <div className="favorites-list">
            {favoriteLectures.map((lecture) => (
              <div key={`${lecture.courseId}-${lecture.id}`} className="favorite-lecture-card">
                <div className="lecture-card-content">
                  <div className="lecture-card-header">
                    <h3 className="lecture-title">
                      <Link to={`/courses/${lecture.courseId}/lectures/${lecture.id}`}>
                        {lecture.title}
                      </Link>
                    </h3>
                    <div className="lecture-meta">
                      <span className="course-title">
                        <Link to={`/courses/${lecture.courseId}`}>
                          {lecture.courseTitle}
                        </Link>
                      </span>
                      <span className="liked-date">
                        Понравилось {formatDate(lecture.likedDate)}
                      </span>
                    </div>
                  </div>

                  <div className="lecture-teachers">
                    {lecture.teachers.map(teacher => (
                      <Link 
                        key={teacher.id}
                        to={`/teachers/${teacher.id}`}
                        className="lecture-teacher"
                      >
                        <img 
                          src={teacher.photo} 
                          alt={teacher.name}
                          className="teacher-avatar"
                        />
                        <span className="teacher-name">{teacher.name}</span>
                      </Link>
                    ))}
                  </div>

                  {lecture.tags && lecture.tags.length > 0 && (
                    <div className="lecture-tags">
                      {lecture.tags.map(tag => (
                        <span key={tag} className="lecture-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="lecture-card-actions">
                  <Link 
                    to={`/courses/${lecture.courseId}/lectures/${lecture.id}`}
                    className="watch-lecture-btn"
                  >
                    Смотреть лекцию
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; 