import FileManager from "@/lib/manager/FileManager";
import { File } from "@/interface/interface";
import { useCourses } from "@/lib/context/CoursesContext";
import { useFiles } from "@/lib/context/NotesContext";
import { generateUUID } from "@/lib/utils/uuid";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateAppuntiPage() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const { createFile } = useFiles();

  const { courses } = useCourses();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !course.trim()) {
      return;
    }

    const newFile: File = {
      id: generateUUID(),
      name: name,
      directory: description,
      course: course,
      created_at: new Date(),
    };
console.log("PRIMA AWAIT")

    const create = await createFile(newFile);
    console.log("DOPO AWAIT")
    console.log(create)
    if (create) {
  
      navigate(`/editor/${encodeURIComponent(newFile.name)}`);
    }
  };

  return (
    <div className="relative flex h-full min-h-0 w-full items-center justify-center overflow-y-auto bg-indigo-50/60 p-6 transition-colors dark:bg-[#181818]">
      <button
        type="button"
        onClick={() => window.history.back()}
        className="absolute left-6 top-6 flex cursor-pointer items-center gap-2 rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-50 dark:border-[#3c3c3c] dark:bg-[#252526] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e]"
      >
        <ArrowLeft size={18} />
        <span>Torna indietro</span>
      </button>

      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-6 rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm shadow-indigo-100 transition-colors dark:border-[#303030] dark:bg-[#252526] dark:shadow-none"
        >
          <div>
            <h1 className="text-2xl font-bold text-indigo-950 dark:text-[#cccccc]">
              Nuovo appunto
            </h1>

            <p className="mt-1 text-sm text-indigo-600 dark:text-[#9d9d9d]">
              Inserisci le informazioni del tuo appunto.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-indigo-900 dark:text-[#cccccc]">
              Nome appunto
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Es. Derivate e integrali"
              className="w-full rounded-lg border border-indigo-200 bg-indigo-50/40 px-3 py-2 text-indigo-900 placeholder:text-indigo-300 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e] dark:focus:border-[#007acc] dark:focus:bg-[#1e1e1e] dark:focus:ring-0"
              autoFocus
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-indigo-900 dark:text-[#cccccc]">
              Corso
            </label>

            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-lg border border-indigo-200 bg-indigo-50/40 px-3 py-2 text-indigo-900 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:focus:border-[#007acc] dark:focus:bg-[#1e1e1e] dark:focus:ring-0"
            >
              <option value="">Seleziona un corso</option>
              {courses.map((courseItem) => (
                <option key={courseItem.id} value={courseItem.id}>
                  {courseItem.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-indigo-900 dark:text-[#cccccc]">
              Descrizione
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrizione opzionale..."
              rows={3}
              className="w-full resize-none rounded-lg border border-indigo-200 bg-indigo-50/40 px-3 py-2 text-indigo-900 placeholder:text-indigo-300 outline-none transition-colors focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 dark:border-[#3c3c3c] dark:bg-[#1e1e1e] dark:text-[#cccccc] dark:placeholder:text-[#6e6e6e] dark:focus:border-[#007acc] dark:focus:bg-[#1e1e1e] dark:focus:ring-0"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !course.trim()}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-200 disabled:text-indigo-400 dark:bg-[#007acc] dark:hover:bg-[#1a85c7] dark:disabled:bg-[#3c3c3c] dark:disabled:text-[#6e6e6e]"
          >
            Crea appunto
          </button>
        </form>
      </div>
    </div>
  );
}
