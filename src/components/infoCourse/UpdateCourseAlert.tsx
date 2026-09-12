import { Pencil, X } from "lucide-react";
import { useState } from "react";

interface UpdateCourseAlertProps {
  open: boolean;
  course: {
    name: string;
    professor: string;
    description: string;
    year: number;
    semester: number;
  };
  onClose: () => void;
  onConfirm: (data: {
    name: string;
    professor: string;
    description: string;
    year: number;
    semester: number;
  }) => void;
}

export default function UpdateCourseAlert({
  open,
  course,
  onClose,
  onConfirm,
}: UpdateCourseAlertProps) {
  const [name, setName] = useState(course.name);
  const [professor, setProfessor] = useState(course.professor);
  const [description, setDescription] = useState(course.description || "");
  const [year, setYear] = useState(course.year);
  const [semester, setSemester] = useState(course.semester);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onConfirm({
      name,
      professor,
      description,
      year,
      semester,
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm dark:bg-black/60">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-[#3c3c3c] dark:bg-[#252526]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-[#3c3c3c]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 dark:bg-[#264f78]">
              <Pencil className="h-5 w-5 text-indigo-600 dark:text-[#4daafc]" />
            </div>

            <h2 className="text-base font-semibold text-gray-900 dark:text-[#cccccc]">
              Modifica corso
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-[#9d9d9d] dark:hover:bg-[#2a2d2e] dark:hover:text-[#cccccc]"
            aria-label="Chiudi"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-5 py-5">
            {/* Nome corso */}
            <div>
              <label
                htmlFor="course-name"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-[#cccccc]"
              >
                Nome corso
              </label>

              <input
                id="course-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:focus:border-[#007acc]"
                placeholder="Es. Analisi Matematica 1"
              />
            </div>

            {/* Professore */}
            <div>
              <label
                htmlFor="course-professor"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-[#cccccc]"
              >
                Professore
              </label>

              <input
                id="course-professor"
                type="text"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:focus:border-[#007acc]"
                placeholder="Es. Mario Rossi"
              />
            </div>

            {/* Descrizione */}
            <div>
              <label
                htmlFor="course-description"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-[#cccccc]"
              >
                Descrizione
              </label>

              <textarea
                id="course-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:focus:border-[#007acc]"
                placeholder="Descrizione del corso..."
              />
            </div>

            {/* Anno e semestre */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Anno */}
              <div>
                <label
                  htmlFor="course-year"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-[#cccccc]"
                >
                  Anno
                </label>

                <select
                  id="course-year"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:focus:border-[#007acc]"
                >
                  <option value={1}>1° Anno</option>
                  <option value={2}>2° Anno</option>
                  <option value={3}>3° Anno</option>
                  <option value={4}>4° Anno</option>
                  <option value={5}>5° Anno</option>
                </select>
              </div>

              {/* Semestre */}
              <div>
                <label
                  htmlFor="course-semester"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-[#cccccc]"
                >
                  Semestre
                </label>

                <select
                  id="course-semester"
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:focus:border-[#007acc]"
                >
                  <option value={1}>1° Semestre</option>
                  <option value={2}>2° Semestre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-gray-200 bg-gray-50 px-5 py-3 dark:border-[#3c3c3c] dark:bg-[#1e1e1e]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:border-[#3c3c3c] dark:bg-[#252526] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]"
            >
              Annulla
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-[#007acc] dark:hover:bg-[#1a85c7]"
            >
              <Pencil className="h-4 w-4" />
              Salva modifiche
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
