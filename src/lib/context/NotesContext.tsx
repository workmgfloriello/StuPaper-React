"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { initialNotes } from "../data";

type NotesContextType = {
  notes: typeof initialNotes;
  setNotes: Dispatch<SetStateAction<typeof initialNotes>>;
};

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error("useCourses must be used within a CoursesProvider");
  }

  return context;
}
