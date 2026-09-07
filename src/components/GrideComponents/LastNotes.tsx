"use client";
import { useCourses } from "@/lib/context/CoursesContext";
import { useNotes } from "@/lib/context/NotesContext.tsx";
import { Circle, NotebookPen } from "lucide-react";

export default function notes() {
  const { courses } = useCourses();
  const {notes} = useNotes();
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 px-8 py-5">
        <NotebookPen className="h-5 w-5 text-indigo-600" />

        <h2 className="font-semibold text-gray-900">Ultimi appunti</h2>
      </div>

      {/* Lista scrollabile */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto divide-y divide-gray-100">
        {notes.map((note) => {
          const findColor = courses.find((course) => note.course == course.id);
          let color = "";

          if (findColor?.color) {
            color = findColor.color;
          } else {
            color = "bg-indigo-50 text-indigo-600";
          }

          return (
            <div
              key={note.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}
              >
                <Circle />
              </div>

              <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">
                {note.name}
              </p>

              <span
                className={`hidden rounded-md sm:block px-2 py-1 text-xs font-medium ${color}`}
              >
                {note.course}
              </span>

              <p className="w-24 text-right text-xs text-gray-400">
                {note.data.toLocaleDateString("it-IT")}
              </p>
            </div>
          );
        })}
        <button className="text-sm w-full text-center py-5 font-medium text-indigo-600 transition hover:text-indigo-800">
          Mostra tutti
        </button>
      </div>
    </div>
  );
}
