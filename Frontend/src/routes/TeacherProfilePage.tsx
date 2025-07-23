import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import TeacherProfile from '../components/TeacherProfile';
import {ITeacherCardProps} from '../components/TeacherCard/TeacherCard.typings';
import '../components/Spinner/Spinner.css';
import { teachersApi } from '../api/teachersApi';

// Mock data moved to backend
// const mockTeachers: Record<string, ITeacherCardProps> = { ... };

const TeacherProfilePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [teacher, setTeacher] = useState<ITeacherCardProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTeacher = async () => {
            console.log("Teacher ID from URL:", id);
            if (!id) {
                setError('Teacher ID is required');
                setLoading(false);
                return;
            }

            try {
                const teacherData = await teachersApi.getTeacher(id);
                console.log("🔍 Teacher data received:", teacherData);
                console.log("🔧 Skills:", teacherData.skills);
                console.log("📚 Courses:", teacherData.courses);
                console.log("🎓 Education:", teacherData.education);
                setTeacher(teacherData);
            } catch (err) {
                setError('Failed to load teacher data');
                console.error('Error loading teacher:', err);
            } finally {
                setLoading(false);
            }
        };

        loadTeacher();
    }, [id]);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error || !teacher) {
        return <div className="error">{error}</div>;
    }

    return <TeacherProfile teacher={teacher}/>;
};

export default TeacherProfilePage; 