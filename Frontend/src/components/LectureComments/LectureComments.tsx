import React, { useState, useEffect } from 'react';
import { Comment } from '../../types/comments';
import { CommentsApi, CommentCreate } from '../../api/commentsApi';
import CommentsList from '../CommentsList/CommentsList';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import { useAuth } from '../../contexts/AuthContext';
import './LectureComments.css';

interface LectureCommentsProps {
  lectureId: number;
  courseId: number;
}

const LectureComments: React.FC<LectureCommentsProps> = ({
  lectureId,
  courseId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const commentsApi = new CommentsApi();

  useEffect(() => {
    loadComments();
  }, [lectureId]);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await commentsApi.getLectureComments(lectureId);
      setComments(data);
    } catch (err) {
      console.error('Ошибка при загрузке комментариев:', err);
      setError('Не удалось загрузить комментарии');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentAdded = async (commentData: CommentCreate) => {
    try {
      setIsSubmitting(true);
      const newComment = await commentsApi.addComment(commentData);
      setComments(prevComments => [newComment, ...prevComments]);
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
      setError('Не удалось добавить комментарий');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="lecture-comments">
        <div className="comments-auth-required">
          <p>Войдите в систему, чтобы просматривать и оставлять комментарии</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lecture-comments">
      <div className="comments-header">
        <h2>Обсуждение лекции</h2>
        <p>Поделитесь своими мыслями и вопросами по материалу лекции</p>
      </div>

      {error && (
        <div className="comments-error">
          <p>{error}</p>
          <button onClick={loadComments} className="retry-button">
            Попробовать снова
          </button>
        </div>
      )}

      <AddCommentForm
        lectureId={lectureId}
        courseId={courseId}
        userId={parseInt(user.id)}
        userAvatar={user.avatar}
        userName={user.username}
        onCommentAdded={handleCommentAdded}
        isSubmitting={isSubmitting}
      />

      <CommentsList
        comments={comments}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LectureComments; 