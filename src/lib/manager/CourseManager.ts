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

  async delateCourse(courseId: string){
    return await window.electronAPI?.delateCourse?.(courseId);
  }
}

const CourseManager = new CustomCourseManager();
export default CourseManager;
