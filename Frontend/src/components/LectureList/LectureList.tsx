import React from 'react';
import { Link } from 'react-router-dom';
import { ILectureListProps } from './LectureList.typings';
import './LectureList.css';

// interface Teacher {
//   id: string;
//   name: string;
//   photo: string;
// }

// export interface ILecture {
//   id: string;
//   title: string;
//   number: number;
//   teachers: Teacher[];
// }

const LectureList: React.FC<ILectureListProps> = ({ 
  courseId, 
  lectures, 
  quizStatuses = [],
  completedLectureIds = []
}) => {
  // Функция для получения статуса квиза по ID лекции
  const getQuizStatus = (lectureId: string) => {
    return quizStatuses.find(status => status.lectureId === lectureId);
  };
  
  return (
    <div className="lecture-list">
      <div className="lecture-list__items">
        {lectures.map((lecture, index) => {
          // Проверяем, завершена ли лекция по её ID, а не по индексу
          const isCompleted = completedLectureIds.includes(lecture.id);
          const quizStatus = getQuizStatus(lecture.id);
          
          return (
            <Link 
              key={lecture.id} 
              to={`/courses/${courseId}/lectures/${lecture.id}`}
              className={`lecture-item ${isCompleted ? 'lecture-item--completed' : ''}`}
            >
              <div className="lecture-item__main">
                <div className="lecture-item__number">{index + 1}</div>
                <div className="lecture-item__content">
                  <h3 className="lecture-item__title">{lecture.title}</h3>
                  
                  <div className="lecture-item__teachers">
                    {lecture.teachers.map(teacher => (
                      <Link 
                        key={teacher.id}
                        to={`/teachers/${teacher.id}`}
                        className="lecture-item__teacher"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img 
                          src={teacher.photo} 
                          alt={teacher.name}
                          className="lecture-item__teacher-avatar"
                        />
                        <span className="lecture-item__teacher-name">{teacher.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Теги лекции */}
                  {lecture.tags && lecture.tags.length > 0 && (
                    <div className="lecture-item__tags">
                      {lecture.tags.map(tag => (
                        <span key={tag} className="lecture-item__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="lecture-item__status-container">
                  <div className={`lecture-item__status ${isCompleted ? 'lecture-item__status--completed' : ''}`}>
                    {isCompleted ? 'Пройдена' : 'Не пройдена'}
                  </div>
                  {/* Статус квиза */}
                  <div className="lecture-item__quiz-status">
                    {quizStatus ? (
                      quizStatus.isCompleted ? (
                        <div className="lecture-item__quiz lecture-item__quiz--completed">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#10B981" stroke="#10B981" strokeWidth="2"/>
                            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Тест решен {quizStatus.score ? `(${quizStatus.score}%)` : ''}</span>
                        </div>
                      ) : (
                        <div className="lecture-item__quiz lecture-item__quiz--not-completed">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                            <path d="M15 9L9 15M9 9L15 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <span>Тест не решен</span>
                        </div>
                      )
                    ) : (
                      <div className="lecture-item__quiz lecture-item__quiz--not-available">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="2"/>
                          <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M12 17H12.01" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Тест доступен</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LectureList; 