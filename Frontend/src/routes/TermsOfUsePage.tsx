import React from 'react';
import Header from '../components/Header';
import '../styles/TermsOfUsePage.css';
import Button from "../components/Button";

const TermsOfUsePage: React.FC = () => {

    const goToSite = () => {
        window.location.href = `/`;
    };
    return (
        <div className="terms-page">
            <Header />
            <div className="profile-footer">
                <Button variant="secondary" onClick={goToSite} icon_left={<span className="back-icon">←</span>}>
                    Назад на главную страницу
                </Button>
            </div>

            <div className="terms-container">
                <h1 className="terms-title">Условия использования</h1>
                <div className="terms-content">
                    <p className="terms-updated">Последнее обновление: 15 мая 2024 года</p>

                    <section className="terms-section">
                        <h2>1. Общие положения</h2>
                        <p>Добро пожаловать на ReactSchool! Пожалуйста, внимательно ознакомьтесь
                            с настоящими Условиями использования перед использованием нашего сайта.</p>
                    </section>

                    <section className="terms-section">
                        <h2>2. Использование сайта</h2>
                        <p>Вы соглашаетесь использовать сайт только в законных целях и не нарушать
                            права других пользователей. Запрещается:</p>
                        <ul>
                            <li>Использовать сайт для незаконной деятельности</li>
                            <li>Нарушать интеллектуальные права</li>
                            <li>Распространять вредоносное ПО</li>
                            <li>Пытаться получить несанкционированный доступ</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>3. Интеллектуальная собственность</h2>
                        <p>Все материалы на сайте (курсы, видео, тексты) являются собственностью
                            ReactSchool и защищены авторским правом.</p>
                    </section>

                    <section className="terms-section">
                        <h2>4. Платные услуги</h2>
                        <p>Некоторые курсы требуют оплаты. Оплачивая курс, вы получаете доступ
                            к материалам на указанный срок. Возврат средств возможен в течение
                            14 дней с момента покупки.</p>
                    </section>

                    <section className="terms-section">
                        <h2>5. Ограничение ответственности</h2>
                        <p>ReactSchool не гарантирует, что:</p>
                        <ul>
                            <li>Сайт будет работать бесперебойно</li>
                            <li>Результаты обучения будут соответствовать ожиданиям</li>
                            <li>Материалы будут свободны от ошибок</li>
                        </ul>
                    </section>

                    <section className="terms-section">
                        <h2>6. Изменения условий</h2>
                        <p>Мы оставляем за собой право изменять эти Условия в любое время.
                            Продолжение использования сайта после изменений означает ваше согласие
                            с новыми условиями.</p>
                    </section>

                    <section className="terms-section">
                        <h2>7. Контакты</h2>
                        <p>По вопросам, связанным с Условиями использования,
                            обращайтесь: legal@reactschool.ru</p>
                    </section>
                </div>
            </div>

        </div>
    );
};

export default TermsOfUsePage;