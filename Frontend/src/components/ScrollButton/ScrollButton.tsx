import React, { useState, useEffect } from 'react';
import './ScrollButton.css';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Наверх"
        >
            ↑
        </button>
    );
};

export default ScrollToTopButton;