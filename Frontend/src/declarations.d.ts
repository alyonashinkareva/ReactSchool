// Определение для всех CSS-модулей
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Определение для импорта стилей Swiper
declare module 'swiper/css';
declare module 'swiper/css/navigation';
declare module 'swiper/css/pagination'; 