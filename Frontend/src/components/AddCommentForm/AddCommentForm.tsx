import React, { useState } from 'react';
import { CommentCreate } from '../../api/commentsApi';
import './AddCommentForm.css';

interface AddCommentFormProps {
  lectureId: number;
  courseId: number;
  userId: number;
  userAvatar?: string;
  userName: string;
  onCommentAdded: (comment: any) => void;
  isSubmitting?: boolean;
}

const AddCommentForm: React.FC<AddCommentFormProps> = ({
  lectureId,
  courseId,
  userId,
  userAvatar,
  userName,
  onCommentAdded,
  isSubmitting = false,
}) => {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      return;
    }

    const commentData: CommentCreate = {
      author: userName,
      avatar: userAvatar,
      text: text.trim(),
      date: new Date().toISOString(),
      lecture_id: lectureId,
      course_id: courseId,
      user_id: userId,
    };

    try {
      await onCommentAdded(commentData);
      setText('');
      setIsExpanded(false);
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setText('');
    setIsExpanded(false);
  };

  return (
    <div className="add-comment-form">
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="comment-input-container">
          <div className="comment-author-avatar">
            {userAvatar ? (
              <img 
                src={userAvatar} 
                alt={userName} 
                className="comment-author-image"
              />
            ) : (
              <div className="comment-author-placeholder">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="comment-input-wrapper">
            <textarea
              value={text}
              onChange={handleTextChange}
              onFocus={handleFocus}
              placeholder="Оставьте комментарий к лекции..."
              className={`comment-textarea ${isExpanded ? 'expanded' : ''}`}
              rows={isExpanded ? 4 : 1}
              disabled={isSubmitting}
            />
            {isExpanded && (
              <div className="comment-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="comment-button comment-button-cancel"
                  disabled={isSubmitting}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="comment-button comment-button-submit"
                  disabled={!text.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Отправляется...' : 'Отправить'}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCommentForm; 