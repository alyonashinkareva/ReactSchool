import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import AddReviewForm from '../components/AddReviewForm/AddReviewForm';
import '../styles/ReviewsPage.css';
import { useAuth } from '../contexts/AuthContext';
import { CoursesApi } from '../api/coursesApi';
import { Course } from '../types/courses';

const ReviewsPage: React.FC = () => {
    const { user, isAuthenticated } = useAuth();
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const coursesApi = new CoursesApi();

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const coursesData = await coursesApi.getCourses();
            setCourses(coursesData);
            if (coursesData.length > 0) {
                setSelectedCourseId(coursesData[0].id);
            }
        } catch (err) {
            setError('Ошибка при загрузке курсов');
            console.error('Error loading courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReviewAdded = () => {
        // Обновляем компонент отзывов после добавления нового отзыва
        setRefreshKey(prev => prev + 1);
    };

    const handleCourseChange = (courseId: string) => {
        setSelectedCourseId(courseId === 'all' ? null : parseInt(courseId));
    };

    if (loading) {
        return (
            <div className="reviews-page">
                <Header />
                <div className="reviews-container">
                    <div className="loading-message">Загрузка курсов...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="reviews-page">
                <Header />
                <div className="reviews-container">
                    <div className="error-message">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="reviews-page">
            <Header />
            <div className="reviews-hero-wrapper">
                <div className="reviews-hero-content">
                    <h1 className="reviews-hero-title">Отзывы наших студентов</h1>
                    <p className="reviews-hero-subtitle">
                        Отзывы студентов - наша гордость: истории успеха и впечатления от обучения
                    </p>
                </div>
                <img
                    src="https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fusers-1.c7476147.png&w=1920&q=75"
                    alt="Наши студенты"
                    className="reviews-hero-image"
                    height={100}
                />
            </div>
            
            <div className="reviews-container">
                <div className="reviews-controls">
                    <div className="reviews-filters">
                        <div className="filter-label">Выберите курс:</div>
                        <select
                            value={selectedCourseId || 'all'}
                            onChange={(e) => handleCourseChange(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">Все курсы</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>
                                    {course.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {selectedCourseId ? (
                    <>
                        <ReviewsList key={`${selectedCourseId}-${refreshKey}`} courseId={selectedCourseId} />
                        
                                                 {isAuthenticated && user ? (
                             <AddReviewForm
                                 courseId={selectedCourseId}
                                 userId={typeof user.id === 'string' ? parseInt(user.id) : user.id}
                                 userName={user.username}
                                 userAvatar={user.avatar}
                                 onReviewAdded={handleReviewAdded}
                             />
                         ) : (
                            <div className="auth-prompt">
                                <h3>Хотите оставить отзыв?</h3>
                                <p>Войдите или зарегистрируйтесь, чтобы поделиться своим мнением о курсе</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="select-course-message">
                        <h3>Выберите курс</h3>
                        <p>Выберите курс из списка выше, чтобы посмотреть отзывы</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;