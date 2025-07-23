export interface QuizResult {
    lectureId: number;
    courseId: number;
    userId: number;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    answers: (number | null)[];
    completed: boolean;
    attemptDate: string;
    timeSpent: number;
} 