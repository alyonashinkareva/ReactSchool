import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeacherProfile-CourseSection.css';
import { teachersApi } from '../../../api/teachersApi';
import { TeacherCourseWithLectures } from '../../../types/courses';

interface TeacherLecturesProps {
    teacherId: string;
}

const TeacherLectures: React.FC<TeacherLecturesProps> = ({ teacherId }) => {
    const [coursesWithLectures, setCoursesWithLectures] = useState<TeacherCourseWithLectures[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const data = await teachersApi.getTeacherLectures(teacherId);
                setCoursesWithLectures(data);
            } catch (error) {
                console.error('Ошибка загрузки лекций преподавателя:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLectures();
    }, [teacherId]);

    if (loading) {
        return <p>Загрузка...</p>;
    }

    if (coursesWithLectures.length === 0) {
        return <p>Нет активных лекций</p>;
    }

    return (
        <div className="courses-with-lectures">
            {coursesWithLectures.map((course) => (
                <div key={course.course_id} className="course-block">
                    <h3 className="course-title">
                        <Link to={`/courses/${course.course_id}`}>
                            {course.course_title}
                        </Link>
                    </h3>
                    <p className="course-description">{course.course_description}</p>
                    <div className="lectures-list">
                        {course.lectures.map((lecture) => (
                            <Link 
                                key={lecture.id}
                                to={`/courses/${course.course_id}/lectures/${lecture.id}`}
                                className="lecture-item"
                            >
                                <span className="lecture-number">Лекция {lecture.number}</span>
                                <span className="lecture-title">{lecture.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

interface CoursesSectionProps {
    title: string;
    teacherId: string;
}

export const TeacherProfileCourseSection: React.FC<CoursesSectionProps> = ({ 
    title, 
    teacherId 
}) => {
    return (
        <div>
            <h2>{title}</h2>
            <TeacherLectures teacherId={teacherId} />
        </div>
    );
};

export default TeacherProfileCourseSection; 