import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import CourseTitle from '../components/CourseTitle';
import LessonNavigation from '../components/LessonNavigation';
import LessonContent from '../components/LessonContent';
import Presentation from '../components/Presentation';
import '../styles/LecturePage.css';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import LikeDislike from '../components/LikeDislike';
import { ratingService } from '../services/commentService';
import progressService from '../services/progressService';
import FeedbackModal from '../components/FeedbackModal/FeedbackModal';
import { CoursesApi } from '../api/coursesApi';
import { Lecture, Course } from '../types/courses';
import { coursesService } from '../services/coursesService';
import CoursePlayer from '../components/CoursePlayer';
import LectureComments from '../components/LectureComments/LectureComments';

interface QuizResult {
    lectureId: number;
    courseId: number;
    userId: number;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    answers: (number | null)[];
    completed: boolean;
    attemptDate: string;
    timeSpent: number;
}

// interface Rating {
//     value: number;
//     count: number;
// }

interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    hint: string;
}

const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        question: "Что такое переменные в Python и для чего они используются?",
        options: [
            "Переменные в Python — это контейнеры для хранения данных, тип которых определяется автоматически.",
            "Переменные в Python — это постоянные значения, которые нельзя изменить после их объявления. Они используются для хранения данных, но их тип фиксирован и не может быть изменён.",
            "Переменные в Python используются для создания пользовательских интерфейсов и работы с графическими элементами в программах.",
            "Переменные в Python — это предопределённые типы данных, которые нельзя изменять после инициализации."
        ],
        correctAnswer: 0,
        hint: "💡 Подсказка: В Python переменные гибкие и могут изменять свой тип динамически. Они служат для хранения данных."
    },
    {
        id: 2,
        question: "Какой из следующих типов данных НЕ является встроенным в Python?",
        options: [
            "int (целые числа)",
            "str (строки)",
            "decimal (десятичные числа высокой точности)",
            "list (списки)"
        ],
        correctAnswer: 2,
        hint: "💡 Подсказка: Большинство основных типов встроены в Python, но некоторые нужно импортировать из модулей."
    },
    {
        id: 3,
        question: "Что выведет следующий код: print(type(5.0))?",
        options: [
            "<class 'int'>",
            "<class 'float'>",
            "<class 'str'>",
            "<class 'number'>"
        ],
        correctAnswer: 1,
        hint: "💡 Подсказка: Число 5.0 имеет десятичную точку, что определяет его тип данных."
    },
    {
        id: 4,
        question: "Какая из следующих операций приведёт к ошибке в Python?",
        options: [
            "x = 10; y = '20'; result = x + int(y)",
            "x = 10; y = '20'; result = str(x) + y",
            "x = 10; y = '20'; result = x + y",
            "x = 10; y = 20; result = x + y"
        ],
        correctAnswer: 2,
        hint: "💡 Подсказка: Python не может автоматически складывать числа и строки без явного преобразования типов."
    },
    {
        id: 5,
        question: "Что означает 'динамическая типизация' в Python?",
        options: [
            "Типы данных определяются во время выполнения программы",
            "Все переменные должны быть объявлены с указанием типа",
            "Python не поддерживает разные типы данных",
            "Типы данных можно изменить только в специальных функциях"
        ],
        correctAnswer: 0,
        hint: "💡 Подсказка: В отличие от статической типизации, тип переменной определяется не при объявлении, а во время работы программы."
    }
];

const LecturePage: React.FC = () => {
    const {courseId, lectureId} = useParams<{ courseId: string; lectureId: string }>();
    const { user, isAuthenticated } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [likes, setLikes] = useState(0);
    const [userRating, setUserRating] = useState<boolean | null>(null);

    const [course, setCourse] = useState<Course | null>(null);
    const [lecture, setLecture] = useState<Lecture | null>(null);
    const [nextLecture, setNextLecture] = useState<Lecture | null>(null);
    const [prevLecture, setPrevLecture] = useState<Lecture | null>(null);
    const [loading, setLoading] = useState(true);

    // Добавляем состояния для квиза
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
    const [showResults, setShowResults] = useState(false);
    const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
    const [quizVisible, setQuizVisible] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
    const [savedQuizResult, setSavedQuizResult] = useState<QuizResult | null>(null);
    const coursesApi = new CoursesApi();
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            await coursesApi.getCourses();
        };
        loadCourses();
    }, []);

    useEffect(() => {
        const loadData = async () => {
            if (!courseId || !lectureId) return;
            
            const numericCourseId = parseInt(courseId, 10);
            const numericLectureId = parseInt(lectureId, 10);
            
            if (isNaN(numericCourseId) || isNaN(numericLectureId)) {
                navigate('/courses');
                return;
    }

            try {
                const [courseData, lectureData] = await Promise.all([
                    coursesService.getCourse(numericCourseId),
                    coursesService.getLecture(numericCourseId, numericLectureId)
                ]);

                if (!courseData || !lectureData) {
                    navigate('/courses');
                    return;
                }

                setCourse(courseData);
                setLecture(lectureData);

                // Отладочная информация
                console.log('Loaded lecture data:', lectureData);
                console.log('Lecture presentationSlides:', lectureData.presentationSlides);

                const [next, prev] = await Promise.all([
                    coursesService.getNextLecture(numericCourseId, numericLectureId),
                    coursesService.getPreviousLecture(numericCourseId, numericLectureId)
                ]);

                setNextLecture(next);
                setPrevLecture(prev);
            } catch (error) {
                console.error('Error loading lecture data:', error);
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [courseId, lectureId, navigate]);

    useEffect(() => {
        if (courseId && lectureId) {
            // Загрузка статистики лайков/дизлайков
            const stats = ratingService.getRatingStats(courseId, lectureId);
            setLikes(stats.likes);

            // Загрузка оценки пользователя, если он авторизован
            if (isAuthenticated && user) {
                const userRating = ratingService.getUserRating(courseId, lectureId, user.id);
                setUserRating(userRating ? userRating.like : null);
            } else {
                // Сброс оценки пользователя при выходе из аккаунта
                setUserRating(null);
            }
        }
    }, [courseId, lectureId, isAuthenticated, user]);

    useEffect(() => {
        if (isAuthenticated && user && courseId && lectureId && course?.lectures) {
            // Помечаем лекцию как посещенную при заходе
            progressService.updateProgressWithTotal(
                parseInt(courseId, 10), 
                lectureId, 
                user.id, 
                course.lectures.length
            );
            
            progressService.updateLectureProgress(
                lectureId,
                user.id,
                0, // watchedDuration
                course.lectures.length // totalDuration
            );
        }
    }, [isAuthenticated, user, courseId, lectureId, course?.lectures]);

    const navigationProps = {
        prevLesson: prevLecture
            ? {
                title: prevLecture.title,
                url: `/courses/${courseId}/lectures/${prevLecture.id}`
            }
            : undefined,
        nextLesson: nextLecture
            ? {
                title: nextLecture.title,
                url: `/courses/${courseId}/lectures/${nextLecture.id}`
            }
            : undefined
    };

    const openAuthModal = () => {
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };



    const handleLike = () => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        if (courseId && lectureId && user) {
            // Если уже стоит лайк - снимаем его
            if (userRating === true) {
                ratingService.removeRating(courseId, lectureId, user.id);
                setLikes(prev => prev - 1);
                setUserRating(null);
            } 
            // Если нет оценки (включая бывший дизлайк) - ставим лайк
            else {
                ratingService.setRating(courseId, lectureId, user.id, true);
                setLikes(prev => prev + 1);
                if (userRating === false) { // Если был дизлайк, убираем его (хотя дизлайки больше не отображаются)
                    // Логика для уменьшения дизлайков здесь не нужна, так как мы их не считаем и не показываем
                }
                setUserRating(true);
            }
            
            // Уведомляем об изменении избранного (для обновления других компонентов)
            window.dispatchEvent(new CustomEvent('favoritesChanged', { 
                detail: { userId: user.id } 
            }));
        }
    };

    const handleDislike = () => {
        if (!isAuthenticated) {
            openAuthModal();
            return;
        }
        if (courseId && lectureId && user) {
            // Если уже стоит дизлайк - снимаем его
            if (userRating === false) {
                ratingService.removeRating(courseId, lectureId, user.id);
                setUserRating(null);
            } 
            // Если нет оценки или стоял лайк - ставим дизлайк
            else {
                ratingService.setRating(courseId, lectureId, user.id, false);
                if (userRating === true) { // Если был лайк, убираем его
                    setLikes(prev => prev - 1);
                }
                setUserRating(false);
            }
            
            // Уведомляем об изменении избранного (для обновления других компонентов)
            window.dispatchEvent(new CustomEvent('favoritesChanged', { 
                detail: { userId: user.id } 
            }));
        }
    };

    const closeFeedbackModal = () => {
        setIsFeedbackModalOpen(false);
    };

    // Функция для отправки обратной связи (пока не реализуем)
    const handleFeedbackSubmit = (feedback: string) => {
        console.log('Feedback submitted:', feedback);
        // Здесь может быть логика отправки обратной связи на сервер
        closeFeedbackModal();
    };

    // Функции для квиза
    const handleStartQuiz = () => {
        setIsQuizStarted(true);
        setQuizVisible(true);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setAnswers(new Array(quizQuestions.length).fill(null));
        setShowResults(false);
        setShowAnswerFeedback(false);
        setQuizStartTime(Date.now());
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (showAnswerFeedback) return;
        setSelectedAnswer(answerIndex);
        
        // Сохраняем ответ сразу при выборе
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(answers[currentQuestionIndex + 1]);
            setShowAnswerFeedback(false);
            setShowHint(false); // Сбрасываем подсказку
        } else {
            // Завершить квиз и сохранить результат
            saveQuizResult();
            setShowResults(true);
            setIsQuizStarted(false);
            setQuizVisible(false);
        }
    };

    const handleAnswerSubmit = () => {
        if (selectedAnswer === null || showAnswerFeedback) return;
        setShowAnswerFeedback(true);
        setShowHint(false); // Сбрасываем подсказку при отправке ответа
        
        // Показываем результат ответа на 1.5 секунды
        setTimeout(() => {
            handleNextQuestion();
        }, 1500);
    };

    const handleRetryQuiz = () => {
        // Полный сброс квиза
        setShowResults(false);
        setIsQuizStarted(false);
        setQuizVisible(false);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setAnswers(new Array(quizQuestions.length).fill(null));
        setShowAnswerFeedback(false);
        setShowHint(false); // Сбрасываем подсказку
        setQuizStartTime(null); // Сбрасываем время начала
        setSavedQuizResult(null); // Сбрасываем сохраненный результат
        
        // Небольшая задержка для плавности, затем запуск
        setTimeout(() => {
            setIsQuizStarted(true);
            setQuizVisible(true);
            setQuizStartTime(Date.now()); // Устанавливаем новое время начала
        }, 100);
    };

    const handleShowHint = () => {
        // Показываем текстовую подсказку
        setShowHint(true);
    };

    const calculateScore = () => {
        // Если есть сохраненный результат, используем его
        if (savedQuizResult) {
            return savedQuizResult.score;
        }
        
        // Иначе вычисляем на основе текущих ответов
        const correctAnswers = answers.filter((answer, index) => 
            answer !== null && answer !== -1 && answer === quizQuestions[index].correctAnswer
        ).length;
        return Math.round((correctAnswers / quizQuestions.length) * 100);
    };

    // Функция для получения количества правильных ответов
    const getCorrectAnswersCount = () => {
        // Если есть сохраненный результат, используем его
        if (savedQuizResult) {
            return savedQuizResult.correctAnswers;
        }
        
        // Иначе вычисляем на основе текущих ответов
        return answers.filter((answer, index) => 
            answer !== null && answer !== -1 && answer === quizQuestions[index].correctAnswer
        ).length;
    };

    // Функция для сохранения результата квиза
    const saveQuizResult = () => {
        if (!isAuthenticated || !user || !courseId || !lectureId || quizStartTime === null) return;
        
        const correctAnswers = answers.filter((answer, index) => 
            answer !== null && answer !== -1 && answer === quizQuestions[index].correctAnswer
        ).length;
        const score = Math.round((correctAnswers / quizQuestions.length) * 100);
        const timeSpent = Math.round((Date.now() - quizStartTime) / 1000); // в секундах

        const quizResult: QuizResult = {
            lectureId: parseInt(lectureId, 10),
            courseId: parseInt(courseId, 10),
            userId: 1, // Using 1 as fallback numeric ID for QuizResult interface
            score,
            correctAnswers,
            totalQuestions: quizQuestions.length,
            answers: [...answers],
            completed: true,
            attemptDate: new Date().toISOString(),
            timeSpent
        };

        if (user) {
            progressService.saveQuizResult(quizResult, user.id);
        }
        setSavedQuizResult(quizResult);
    };

    // Загрузка сохраненного результата квиза при авторизации
    useEffect(() => {
        const loadQuizResult = async () => {
        if (isAuthenticated && user && courseId && lectureId) {
                const savedResult = await progressService.getQuizResult(
                    parseInt(courseId, 10),
                    parseInt(lectureId, 10),
                    user.id
                );
            if (savedResult && savedResult.completed) {
                setSavedQuizResult(savedResult);
                setAnswers(savedResult.answers);
                setShowResults(true);
                setIsQuizStarted(false);
                setQuizVisible(false);
            }
        } else {
            setSavedQuizResult(null);
            setShowResults(false);
            setAnswers(new Array(quizQuestions.length).fill(null));
        }
        };
        loadQuizResult();
    }, [isAuthenticated, user, courseId, lectureId]);

    const renderQuizContent = () => {
        if (!isQuizStarted && !showResults) {
            return (
                <div className="quiz-banner">
                    <div className="quiz-banner__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <div className="quiz-banner__content">
                        <h3 className="quiz-banner__title">Проверьте свои знания</h3>
                        <p className="quiz-banner__subtitle">Пройдите интерактивный тест по материалам лекции</p>
                    </div>
                    <button className="quiz-banner__button" onClick={handleStartQuiz}>
                        Начать тест
                    </button>
                </div>
            );
        }

        if (showResults) {
            const score = calculateScore();
            const correctCount = getCorrectAnswersCount();
            
            return (
                <div className="quiz-results">
                    <div className="quiz-results__header">
                        <div className="quiz-results__icon">
                            {score >= 70 ? (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <polyline points="22,4 12,14.01 9,11.01" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            ) : (
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                                    <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
                                    <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
                                </svg>
                            )}
                        </div>
                        <h3 className="quiz-results__title">
                            {score >= 70 ? 'Отличный результат!' : 'Можно лучше!'}
                        </h3>
                    </div>
                    <div className="quiz-results__stats">
                        <div className="quiz-results__score">{score}%</div>
                        <div className="quiz-results__details">
                            Правильных ответов: {correctCount} из {quizQuestions.length}
                        </div>
                    </div>
                    <div className="quiz-results__message">
                        {score >= 70 
                            ? 'Вы отлично усвоили материал лекции!' 
                            : 'Рекомендуем повторить материал и попробовать ещё раз.'
                        }
                    </div>
                    <button 
                        type="button"
                        className="quiz-results__retry-btn" 
                        onClick={handleRetryQuiz}
                        aria-label="Пройти тест заново"
                    >
                        Пройти снова
                    </button>
                </div>
            );
        }

        const currentQuestion = quizQuestions[currentQuestionIndex];
        const getOptionClass = (optionIndex: number) => {
            if (!showAnswerFeedback) {
                return `quiz-option ${selectedAnswer === optionIndex ? 'selected' : ''}`;
            }
            
            const isCorrect = optionIndex === currentQuestion.correctAnswer;
            const isSelected = selectedAnswer === optionIndex;
            
            if (isCorrect) {
                return 'quiz-option correct';
            } else if (isSelected && !isCorrect) {
                return 'quiz-option incorrect';
            } else {
                return 'quiz-option disabled';
            }
        };

        return (
            <div className={`quiz-content ${quizVisible ? 'quiz-content--visible' : ''}`}>
                <div className="quiz-header">
                    <div className="quiz-progress">
                        <div className="quiz-progress__bar">
                            <div 
                                className="quiz-progress__fill"
                                style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                            />
                        </div>
                        <span className="quiz-progress__text">
                            Вопрос {currentQuestionIndex + 1} из {quizQuestions.length}
                        </span>
                    </div>
                    
                    {!showAnswerFeedback && (
                        <button 
                            className="quiz-hint-btn-corner"
                            onClick={handleShowHint}
                            title="Показать подсказку"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    )}
                </div>
                
                <h3 className="quiz-question">{currentQuestion.question}</h3>
                
                {showHint && !showAnswerFeedback && (
                    <div className="quiz-hint-message">
                        {currentQuestion.hint}
                    </div>
                )}
                
                <div className="quiz-options">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={getOptionClass(index)}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showAnswerFeedback}
                        >
                            <span className="quiz-option__text">{option}</span>
                            {showAnswerFeedback && index === currentQuestion.correctAnswer && (
                                <span className="quiz-option__icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <polyline points="20,6 9,17 4,12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            )}
                            {showAnswerFeedback && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                                <span className="quiz-option__icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2"/>
                                        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
                                    </svg>
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {showAnswerFeedback && (
                    <div className={`quiz-feedback ${selectedAnswer === currentQuestion.correctAnswer ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`}>
                        {selectedAnswer === currentQuestion.correctAnswer ? (
                            <span>🎉 Правильно!</span>
                        ) : (
                            <span>❌ Неправильно. Правильный ответ выделен зелёным.</span>
                        )}
                    </div>
                )}
                
                <div className="quiz-navigation">
                    {!showAnswerFeedback ? (
                        <div className="quiz-main-actions">
                            <button 
                                className="quiz-submit-btn"
                                onClick={handleAnswerSubmit}
                                disabled={selectedAnswer === null}
                            >
                                {currentQuestionIndex === quizQuestions.length - 1 ? 'Завершить тест' : 'Ответить'}
                            </button>
                        </div>
                    ) : (
                        <div className="quiz-feedback-actions">
                            <button 
                                className="quiz-submit-btn quiz-submit-btn--waiting"
                                disabled
                            >
                                {currentQuestionIndex === quizQuestions.length - 1 ? 'Завершаем...' : 'Следующий вопрос...'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const handleLectureComplete = async (lectureId: string) => {
        if (!user || !course) return;
        await progressService.updateProgress(course.id, lectureId, user.id);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!course || !lecture) {
        return <div>Lecture not found</div>;
    }

    return (
        <div className="lecture-page">
            <Header/>
            <LessonContent>
                <CourseTitle title={lecture.title}/>

                <LessonNavigation
                    prevLesson={navigationProps.prevLesson}
                    nextLesson={navigationProps.nextLesson}
                />

                {/* Показываем презентацию, только если есть слайды */}
                {(() => {
                    const hasSlides = lecture.presentationSlides && lecture.presentationSlides.length > 0;
                    const hasVideo = lecture.videoUrl && lecture.videoUrl.trim() !== '';
                    
                    console.log('Проверка контента лекции:', {
                        hasSlides,
                        hasVideo,
                        presentationSlides: lecture.presentationSlides,
                        videoUrl: lecture.videoUrl,
                        slidesLength: lecture.presentationSlides?.length
                    });
                    
                    if (hasSlides) {
                        console.log('Показываем презентацию:', lecture.presentationSlides);
                        return <Presentation slides={lecture.presentationSlides!}/>;
                    } else if (!hasVideo) {
                        // Показываем статическую презентацию только если нет ни слайдов, ни видео
                        console.log('Нет ни слайдов, ни видео - показываем статическую презентацию');
                        return <Presentation slides={[
                            'https://i.ibb.co/S4VVxzVx/React-pptx.png',
                            'https://i.ibb.co/PsjHbd7h/React-pptx-1.png',
                            'https://i.ibb.co/jvGthHX6/React-pptx-2.png',
                            'https://i.ibb.co/JhC72Mr/React-pptx-3.png',
                            'https://i.ibb.co/jPxNW3Lk/React-pptx-4.png'
                        ]}/>;
                    } else {
                        // Если есть видео, но нет слайдов - не показываем презентацию, покажем видео ниже
                        console.log('Есть видео, но нет слайдов - скрываем презентацию');
                        return null;
                    }
                })()}
                
                {/* <div className="lecture-teachers">
                    <div className="lecture-teachers__avatars">
                        {lecture.teachers.map((teacher: Teacher) => (
                            <div 
                                key={teacher.id}
                                className="lecture-teacher"
                            >
                                <div className="lecture-teacher__container">
                                    <div className="lecture-teacher__avatar">
                                        <img 
                                            src={teacher.photo} 
                                            alt={teacher.name} 
                                            className="lecture-teacher__image"
                                        />
                                    </div>
                                    <span className="lecture-teacher__name">{teacher.name}</span>
                                    <div className="lecture-teacher__tooltip">
                                        <div className="lecture-teacher__tooltip-content">
                                            <img 
                                                src={teacher.photo} 
                                                alt={teacher.name} 
                                                className="lecture-teacher__tooltip-image"
                                            />
                                            <div className="lecture-teacher__tooltip-text">
                                                <div className="lecture-teacher__tooltip-name">@{teacher.name}</div>
                                                <div className="lecture-teacher__tooltip-description">{teacher.description}</div>
                                                <button 
                                                onClick={() => navigate(`/teachers/${teacher.id}`)} 
                                                className="lecture-teacher__tooltip-button"
                                                >
                                                view profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Показываем плеер если есть видео и нет презентации */}
                {(() => {
                    const hasSlides = lecture.presentationSlides && lecture.presentationSlides.length > 0;
                    const hasVideo = lecture.videoUrl && lecture.videoUrl.trim() !== '';
                    const shouldShowPlayer = hasVideo && !hasSlides;
                    
                    console.log('Проверка видеоплеера:', {
                        shouldShowPlayer,
                        hasSlides,
                        hasVideo,
                        videoUrl: lecture.videoUrl,
                        presentationSlides: lecture.presentationSlides,
                        slidesLength: lecture.presentationSlides?.length
                    });
                    
                    if (shouldShowPlayer) {
                        console.log('Показываем видеоплеер для лекции с видео');
                        return (
                            <CoursePlayer
                                courseId={course.id}
                                userId={user?.id || 'user_default_1'}
                                lectures={course.lectures?.map(l => ({
                                    ...l,
                                    id: l.id.toString(),
                                    duration: 600, // Default duration in seconds
                                    videoUrl: l.videoUrl || ''
                                })) || []}
                                currentLectureId={lecture.id.toString()}
                                onLectureComplete={handleLectureComplete}
                                course={course}
                            />
                        );
                    } else {
                        console.log('Скрываем видеоплеер - нет видео или есть презентация');
                        return null;
                    }
                })()}

                {renderQuizContent()}

                <div className="rating-section">
                    <h3>Оцените лекцию</h3>
                    <LikeDislike 
                        likes={likes}
                        userRating={userRating}
                        isAuthenticated={isAuthenticated}
                        onLike={handleLike}
                        onDislike={handleDislike}
                        onAuthPrompt={openAuthModal}
                    />
                </div>

                <LectureComments
                    lectureId={parseInt(lectureId!)}
                    courseId={parseInt(courseId!)}
                />
            </LessonContent>

            {/* Модальное окно авторизации */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={closeAuthModal} 
            />



             {/* Модальное окно для обратной связи при дизлайке */}
             <FeedbackModal 
                isOpen={isFeedbackModalOpen} 
                onClose={closeFeedbackModal}
                onSubmit={handleFeedbackSubmit}
            />
        </div>
    );
};

export default LecturePage; 