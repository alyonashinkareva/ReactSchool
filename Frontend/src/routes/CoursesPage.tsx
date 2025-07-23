import React, { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';
import '../styles/CoursesPage.css';
import Button from "../components/Button";
import { CoursesApi } from '../api/coursesApi';
import { Course } from '../types/courses';

const coursesApi = new CoursesApi();

const CoursesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await coursesApi.getCourses();
        console.log(coursesData);
        setCourses(coursesData);
        console.log(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Функция для фильтрации курсов
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="courses-page">
      <Header lection="Список курсов" />

      <div className="courses-page__banner-wrapper">
        <div className="courses-page__banner-content">
          <h1 className="courses-page__banner-title">Найдите курс своей мечты</h1>
          <p className="courses-page__banner-subtitle">Самые популярные курсы для развития в IT, которые помогут вам стать лучше</p>
        </div>
        <img
            src="https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fusers-2.5cf559e2.png&w=1920&q=75"
            alt="ReactSchool Banner"
            className="courses-page__banner"
            height={100}
        />
      </div>

      <div className="courses-page__content">
        <div className="courses-page__header">
          <h2 className="courses-page__title">Каталог профессий</h2>
          
          <div className="courses-page__search">
            <div className="courses-page__search-wrapper">
              <span className="courses-page__search-icon">🔍</span>
              <input
                  type="text"
                  placeholder="Поиск по названию или ключевым словам"
                  className="courses-page__search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="courses-page__clear-search" 
                  onClick={() => setSearchQuery('')}
                  title="Очистить поиск"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="courses-page__empty">
            <h3>Курсы не найдены</h3>
            <p>Попробуйте изменить запрос или очистить поиск</p>
            <div
            style={{ display: 'inline-block' }}
            >
              <Button 
              variant="secondary" 
              onClick={() => setSearchQuery('')}
            >
              Очистить поиск
            </Button>
            </div>
          </div>
        ) : (
          <div className="courses-page__grid">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id}
                id={course.id.toString()}
                title={course.title}
                description={course.description || ''}
                cover={course.cover}
                url={`/courses/${course.id}`}
                isAvailable={course.is_available}
                duration={course.duration}
                isPopular={course.is_popular}
                backgroundColor={course.background_color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 