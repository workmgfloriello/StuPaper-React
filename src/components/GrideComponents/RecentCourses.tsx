"use client";
import { useCourses } from "@/lib/context/CoursesContex";
import { BookOpen, GraduationCap, UserRound } from "lucide-react";

export default function RecentCourses() {
  const { courses } = useCourses();
  const recentCourses = courses
    .filter((course) => course.recent)
    .slice(0, 3);

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-gray-200 bg-white p-5">
      
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2">
        <GraduationCap className="h-5 w-5 text-indigo-600" />

        <h2 className="font-semibold text-gray-900">
          Corsi recenti
        </h2>
      </div>

      {/* Courses */}
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
        {recentCourses.map((course) => (
          <div
            key={course.id}
            className="flex min-h-0 min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Card header */}
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${course.color}`}
              >
                {course.code}
              </div>

              <BookOpen className="h-5 w-5 text-gray-300" />
            </div>

            {/* Course info */}
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {course.name}
              </h3>

              <div className="mt-2 flex min-w-0 items-center gap-2 text-xs text-gray-500">
                <UserRound className="h-4 w-4 shrink-0" />

                <span className="truncate">
                  {course.professor}
                </span>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                {course.notesCount} appunti · {course.cfu} CFU
              </p>
            </div>

            {/* Progress */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                <span>Progressi</span>
                <span>62%</span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: "62%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

