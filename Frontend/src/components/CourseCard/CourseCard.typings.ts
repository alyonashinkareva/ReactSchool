export interface ICourseCardProps {
    id: string;
    title: string;
    description: string;
    cover: string;
    progress?: number;
    url: string;
    isAvailable?: boolean;
    duration?: number; // длительность в месяцах
    isPopular?: boolean; // флаг популярного курса
    backgroundColor?: string; // цвет фона карточки
} 