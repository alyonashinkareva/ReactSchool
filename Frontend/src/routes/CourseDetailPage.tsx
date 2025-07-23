import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import LectureList from '../components/LectureList';
import TagFilter from '../components/TagFilter';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import AddReviewForm from '../components/AddReviewForm/AddReviewForm';
import '../styles/CourseDetailPage.css';
import { useAuth } from '../contexts/AuthContext';
import progressService from '../services/progressService';
import { Lecture } from '../components/LectureList/LectureList.typings';
import { coursesService } from '../services/coursesService';
import { Course, Module } from '../types/courses';

const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated, user } = useAuth();
  const [completedLectures, setCompletedLectures] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [completedLectureIds, setCompletedLectureIds] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const [quizStatuses, setQuizStatuses] = useState<Array<{lectureId: string, isCompleted: boolean, score?: number}>>([]);

  useEffect(() => {
    if (!courseId) return;
    setLoading(true);
    const numericCourseId = parseInt(courseId, 10);
    if (isNaN(numericCourseId)) {
      setLoading(false);
      return;
    }
    Promise.all([
      coursesService.getCourse(numericCourseId),
      coursesService.getCourseModules(numericCourseId)
    ]).then(([courseData, modulesData]) => {
      if (courseData) {
        console.log(courseData);
        const lecturesWithStringIds: Lecture[] = courseData.lectures?.map(lecture => ({
          id: lecture.id.toString(),
          title: lecture.title,
          number: lecture.number,
          teachers: lecture.teachers?.map(teacher => ({
            id: teacher.id.toString(),
            name: teacher.name,
            photo: teacher.photo
          })) || [],
          tags: lecture.tags
        })) || [];
        courseData.lectures = lecturesWithStringIds as any;
      }
      setCourse(courseData);
      setModules(modulesData);
      setLoading(false);
    });
  }, [courseId]);

  useEffect(() => {
    const loadProgress = async () => {
      if (!courseId || !isAuthenticated || !user) return;
      const numericCourseId = parseInt(courseId, 10);
      const progress = await progressService.getCourseProgress(numericCourseId, user.id);
      if (progress) {
        setCompletedLectures(progress.completedLectures.length);
        setProgressPercentage(progress.overallProgress);
        setCompletedLectureIds(progress.completedLectures);
      }
    };
    loadProgress();
  }, [courseId, isAuthenticated, user]);

  // Загрузка статусов квизов
  useEffect(() => {
    const loadQuizStatuses = async () => {
      if (!courseId || !isAuthenticated || !user || !course?.lectures) return;
      
      const lectureIds = course.lectures.map(lecture => lecture.id.toString());
      const statuses = await progressService.getCourseQuizStatuses(
        parseInt(courseId, 10), 
        lectureIds, 
        user.id
      );
      setQuizStatuses(statuses);
    };
    
    loadQuizStatuses();
  }, [courseId, isAuthenticated, user, course?.lectures]);

  // Получение всех доступных тегов из лекций курса
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    modules.forEach(module => {
      module.lectures.forEach(lecture => {
        if (lecture.tags) {
          lecture.tags.forEach(tag => tags.add(tag));
        }
      });
    });
    return Array.from(tags).sort();
  }, [modules]);

  // Собираем все лекции из всех модулей
  const allLectures = useMemo(() => {
    return modules.flatMap(module => module.lectures);
  }, [modules]);

  // Фильтрация лекций по выбранным тегам
  const filteredLectures = useMemo(() => {
    if (selectedTags.length === 0) {
      return allLectures;
    }
    return allLectures.filter(lecture => {
      if (!lecture.tags) return false;
      return selectedTags.some(selectedTag => lecture.tags!.includes(selectedTag));
    });
  }, [allLectures, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  const handleReviewAdded = () => {
    setRefreshReviews(prev => prev + 1);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!course) {
    return <Navigate to="/courses" />;
  }

  const totalLectures = allLectures.length;

  return (
    <div className="course-detail-page">
      <Header />
      <div className="course-info">
        <div className="course-info__content">
          <h1 className="course-info__title">{course.title}</h1>
          <p className="course-info__description">{course.description}</p>
          <div className="course-info__stats-container">
            <div className="course-info__progress">
              <div className="course-info__progress-bar">
                <div
                  className="course-info__progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="course-info__stats">
              <div className="course-info__stat">
                <div className="course-info__stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                    <path d="M7 12H9V17H7V12ZM15 7H17V17H15V7ZM11 14H13V17H11V14ZM11 10H13V12H11V10Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="course-info__stat-content">
                  <div className="course-info__stat-value">{completedLectures}/{totalLectures}</div>
                  <div className="course-info__stat-label">параграфов пройдено</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="course-detail-page__content">
        {availableTags.length > 0 && (
          <TagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearAll={handleClearAllTags}
          />
        )}
        <LectureList
          courseId={course.id}
          courseTitle={course.title}
          lectures={course.lectures?.map(lecture => ({
            id: lecture.id.toString(),
            title: lecture.title,
            number: lecture.number,
            teachers: lecture.teachers?.map(teacher => ({
              id: teacher.id.toString(),
              name: teacher.name,
              photo: teacher.photo
            })) || [],
            tags: lecture.tags
          })) || []}
          quizStatuses={quizStatuses}
          completedLectureIds={completedLectureIds}
        />
        {selectedTags.length > 0 && filteredLectures.length === 0 && (
          <div className="course-detail-page__no-results">
            <div className="course-detail-page__no-results-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="8" stroke="#9ca3af" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="course-detail-page__no-results-title">
              Лекции не найдены
            </h3>
            <p className="course-detail-page__no-results-text">
              Попробуйте изменить выбранные теги или очистить фильтр
            </p>
          </div>
        )}
        
        {/* Секция отзывов */}
        <div className="course-reviews-section">
          <ReviewsList key={refreshReviews} courseId={course.id} />
          
          {isAuthenticated && user ? (
            <AddReviewForm
              courseId={course.id}
              userId={typeof user.id === 'string' ? parseInt(user.id) : user.id}
              userName={user.username}
              userAvatar={user.avatar}
              onReviewAdded={handleReviewAdded}
            />
          ) : (
            <div className="auth-prompt">
              <h3>Хотите оставить отзыв о курсе?</h3>
              <p>Войдите или зарегистрируйтесь, чтобы поделиться своим мнением</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage; 