import React, { useState } from 'react';
import TagFilterModal from './TagFilterModal';
import './TagFilter.css';

interface TagFilterProps {
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

const TagFilter: React.FC<TagFilterProps> = ({
  availableTags,
  selectedTags,
  onTagToggle,
  onClearAll
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasSelectedTags = selectedTags.length > 0;
  
  // Ограничиваем количество отображаемых тегов
  const maxVisibleTags = 8;
  const visibleTags = availableTags.slice(0, maxVisibleTags);
  const hiddenTagsCount = availableTags.length - maxVisibleTags;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="tag-filter">
        <div className="tag-filter__header">
          <h3 className="tag-filter__title">Фильтр по тегам</h3>
          {hasSelectedTags && (
            <button 
              className="tag-filter__clear" 
              onClick={onClearAll}
            >
              Очистить все
            </button>
          )}
        </div>
        
        <div className="tag-filter__tags">
          {visibleTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                className={`tag-filter__tag ${isSelected ? 'tag-filter__tag--selected' : ''}`}
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
                    className="tag-filter__tag-icon"
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

          {hiddenTagsCount > 0 && (
            <button 
              className="tag-filter__more-button"
              onClick={openModal}
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="1" fill="currentColor"/>
                <circle cx="19" cy="12" r="1" fill="currentColor"/>
                <circle cx="5" cy="12" r="1" fill="currentColor"/>
              </svg>
              Еще {hiddenTagsCount} {hiddenTagsCount === 1 ? 'тег' : hiddenTagsCount <= 4 ? 'тега' : 'тегов'}
            </button>
          )}
        </div>

        {hasSelectedTags && (
          <div className="tag-filter__summary">
            Выбрано тегов: {selectedTags.length}
          </div>
        )}
      </div>

      <TagFilterModal
        isOpen={isModalOpen}
        onClose={closeModal}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagToggle={onTagToggle}
        onClearAll={onClearAll}
      />
    </>
  );
};

export default TagFilter; 