import React, { useState } from 'react';
import Button from '../Button';
import { PresentationProps } from './Presentation.typings';

export const Presentation: React.FC<PresentationProps> = (props) => {
  const { slides } = props;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="presentation-container">
      <div className="presentation-viewer">
        <div className="presentation-slide">
          <img 
            src={slides[currentSlide]} 
            alt={`Слайд ${currentSlide + 1}`} 
            className="slide-image"
          />
          <div className="slide-number">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
        <div className="presentation-controls">
          <Button
            variant="primary"
            onClick={prevSlide}
            disabled={currentSlide === 0}
          >
            <span className="nav-arrow prev-arrow">←</span>
          </Button>
          
          <Button
            variant="primary"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
          >
            <span className="nav-arrow next-arrow">→</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
