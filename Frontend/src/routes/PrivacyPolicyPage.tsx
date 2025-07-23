import React from 'react';
import Header from '../components/Header';
import '../styles/PrivacyPolicyPage.css';
// import Button from "../components/Button";

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="privacy-page">
            <Header />
            <div className="profile-footer">
                {/* <Button variant="secondary" onClick={goToSite} icon_left={<span className="back-icon">←</span>}>
                    Назад на главную страницу
                </Button> */}
            </div>
            <div className="privacy-container">
                <h1 className="privacy-title">Политика конфиденциальности</h1>
                <div className="privacy-content">
                    <p className="privacy-updated">Последнее обновление: 15 мая 2024 года</p>

                    <section className="privacy-section">
                        <h2>1. Общие положения</h2>
                        <p>ReactSchool ("Мы", "Нас", "Наш") обязуется защищать вашу конфиденциальность.
                            Настоящая Политика конфиденциальности объясняет, как мы собираем, используем,
                            раскрываем и защищаем вашу информацию при использовании нашего веб-сайта.</p>
                    </section>

                    <section className="privacy-section">
                        <h2>2. Собираемая информация</h2>
                        <p>Мы можем собирать следующую информацию:</p>
                        <ul>
                            <li>Личные данные (имя, email, телефон) при регистрации</li>
                            <li>Данные об использовании сайта (cookie, IP-адреса)</li>
                            <li>Информацию о платежах для обработки подписок</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>3. Использование информации</h2>
                        <p>Собранная информация используется для:</p>
                        <ul>
                            <li>Предоставления и улучшения наших услуг</li>
                            <li>Обработки платежей и подписок</li>
                            <li>Коммуникации с пользователями</li>
                            <li>Анализа использования сайта</li>
                        </ul>
                    </section>

                    <section className="privacy-section">
                        <h2>4. Защита данных</h2>
                        <p>Мы используем современные методы шифрования и защиты данных.
                            Однако ни один метод передачи через интернет или электронного хранения
                            не является на 100% безопасным.</p>
                    </section>

                    <section className="privacy-section">
                        <h2>5. Изменения в политике</h2>
                        <p>Мы можем обновлять нашу Политику конфиденциальности время от времени.
                            Мы уведомим вас о любых изменениях, опубликовав новую политику на этой странице.</p>
                    </section>

                    <section className="privacy-section">
                        <h2>6. Контакты</h2>
                        <p>Если у вас есть вопросы о нашей Политике конфиденциальности,
                            пожалуйста, свяжитесь с нами по email: privacy@reactschool.ru</p>
                    </section>
                </div>
            </div>

        </div>
    );
};

export default PrivacyPolicyPage;