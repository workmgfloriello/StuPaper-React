"use client";

import { Course } from "@/interface/interface";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import CourseManager from "../manager/CourseManager";

type CoursesContextType = {
  courses: Course[];
  setCourses: Dispatch<SetStateAction<Course[]>>;
  updateRecent: (courseId: string, newRecent: boolean) => Promise<any>;
};

const CourseContext = createContext<CoursesContextType | null>(null);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const electronAPI = window.electronAPI as
          | (typeof window.electronAPI & {
              selectCourses?: () => Promise<Course[]>;
            })
          | undefined;

        const coursesFromDatabase = await electronAPI?.selectCourses?.();

        if (coursesFromDatabase) {
          setCourses(coursesFromDatabase);
        }
      } catch (error) {
        console.error("Errore caricamento corsi:", error);
      }
    }

    loadCourses();
  }, []);

async function updateRecent(courseId: string, newRecent: boolean) {
  const result = await CourseManager.updateRecent(courseId, newRecent);

  if (result?.success) {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? { ...course, recent: newRecent }
          : course,
      ),
    );
  }

  return result;
}

  return (
    <CourseContext.Provider value={{ courses, setCourses, updateRecent }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }

  return context;
}