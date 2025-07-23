import React, { useEffect, useState } from 'react';
import { Course } from '../types/courses';
import progressService from '../services/progressService';
import '../styles/CoursePlayer.css';

interface Lecture {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
}

interface CoursePlayerProps {
  courseId: number;
  userId: string;
  lectures: Lecture[];
  currentLectureId?: string;
  onLectureComplete?: (lectureId: string) => void;
  course: Course;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({
  courseId,
  userId,
  lectures,
  currentLectureId,
  onLectureComplete
}) => {
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (currentLectureId) {
      const lecture = lectures.find(l => l.id === currentLectureId);
      if (lecture) {
        setActiveLecture(lecture);
        loadLectureProgress(lecture.id);
      }
    } else if (lectures.length > 0) {
      setActiveLecture(lectures[0]);
      loadLectureProgress(lectures[0].id);
    }
  }, [currentLectureId, lectures]);

  const loadLectureProgress = async (lectureId: string) => {
    if (!userId) return;
    
    const lastPosition = await progressService.getLastPosition(lectureId, userId);
    if (activeLecture) {
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = lastPosition;
      }
    }
  };

  const handleTimeUpdate = async (time: number) => {
    if (activeLecture && userId) {
      await progressService.updateLectureProgress(activeLecture.id, userId, time, activeLecture.duration);
      
      if (time >= activeLecture.duration * 0.9) {
        await progressService.updateProgress(courseId, activeLecture.id, userId);
        if (onLectureComplete) {
          onLectureComplete(activeLecture.id);
        }
      }
    }
  };

  return (
    <div className="course-player">
      <div className="video-container">
        {activeLecture && activeLecture.videoUrl && activeLecture.videoUrl.trim() !== '' ? (
          <video
            src={activeLecture.videoUrl}
            controls
            autoPlay={isPlaying}
            onTimeUpdate={(e) => handleTimeUpdate(e.currentTarget.currentTime)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <div className="video-placeholder">
            <div className="video-placeholder-content">
              <div className="video-placeholder-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C13.1 2 14 2.9 14 4V5H16C17.1 5 18 5.9 18 7V19C18 20.1 17.1 21 16 21H8C6.9 21 6 20.1 6 19V7C6 5.9 6.9 5 8 5H10V4C10 2.9 10.9 2 12 2ZM12 4V5H12V4ZM8 7V19H16V7H8ZM12 8C13.66 8 15 9.34 15 11C15 12.66 13.66 14 12 14C10.34 14 9 12.66 9 11C9 9.34 10.34 8 12 8ZM12 16L15 19H9L12 16Z" fill="currentColor"/>
                </svg>
              </div>
              <h3>Видео недоступно</h3>
              <p>Для этой лекции видеоматериал не предоставлен</p>
              {activeLecture && (
                <div className="lecture-info">
                  <h4>{activeLecture.title}</h4>
                  <p>Вы можете ознакомиться с материалами лекции в текстовом формате</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer; 