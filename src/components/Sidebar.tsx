"use client";

import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Plus,
  Settings,
  User,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useCourses } from "../lib/context/CoursesContex";

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/corsi",
    label: "I miei corsi",
    icon: BookOpen,
  },
  {
    href: "/appunti",
    label: "Tutti gli appunti",
    icon: FileText,
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(true);
  const [coursesOpen, setCoursesOpen] = useState(true);

  const { courses } = useCourses();

  //CHIUDI SE Ti TROVI NELL'EDITOR
  useEffect(() => {
    if(pathname==="/editor"){
      setOpen(false);
    }
  }, [pathname]);

  return (
    <aside
      className={`
        relative
        flex
        h-screen
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-gray-200
        bg-white
        transition-all
        duration-300
        ${open ? "w-64" : "w-16"}

      `}
    >
      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="
          absolute
          right-2
          top-6
          z-10
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          border
          border-gray-200
          bg-white
          text-gray-500
          shadow-sm
          transition
          hover:bg-gray-50
        "
      >
        <ChevronLeft
          className={`
            h-4
            w-4
            transition-transform
            duration-300
            ${open ? "" : "rotate-180"}
          `}
        />
      </button>

      {/* Logo */}
      <div className="flex h-18 shrink-0 items-center gap-2 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white">
          S
        </div>

        {open && (
          <span className="whitespace-nowrap text-base font-semibold text-gray-900">
            StuPaper
          </span>
        )}
      </div>

      {/* Nuovo appunto */}
      <div className="shrink-0 px-3">
        <Link
          to="/editor"
          className="
            flex
            h-10
            w-full
            shrink-0
            items-center
            gap-3
            rounded-lg
            bg-indigo-600
            px-3
            text-sm
            font-medium
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          <Plus className="h-4 w-4 shrink-0" />

          {open && <span className="whitespace-nowrap">Nuovo appunto</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex shrink-0 flex-col gap-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                flex
                h-10
                w-full
                shrink-0
                items-center
                gap-3
                rounded-lg
                px-3
                text-sm
                transition
                ${
                  active
                    ? "bg-indigo-50 font-medium text-indigo-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
            >
              <Icon className="h-4 w-4 shrink-0" />

              {open && (
                <span className="truncate whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Corsi */}
      <div className="mt-6 min-h-0 flex-1 overflow-hidden px-3">
        {open && (
          <>
            <button
              type="button"
              onClick={() => setCoursesOpen((value) => !value)}
              className="
                flex
                h-8
                w-full
                shrink-0
                items-center
                justify-between
                px-3
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-gray-400
              "
            >
              <span>Corsi</span>

              <ChevronDown
                className={`
                  h-3.5
                  w-3.5
                  transition-transform
                  duration-200
                  ${coursesOpen ? "rotate-0" : "-rotate-90"}
                `}
              />
            </button>

            {coursesOpen && (
              <div className="mt-1 min-h-0 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {courses.map((course) => {
                    const active = pathname === `/corsi/${course.id}`;

                    return (
                      <Link
                        key={course.id}
                        to={`/corsi/${course.id}`}
                        className={`
                          flex
                          h-10
                          w-full
                          shrink-0
                          items-center
                          gap-3
                          rounded-lg
                          px-3
                          text-sm
                          transition
                          ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }
                        `}
                      >
                        <span
                          className={`
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            text-[10px]
                            font-semibold
                            ${course.color}
                          `}
                        >
                          {course.code}
                        </span>

                        <span className="truncate">{course.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* User */}
      <div className="shrink-0 border-t border-gray-200 px-3 py-3">
        <div className="flex h-10 items-center gap-3 rounded-lg px-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
            <User className="h-4 w-4 text-gray-500" />
          </div>

          {open && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  Mario
                </p>

                <p className="truncate text-xs text-gray-500">
                  mario@studenti.it
                </p>
              </div>

              <Link
                to="/impostazioni"
                className="shrink-0 text-gray-400 transition hover:text-gray-600"
              >
                <Settings className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

