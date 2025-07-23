import React from 'react';
import { Comment } from '../../types/comments';
import './CommentsList.css';

interface CommentsListProps {
  comments: Comment[];
  isLoading?: boolean;
}

const CommentsList: React.FC<CommentsListProps> = ({ comments, isLoading }) => {
  if (isLoading) {
    return (
      <div className="comments-loading">
        <div className="spinner"></div>
        <p>Загрузка комментариев...</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="comments-empty">
        <p>Пока что нет комментариев к этой лекции.</p>
        <p>Будьте первым, кто оставит комментарий!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      <h3 className="comments-title">
        Комментарии ({comments.length})
      </h3>
      <div className="comments-container">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <div className="comment-author-info">
                {comment.avatar ? (
                  <img 
                    src={comment.avatar} 
                    alt={comment.author} 
                    className="comment-avatar"
                  />
                ) : (
                  <div className="comment-avatar-placeholder">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="comment-meta">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="comment-content">
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsList; 