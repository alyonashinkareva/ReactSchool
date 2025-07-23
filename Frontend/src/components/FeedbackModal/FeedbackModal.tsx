import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import './FeedbackModal.css'; // Создадим отдельный CSS файл для стилей

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (feedback.trim()) {
      onSubmit(feedback);
      setFeedback('');
    }
  };

  const handleClose = () => {
    setFeedback('');
    onClose();
  };

  return createPortal(
    <div className="feedback-modal-overlay" onClick={handleClose}>
      <div className="feedback-modal" onClick={e => e.stopPropagation()}>
        <h2>Что не понравилось?</h2>
        <textarea
          className="feedback-textarea"
          placeholder="Оставьте ваш отзыв здесь..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
        <div className="feedback-modal-actions">
          <button className="feedback-button feedback-button--secondary" onClick={handleClose}>Отмена</button>
          <button className="feedback-button feedback-button--primary" onClick={handleSubmit}>Отправить</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FeedbackModal; 