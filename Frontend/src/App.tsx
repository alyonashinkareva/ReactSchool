import './App.css'
import {ITeacherCardProps} from './components/TeacherCard/TeacherCard.typings';
import Header from './components/Header';
import CourseTitle from './components/CourseTitle';
import LessonNavigation from './components/LessonNavigation';
import LessonContent from './components/LessonContent';
import Presentation from './components/Presentation';
import TeachersList from './components/TeachersList';
import { useState, useEffect } from 'react';
import { teachersApi } from './api/teachersApi';

function App() {
    const [teachers, setTeachers] = useState<ITeacherCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeachers = async () => {
            try {
                const teachersData = await teachersApi.getAllTeachers();
                setTeachers(teachersData);
            } catch (err) {
                setError('Failed to load teachers');
                console.error('Error loading teachers:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTeachers();
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    // Данные о слайдах презентации
    const presentationSlides = [
        'https://i.ibb.co/S4VVxzVx/React-pptx.png',
        'https://i.ibb.co/PsjHbd7h/React-pptx-1.png',
        'https://i.ibb.co/jvGthHX6/React-pptx-2.png',
        'https://i.ibb.co/JhC72Mr/React-pptx-3.png',
        'https://i.ibb.co/jPxNW3Lk/React-pptx-4.png'
    ];

    // Данные о навигации по урокам
    const navigation = {
        prevLesson: {
            title: 'Предыдущий урок',
            url: '#'
        },
        nextLesson: {
            title: 'Следующий урок',
            url: '#'
        }
    };

    return (
        <div className="App">
            <Header lection="Современные JavaScript фреймворки"/>

            <LessonContent>
                <CourseTitle title="Современные JavaScript фреймворки"/>

                <LessonNavigation
                    prevLesson={navigation.prevLesson}
                    nextLesson={navigation.nextLesson}
                />
                <Presentation
                    slides={presentationSlides}
                />

                <TeachersList
                    title="Авторы лекции"
                    teachers={teachers}
                />
            </LessonContent>
        </div>
    )
}

export default App
