"use client";
import { useCourses } from "@/lib/context/CoursesContext";
import { useFiles } from "@/lib/context/NotesContext.tsx";
import { Circle, NotebookPen } from "lucide-react";

export default function notes() {
  const { courses } = useCourses();
  const { files } = useFiles();
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white transition-colors dark:border-[#303030] dark:bg-[#252526]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 px-8 py-5">
        <NotebookPen className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
        <h2 className="font-semibold text-gray-900 dark:text-[#cccccc]">
          Ultimi appunti
        </h2>
      </div>

      {/* Lista scrollabile */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-[#303030]">
        {files.map((note) => {
          let color = "";
          let courseName = "";

          const findCourse = courses.find((course) => course.id == note.course);

          if (findCourse) {
            color = findCourse.color;
            courseName = findCourse.name;
          } else {
            color = "#6366f1";
            courseName = "Nessun Corso";
          }
          return (
            <div
              key={note.id}
              className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-[#2a2d2e]"
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: color }}
              >
                <Circle className="text-white" />
              </div>

              <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900 dark:text-[#cccccc]">
                {note.name}
              </p>

              <span
                className="hidden rounded-md px-2 py-1 text-sm text-gray-800 font-bold sm:block"
                style={{ backgroundColor: color }}
              >
                {courseName}
              </span>

              <span className="text-xs text-gray-500 dark:text-[#9d9d9d]">
                {note.created_at
                  ? new Date(note.created_at).toLocaleDateString("it-IT")
                  : "Nessuna data"}
              </span>
            </div>
          );
        })}

        <button className="w-full py-5 text-center text-sm font-medium text-indigo-600 transition hover:text-indigo-800 dark:text-[#4daafc] dark:hover:text-[#75beff]">
          Mostra tutti
        </button>
      </div>
    </div>
  );
}
