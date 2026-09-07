"use client"
import { createContext, useState, ReactNode, useContext, Dispatch, SetStateAction } from "react";
import { initilCourses } from "../data";

type CoursesContextType = {
  courses: typeof initilCourses;
  setCourses: Dispatch<SetStateAction<typeof initilCourses>>;
};

const CourseContext = createContext<CoursesContextType | null>(null);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState(initilCourses);

  return (
    <CourseContext.Provider value={{ courses, setCourses }}>
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