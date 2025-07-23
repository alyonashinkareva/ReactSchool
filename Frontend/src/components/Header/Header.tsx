import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import ReactSchool from '../ReactSchool';
import {HeaderProps} from './Header.typings';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../AuthModal';
import './UserMenu.css';

export const Header: React.FC<HeaderProps> = () => {
    const location = useLocation();
    const isCoursesActive = location.pathname.startsWith('/courses');
    const isTeachersActive = location.pathname.startsWith('/teachers');
    const isReviewsActive = location.pathname.startsWith('/reviews');
    const { user, isAuthenticated, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleUserMenuToggle = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
    };

    const handleLogin = () => {
        setIsAuthModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        setIsAuthModalOpen(false);
    };



    return (
        <header className="header">
            <div className="header-container">
                <div className="header-branding">
                    <Link to="/">
                        <ReactSchool/>
                    </Link>
                </div>

                <div className="header-navigation">
                    <nav className="main-nav">
                        <Link to="/courses" className={`nav-link ${isCoursesActive ? 'active' : ''}`}>Курсы</Link>
                        <Link to="/teachers" className={`nav-link ${isTeachersActive ? 'active' : ''}`}>Преподаватели</Link>
                        <Link to="/reviews" className={`nav-link ${isReviewsActive ? 'active' : ''}`}>Отзывы</Link>
                    </nav>
                    
                    <div className="user-section">
                        {isAuthenticated ? (
                            <div className="user-menu-container">
                                <button 
                                    className="user-menu-button" 
                                    onClick={handleUserMenuToggle}
                                >
                                    <img 
                                        src={user?.avatar || 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'} 
                                        alt={user?.username} 
                                        className="user-avatar" 
                                    />
                                    <span className="user-name">{user?.username}</span>
                                </button>
                                
                                {isUserMenuOpen && (
                                    <div className="user-dropdown-menu">
                                        <div className="user-info">
                                            <img 
                                                src={user?.avatar || 'https://avatars.mds.yandex.net/get-yapic/31804/0r-9/islands-middle'} 
                                                alt={user?.username} 
                                                className="user-dropdown-avatar" 
                                            />
                                            <div>
                                                <div className="user-dropdown-name">{user?.username}</div>
                                                {user?.email && <div className="user-dropdown-email">{user.email}</div>}
                                            </div>
                                        </div>
                                        <hr />
                                        <Link 
                                            to="/favorites" 
                                            className="user-menu-link"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            Понравившиеся
                                        </Link>
                                        <button 
                                            className="user-logout-button" 
                                            onClick={handleLogout}
                                        >
                                            Выйти
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button 
                                className="login-button" 
                                onClick={handleLogin}
                            >
                                Войти
                            </button>
                        )}
                    </div>
                </div>
            </div>
            
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={handleCloseAuthModal} 
            />
        </header>
    );
};