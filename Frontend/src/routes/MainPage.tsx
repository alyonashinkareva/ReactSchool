import React from 'react';
import { ICourseCardProps } from '../components/CourseCard';
import CourseCard from '../components/CourseCard';
import Header from '../components/Header';
import '../styles/MainPage.css';

const MainPage: React.FC = () => {
    const mainHeadBAckground = "https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpeoples.6e59819d.png&w=3840&q=75";
    const reactCard = "https://result.school/_next/static/media/react.c63d4cff.svg";
    const jsCard = "https://result.school/_next/static/media/js.11444222.svg";
    const reduxCard = "https://result.school/_next/static/media/redux.142e7acc.svg";
    const gitCard = "https://result.school/_next/static/media/git.7258a954.svg";
    const peopleImage1 = "https://result.school/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpeoples-1.bab98d4b.png&w=3840&q=75";

    const featuredCourses: ICourseCardProps[] = [
        {
            id: 'python-developer',
            title: 'Python-разработчик',
            description: 'Профессия',
            cover: 'https://cdn.skillbox.pro/landgen/blocks/start-screen/156946/thumbnail_sm/d42b4089-b306-4b88-ab2a-3f52057e6fbe-2x.webp', // Python иконка
            url: '/courses/python-developer',
            isAvailable: true,
            duration: 10,
            isPopular: true,
            backgroundColor: '#e6f2ea'
        },
        {
            id: 'qa-engineer',
            title: 'Инженер по тестированию',
            description: 'Профессия',
            cover: 'https://cdn.skillbox.pro/landgen/blocks/start-screen/455266/thumbnail_sm/8c8944fd-6e96-4c3c-954e-156b2a756351-2x.webp', // QA иконка
            url: '/courses/qa-engineer',
            isAvailable: true,
            duration: 10,
            backgroundColor: '#e6f5fa'
        },
        {
            id: 'data-scientist',
            title: 'Data scientist',
            description: 'Профессия',
            cover: 'https://cdn.skillbox.pro/landgen/blocks/start-screen/155293/thumbnail_sm/09b8ee91-824f-42f0-83fa-7d6845cc2f41-2x.webp', // Data Science иконка
            url: '/courses/data-scientist',
            isAvailable: true,
            duration: 12,
            backgroundColor: '#f7e2f2'
        },
        // {
        //   id: 'frontend-developer',
        //   title: 'Фронтенд-разработчик',
        //   description: 'Профессия',
        //   image: 'https://cdn.skillbox.pro/landgen/blocks/start-screen/225567/thumbnail_sm/1b07db09-8fc4-4dc8-b907-dd2b001ce656-2x.webp', // Frontend иконка
        //   url: '/courses/frontend-developer',
        //   isAvailable: true,
        //   duration: 9,
        //   backgroundColor: '#f3eef8'
        // }
    ];

    return (
        <div className="main-page">
            <Header />

            <section className="hero-section" >
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Получите профессию frontend-разработчика и постройте карьеру в IT</h1>
                        <p className="hero-subtitle">Устройтесь на работу или вернем деньги, после прохождения полной программы.</p>
                        <div className="hero-tech-stack">
                            <img src={reactCard} alt="React" className="tech-icon" />
                            <img src={jsCard} alt="JavaScript" className="tech-icon" />
                            <img src={reduxCard} alt="Redux" className="tech-icon" />
                            <img src={gitCard} alt="Git" className="tech-icon" />
                        </div>
                        <div className="hero-image">
                            <img src={mainHeadBAckground} alt="React"  />
                        </div>
                        <div className="hero-actions">
                            <a href="/courses" className="primary-button">Выбрать обучение</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Почему мы?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <img src={"https://result.school/img/icons/products/icon-base-programming.svg"} alt="Структурированные курсы" />
                            </div>
                            <h3>Структурированные курсы</h3>
                            <p>Пошаговое обучение от основ до продвинутых тем</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <img src={"https://result.school/img/icons/products/icon-advanced-js.svg"} alt="Практика" />
                            </div>
                            <h3>Практика</h3>
                            <p>Реальные проекты и код-ревью от экспертов</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <img src={"	https://result.school/img/icons/products/icon-git.svg"} alt="Сообщество" />
                            </div>
                            <h3>Сообщество</h3>
                            <p>Общение с единомышленниками и менторами</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="statistics-section">
                <div className="container">
                    <div className="statistics-header">
                        <h2 className="statistics-title">76% наших выпускников устраиваются на работу в первые 3 месяца</h2>
                        <p className="statistics-subtitle">
                            Остальные студенты устраиваются в течение 6 месяцев после выпуска на этапе «Джуниор», а на «Мидле» — во время обучения.
                        </p>
                        <a href="/reviews" className="statistics-link">
                            Смотреть истории наших учеников →
                        </a>
                    </div>
                    
                    <div className="student-images">
                        <div className="student-image-container">
                            <img src={peopleImage1} alt="Выпускники ReactSchool" className="students-img" />
                        </div>
                    </div>

                    <div className="stats-boxes">
                        <div className="stat-box">
                            <h3 className="stat-value">9.6</h3>
                            <p className="stat-label">Средняя оценка обучения</p>
                        </div>
                        <div className="stat-box">
                            <h3 className="stat-value">2000+</h3>
                            <p className="stat-label">Студентов получили диплом</p>
                        </div>
                        <div className="stat-box">
                            <h3 className="stat-value">140Т</h3>
                            <p className="stat-label">Средняя зарплата выпускника</p>
                        </div>
                    </div>

                    <div className="reviews-actions">
                            <a href="/reviews" className="secondary-button">Смотреть все отзывы</a>
                        </div>
                </div>
            </section>


            <section className="courses-section">
                <div className="container">
                    <h2 className="section-title">Популярные курсы</h2>
                    <p className="section-subtitle">Выберите курс для старта вашего обучения</p>

                    <div className="courses-grid">
                        {featuredCourses.filter(course => course.isPopular).length > 0 ? (
                            featuredCourses
                                .filter(course => course.isPopular)
                                .map(course => (
                                    <CourseCard
                                        key={course.id}
                                        id={course.id}
                                        title={course.title}
                                        description={course.description}
                                        cover={course.cover}
                                        progress={course.progress}
                                        url={course.url}
                                        isAvailable={course.isAvailable}
                                        duration={course.duration}
                                        isPopular={course.isPopular}
                                        backgroundColor={course.backgroundColor}
                                    />
                                ))
                        ) : (
                            <p className="no-courses-message">На данный момент нет популярных курсов</p>
                        )}
                    </div>

                    <div className="section-actions">
                        <a href="/courses" className="primary-button">Все курсы</a>
                    </div>
                </div>
            </section>

            <footer className="footer-section">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3 className="footer-logo">ReactSchool</h3>
                            <p className="footer-slogan">Лучшая школа React-разработки</p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4 className="footer-title">Курсы</h4>
                                <ul>
                                    <li><a href="/courses">Все курсы</a></li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h4 className="footer-title">О нас</h4>
                                <ul>
                                    <li><a href="/teachers">Преподаватели</a></li>
                                    <li><a href="/reviews">Отзывы</a></li>
                                </ul>
                            </div>

                            <div className="footer-column">
                                <h4 className="footer-title">Контакты</h4>
                                <ul>
                                    <li><a href="mailto:info@reactschool.ru">info@reactschool.ru</a></li>
                                    <li><a href="tel:+79991234567">+7 (999) 123-45-67</a></li>
                                    <li className="footer-social">
                                        <a href="https://t.me/reactschool" aria-label="Telegram">
                                            <i className="social-icon">TG</i>
                                        </a>
                                        <a href="https://vk.com/reactschool" aria-label="VK">
                                            <i className="social-icon">VK</i>
                                        </a>
                                        <a href="https://youtube.com/reactschool" aria-label="YouTube">
                                            <i className="social-icon">YT</i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© {new Date().getFullYear()} ReactSchool. Все права защищены.</p>
                        <div className="footer-legal">
                            <a href="/privacy">Политика конфиденциальности</a>
                            <a href="/terms">Условия использования</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainPage;