import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from '../App';
import TeacherProfilePage from './TeacherProfilePage';
import CoursesPage from './CoursesPage';
import CourseDetailPage from './CourseDetailPage';
import LecturePage from './LecturePage';
import TeachersListPage from "./TeachersListPage.tsx";
import MainPage from "./MainPage.tsx";
import ScrollToTopButton from "../components/ScrollButton/ScrollButton.tsx";
import PrivacyPolicyPage from "./PrivacyPolicyPage.tsx";
import TermsOfUsePage from "./TermsOfUsePage.tsx";
import ReviewsPage from "./ReviewsPage.tsx";
import FavoritesPage from "./FavoritesPage.tsx";
import { AuthProvider } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <ScrollToTopButton/>
                <Routes>
                    {/*<Route path="/" element={<Navigate to="/courses" replace />} />*/}
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/lecture" element={<App/>}/>
                    <Route path="/courses" element={<CoursesPage/>}/>
                    <Route path="/courses/:courseId" element={<CourseDetailPage/>}/>
                    <Route path="/courses/:courseId/lectures/:lectureId" element={<LecturePage/>}/>
                    <Route path="/teachers" element={<TeachersListPage/>}/>
                    <Route path="/teachers/:id" element={<TeacherProfilePage/>}/>
                    <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
                    <Route path="/terms" element={<TermsOfUsePage/>}/>
                    <Route path="/reviews" element={<ReviewsPage />}/>
                    <Route path="/favorites" element={<FavoritesPage />}/>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes; 