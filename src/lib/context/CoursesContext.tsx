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
  delateCourse: (courseId: string) => Promise<any>;
  updateColor: (courseId: string, color: string) => Promise<any>;
  updateNoteCount: (courseId: string, count: number) => Promise<any>;
  updateCourse: (courseId: string, course: any) => Promise<any>;
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
          course.id === courseId ? { ...course, recent: newRecent } : course,
        ),
      );
    }

    return result;
  }

  async function delateCourse(courseId: string) {
    const result = await CourseManager.delateCourse(courseId);

    if (result?.changes) {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId),
      );
    }

    return result;
  }

  async function updateColor(courseId: string, color: string) {
    const result = await CourseManager.updateColor(courseId, color);

    if (result?.changes > 0) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId ? { ...course, color: color } : course,
        ),
      );
    }

    return result;
  }

  async function updateNoteCount(courseId: string, count: number) {
    const result = await CourseManager.updateNoteCount(courseId, count);

    if (result?.changes > 0) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                notes_count: Math.max(
                  course.notes_count + (count === 1 ? 1 : -1),
                  0,
                ),
              }
            : course,
        ),
      );
    }

    return result;
  }

  const updateCourse = async (
    courseId: string,
    course: {
      name: string;
      professor: string;
      description: string;
      year: number;
      semester: number;
    },
  ) => {
    const courseWithId = { ...course, id: courseId };
    const result = await CourseManager.updateCourse(courseId, courseWithId);

    if (result?.success) {
      setCourses((prevCourses) =>
        prevCourses.map((c) =>
          c.id === courseId
            ? {
                ...c,
                ...courseWithId,
              }
            : c,
        ),
      );
    }

    return result;
  };


  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        updateRecent,
        delateCourse,
        updateColor,
        updateNoteCount,
        updateCourse,
      }}
    >
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
