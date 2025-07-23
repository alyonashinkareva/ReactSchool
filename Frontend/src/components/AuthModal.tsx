import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/AuthModal.css';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // true = вход, false = регистрация
    const [error, setError] = useState('');

    const { login, register } = useAuth();

    if (!isOpen) return null;

    const resetForm = () => {
        setUsername('');
        setPassword('');
        setError('');
        setIsLoading(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) return;
        
        // Дополнительная валидация
        if (username.length < 4) {
            setError('Имя пользователя должно быть не менее 4 символов');
            return;
        }
        
        if (password.length < 4) {
            setError('Пароль должен быть не менее 4 символов');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            if (isLogin) {
                console.log('Attempting login with:', { username, password: '***' });
                await login(username, password);
                console.log('Login successful');
            } else {
                console.log('Attempting registration with:', { username, password: '***' });
                // При регистрации проверяем, что пользователь не существует
                try {
                    const user = await register(username, password);
                    console.log('Registration successful:', user);
                } catch (err: any) {
                    console.error('Registration error:', err);
                    // Проверяем, не существует ли уже такой пользователь
                    if (err.message && (err.message.includes('существует') || err.message.includes('already'))) {
                        setError('Пользователь с таким именем уже существует. Попробуйте другое имя.');
                    } else {
                        setError(err.message || 'Ошибка регистрации');
                    }
                    throw err;
                }
            }
            resetForm();
            onClose();
        } catch (err) {
            console.error('Auth error:', err);
            if (!error) { // Если ошибка еще не установлена выше
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError('');
        // Очищаем поля при переключении для лучшего UX
        setUsername('');
        setPassword('');
    };

    const handleClose = () => {
        resetForm();
        setIsLogin(true); // Сбрасываем к режиму входа
        onClose();
    };

    return createPortal(
        <div className="auth-modal-overlay" onClick={handleClose}>
            <div className="auth-modal" onClick={e => e.stopPropagation()}>
                {/* Заголовок */}
                <div className="auth-modal-header">
                    <h2>{isLogin ? 'Войдите в аккаунт' : 'Создайте аккаунт'}</h2>
                    <p className="auth-modal-subtitle">
                        {isLogin 
                            ? 'Войдите, чтобы оценивать лекции и оставлять комментарии' 
                            : 'Получите доступ ко всем функциям платформы'
                        }
                    </p>
                </div>

                {/* Форма с username и паролем */}
                <form className="auth-form" onSubmit={handleFormSubmit}>
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <div className="auth-field">
                        <label htmlFor="username" className="auth-label">
                            Имя пользователя <span className="auth-required">*</span>
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Введите имя пользователя (минимум 4 символа)"
                            className="auth-input"
                            required
                            minLength={4}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password" className="auth-label">
                            Пароль <span className="auth-required">*</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={isLogin ? "Введите пароль" : "Придумайте пароль (минимум 4 символа)"}
                            className="auth-input"
                            required
                            minLength={4}
                        />
                    </div>

                    <div className="auth-footer">
                        <button 
                            type="submit" 
                            className="auth-submit-btn"
                            disabled={isLoading || !username || !password}
                        >
                            {isLoading 
                                ? (isLogin ? 'Выполняется вход...' : 'Создаётся аккаунт...') 
                                : (isLogin ? 'Войти' : 'Создать аккаунт')
                            }
                        </button>
                        
                        <span className="auth-register-link">
                            {isLogin 
                                ? <>Нет аккаунта? <button type="button" className="auth-link" onClick={switchMode}>Зарегистрироваться</button></>
                                : <>Уже есть аккаунт? <button type="button" className="auth-link" onClick={switchMode}>Войти</button></>
                            }
                        </span>
                    </div>
                </form>

                <button className="auth-modal-close" onClick={handleClose}>×</button>
            </div>
        </div>,
        document.body
    );
};

export default AuthModal; 