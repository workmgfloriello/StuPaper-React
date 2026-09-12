import type { ElectronApi } from "@/interface/interface";

class CustomCourseManager {
  async getCourses() {
    return await window.electronAPI?.selectCourses?.();
  }

  async createCourse(course: any) {
    return await window.electronAPI?.insertCourse?.(course);
  }

  async updateRecent(courseId: string, newRecent: boolean) {
    return await window.electronAPI?.updateRecent?.(courseId, newRecent);
  }

  async delateCourse(courseId: string) {
    return await window.electronAPI?.delateCourse?.(courseId);
  }

  async updateColor(courseId: string, color: string) {
    return await window.electronAPI?.updateColor?.(courseId, color);
  }

  async updateNoteCount(courseId: string, count: number) {
    return await window.electronAPI?.updateNoteCount?.(courseId, count);
  }

  async updateCourse(courseId: string,course: {id: string;name: string;professor: string;description: string;year: number;semester: number;}) { 
    return await window.electronAPI?.updateCourse?.(courseId,course) 
  }

}

const CourseManager = new CustomCourseManager();
export default CourseManager;
