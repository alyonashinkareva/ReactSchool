import React, { useState, useEffect } from 'react';
import { ITeacherCardProps} from '../components/TeacherCard/TeacherCard.typings';
import TeacherCard from '../components/TeacherCard';
import Header from '../components/Header';
import '../styles/TeachersListPage.css';
import { teachersApi } from '../api/teachersApi';
import Button from "../components/Button";

const TeachersListPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSkill, setFilterSkill] = useState<string>('all');
    const [filterRole, setFilterRole] = useState<string>('all');
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

    // Получаем все уникальные навыки
    const allSkills = Array.from(
        new Set(teachers.flatMap(teacher => teacher.skills ? teacher.skills.map(skill => skill.name) : []))
    ).sort();

    // Получаем все уникальные роли
    const allRoles = Array.from(
        new Set(teachers.map(teacher => teacher.role))
    ).sort();

    // Фильтруем преподавателей по запросу и фильтрам
    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch =
            teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSkill = filterSkill === 'all' || (teacher.skills && teacher.skills.some(skill => skill.name === filterSkill));
        const matchesRole = filterRole === 'all' || teacher.role === filterRole;

        return matchesSearch && matchesSkill && matchesRole;
    });

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

    return (
        <div className="teachers-page">
            <Header />
            <div className="teachers-page__banner-wrapper">
                <div className="teachers-page__banner-content">
                    <h1 className="teachers-page__banner-title">Наши преподаватели</h1>
                    <p className="teachers-page__banner-subtitle">
                        Познакомьтесь с нашими опытными преподавателями, которые помогут вам освоить современные технологии разработки
                    </p>
                </div>
                <img
                    src="https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fusers-3.e56d7b61.png&w=1920&q=75"
                    alt="Наши преподаватели"
                    className="teachers-page__banner"
                    height={280}
                />
            </div>

            <div className="teachers-page__content">
                <div className="teachers-page__controls">
                    <div className="teachers-page__search-filters">
                        <div className="teachers-page__search">
                            <div className="teachers-page__search-wrapper">
                                <span className="teachers-page__search-icon">🔍</span>
                                <input
                                    type="text"
                                    className="teachers-page__search-input"
                                    placeholder="Поиск по имени, роли или описанию..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        className="teachers-page__clear-search"
                                        onClick={() => setSearchQuery('')}
                                        title="Очистить поиск"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="teachers-page__filter-group">
                            <label className="teachers-page__filter-label">Роль</label>
                            <select
                                className="teachers-page__filter-select"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="all">Все роли</option>
                                {allRoles.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>

                        <div className="teachers-page__filter-group">
                            <label className="teachers-page__filter-label">Навыки</label>
                            <select
                                className="teachers-page__filter-select"
                                value={filterSkill}
                                onChange={(e) => setFilterSkill(e.target.value)}
                            >
                                <option value="all">Все навыки</option>
                                {allSkills.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>

                        <div className="teachers-page__filter-reset">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilterSkill('all');
                                    setFilterRole('all');
                                }}
                            >
                                Очистить всё
                            </Button>
                        </div>
                    </div>
                </div>

                {filteredTeachers.length === 0 ? (
                    <div className="teachers-page__empty">
                        <h3>Преподаватели не найдены</h3>
                        <p>Попробуйте изменить запрос или очистить фильтры</p>
                        <div style={{ display: 'inline-block' }}>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setSearchQuery('');
                                    setFilterSkill('all');
                                    setFilterRole('all');
                                }}
                            >
                                Очистить всё
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="teachers-page__grid">
                        {filteredTeachers.map(teacher => (
                            <TeacherCard
                                key={teacher.id}
                                {...teacher}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeachersListPage;