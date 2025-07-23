import { API_BASE_URL } from '../config';
import { ITeacherCardProps } from '../components/TeacherCard/TeacherCard.typings';
import { TeacherCourseWithLectures } from '../types/courses';

class TeachersApi {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/teachers`;
    }

    async getTeacher(id: string): Promise<ITeacherCardProps> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch teacher');
        }
        return response.json();
    }

    async getAllTeachers(): Promise<ITeacherCardProps[]> {
        const response = await fetch(this.baseUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch teachers');
        }
        return response.json();
    }

    async getTeacherLectures(teacherId: string): Promise<TeacherCourseWithLectures[]> {
        const response = await fetch(`${this.baseUrl}/${teacherId}/lectures`);
        if (!response.ok) {
            throw new Error('Failed to fetch teacher lectures');
        }
        return response.json();
    }
}

export const teachersApi = new TeachersApi(); 