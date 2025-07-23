import React from 'react';
import { createPortal } from 'react-dom';
import './TagFilterModal.css';

interface TagFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const TagFilterModal: React.FC<TagFilterModalProps> = ({
  isOpen,
  onClose,
  availableTags,
  selectedTags,
  onTagToggle,
  onClearAll
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    <div className="tag-filter-modal-overlay" onClick={handleOverlayClick}>
      <div className="tag-filter-modal">
        <div className="tag-filter-modal__header">
          <h3 className="tag-filter-modal__title">Фильтр по тегам</h3>
          <button 
            className="tag-filter-modal__close" 
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        <div className="tag-filter-modal__content">
          {selectedTags.length > 0 && (
            <div className="tag-filter-modal__selected">
              <div className="tag-filter-modal__selected-header">
                <span>Выбрано тегов: {selectedTags.length}</span>
                <button 
                  className="tag-filter-modal__clear" 
                  onClick={onClearAll}
                >
                  Очистить все
                </button>
              </div>
            </div>
          )}

          <div className="tag-filter-modal__tags">
            {availableTags.map(tag => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  className={`tag-filter-modal__tag ${isSelected ? 'tag-filter-modal__tag--selected' : ''}`}
                  onClick={() => onTagToggle(tag)}
                >
                  {tag}
                  {isSelected && (
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="tag-filter-modal__tag-icon"
                    >
                      <path 
                        d="M6 18L18 6M6 6L18 18" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="tag-filter-modal__footer">
          <button 
            className="tag-filter-modal__apply" 
            onClick={handleClose}
          >
            Применить
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default TagFilterModal; 