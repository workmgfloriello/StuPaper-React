import { useState } from "react";
import { useUser } from "@/lib/context/UserContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type UserType = "studente" | "docente" | "personale";
type Theme = "system" | "light" | "dark";
type Palette = "indigo" | "blue" | "violet" | "green" | "orange" | "rose";

const palettes = [
  {
    id: "indigo",
    name: "Indigo",
    className: "bg-indigo-600",
  },
  {
    id: "blue",
    name: "Blu",
    className: "bg-blue-600",
  },
  {
    id: "violet",
    name: "Viola",
    className: "bg-violet-600",
  },
  {
    id: "green",
    name: "Verde",
    className: "bg-emerald-600",
  },
  {
    id: "orange",
    name: "Arancio",
    className: "bg-orange-500",
  },
  {
    id: "rose",
    name: "Rosa",
    className: "bg-rose-500",
  },
] as const;

export default function SettingPage() {
  const { user } = useUser();

  const [name, setName] = useState(user?.name ?? "");
  const [school, setSchool] = useState(user?.school ?? "");
  const [type, setType] = useState<UserType>(
    (user?.type as UserType) ?? "studente",
  );

  const [theme, setTheme] = useState<Theme>("system");
  const [palette, setPalette] = useState<Palette>("indigo");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSaveProfile = () => {
    console.log("Salvataggio profilo:", {
      name,
      school,
      type,
    });

    // TODO:
    // aggiornare il profilo tramite UserContext
  };

  const handleDeleteProfile = () => {
    console.log("Eliminazione profilo");

    // TODO:
    // eliminare utente dal database
  };

  return (
    <main className="h-full min-h-0 overflow-y-auto bg-gray-50 dark:bg-[#181818]">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-[#aaaaaa] dark:hover:bg-[#252525] dark:hover:text-[#eeeeee]"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna indietro
      </button>
      <div className="mx-auto w-full max-w-4xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#eeeeee]">
            Impostazioni
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-[#888888]">
            Personalizza il tuo profilo e l'aspetto di StuPaper.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* ================= PROFILE ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#303030] dark:bg-[#202020]">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-[#303030]">
              <h2 className="text-base font-semibold text-gray-900 dark:text-[#eeeeee]">
                Profilo
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#888888]">
                Modifica le informazioni del tuo profilo.
              </p>
            </div>

            <div className="flex flex-col gap-5 p-6">
              {/* Nome */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-[#cccccc]"
                >
                  Nome
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#383838] dark:bg-[#181818] dark:text-[#eeeeee] dark:focus:border-[#4daafc] dark:focus:ring-[#4daafc]/20"
                />
              </div>

              {/* Scuola */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="school"
                  className="text-sm font-medium text-gray-700 dark:text-[#cccccc]"
                >
                  Scuola o istituzione
                </label>

                <input
                  id="school"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#383838] dark:bg-[#181818] dark:text-[#eeeeee] dark:focus:border-[#4daafc] dark:focus:ring-[#4daafc]/20"
                />
              </div>

              {/* Tipo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="type"
                  className="text-sm font-medium text-gray-700 dark:text-[#cccccc]"
                >
                  Tipo di profilo
                </label>

                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as UserType)}
                  className="h-11 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-[#383838] dark:bg-[#181818] dark:text-[#eeeeee] dark:focus:border-[#4daafc] dark:focus:ring-[#4daafc]/20"
                >
                  <option value="studente">Studente</option>
                  <option value="docente">Docente</option>
                  <option value="personale">Personale</option>
                </select>
              </div>

              {/* Salva */}
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="h-10 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-[#4daafc] dark:text-[#111111] dark:hover:bg-[#3b9de8]"
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </section>

          {/* ================= APPEARANCE ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#303030] dark:bg-[#202020]">
            <div className="border-b border-gray-200 px-6 py-5 dark:border-[#303030]">
              <h2 className="text-base font-semibold text-gray-900 dark:text-[#eeeeee]">
                Aspetto
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#888888]">
                Personalizza l'aspetto dell'applicazione.
              </p>
            </div>

            <div className="flex flex-col gap-7 p-6">
              {/* Tema */}
              <div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-[#dddddd]">
                  Tema
                </h3>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {/* Sistema */}
                  <button
                    type="button"
                    onClick={() => setTheme("system")}
                    className={`rounded-xl border p-4 text-left transition ${
                      theme === "system"
                        ? "border-indigo-500 bg-indigo-50 dark:border-[#4daafc] dark:bg-[#1d2935]"
                        : "border-gray-200 hover:bg-gray-50 dark:border-[#383838] dark:hover:bg-[#181818]"
                    }`}
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-200 text-gray-700 dark:bg-[#303030] dark:text-gray-300">
                      ◐
                    </div>

                    <p className="text-sm font-medium text-gray-900 dark:text-[#eeeeee]">
                      Sistema
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-[#777777]">
                      Segue il sistema
                    </p>
                  </button>

                  {/* Chiaro */}
                  <button
                    type="button"
                    onClick={() => setTheme("light")}
                    className={`rounded-xl border p-4 text-left transition ${
                      theme === "light"
                        ? "border-indigo-500 bg-indigo-50 dark:border-[#4daafc] dark:bg-[#1d2935]"
                        : "border-gray-200 hover:bg-gray-50 dark:border-[#383838] dark:hover:bg-[#181818]"
                    }`}
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                      ☀
                    </div>

                    <p className="text-sm font-medium text-gray-900 dark:text-[#eeeeee]">
                      Chiaro
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-[#777777]">
                      Sempre chiaro
                    </p>
                  </button>

                  {/* Scuro */}
                  <button
                    type="button"
                    onClick={() => setTheme("dark")}
                    className={`rounded-xl border p-4 text-left transition ${
                      theme === "dark"
                        ? "border-indigo-500 bg-indigo-50 dark:border-[#4daafc] dark:bg-[#1d2935]"
                        : "border-gray-200 hover:bg-gray-50 dark:border-[#383838] dark:hover:bg-[#181818]"
                    }`}
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#202020] text-gray-200">
                      ☾
                    </div>

                    <p className="text-sm font-medium text-gray-900 dark:text-[#eeeeee]">
                      Scuro
                    </p>

                    <p className="mt-1 text-xs text-gray-500 dark:text-[#777777]">
                      Sempre scuro
                    </p>
                  </button>
                </div>
              </div>

              {/* Palette */}
              <div>
                <h3 className="text-sm font-medium text-gray-800 dark:text-[#dddddd]">
                  Colore principale
                </h3>

                <p className="mt-1 text-xs text-gray-500 dark:text-[#777777]">
                  Scegli il colore principale dell'interfaccia.
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  {palettes.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPalette(item.id as Palette)}
                      title={item.name}
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                        palette === item.id
                          ? "ring-2 ring-gray-900 ring-offset-2 dark:ring-white dark:ring-offset-[#202020]"
                          : ""
                      }`}
                    >
                      <span
                        className={`h-8 w-8 rounded-full ${item.className}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= DANGER ZONE ================= */}

          <section className="rounded-2xl border border-red-200 bg-white shadow-sm dark:border-red-900/40 dark:bg-[#202020]">
            <div className="border-b border-red-100 px-6 py-5 dark:border-red-900/30">
              <h2 className="text-base font-semibold text-red-600 dark:text-red-400">
                Zona pericolosa
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-[#888888]">
                Azioni che possono modificare o eliminare definitivamente il tuo
                profilo.
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 p-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-[#eeeeee]">
                  Elimina profilo
                </h3>

                <p className="mt-1 max-w-xl text-xs leading-relaxed text-gray-500 dark:text-[#777777]">
                  Elimina il tuo profilo locale e tutti i dati associati. Questa
                  operazione non può essere annullata.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="shrink-0 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
              >
                Elimina profilo
              </button>
            </div>
          </section>

          {/* ================= APP INFO ================= */}

          <section className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-[#303030] dark:bg-[#202020]">
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <h2 className="text-sm font-semibold text-gray-900 dark:text-[#eeeeee]">
                  StuPaper
                </h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-[#777777]">
                  Il tuo spazio per lo studio
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-[#303030] dark:text-[#888888]">
                Versione 1.0.0
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* ================= DELETE MODAL ================= */}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-[#383838] dark:bg-[#202020]">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#eeeeee]">
              Eliminare il profilo?
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-[#888888]">
              Questa operazione eliminerà il profilo locale e i dati associati.
              Non potrai annullare questa operazione.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-[#383838] dark:text-[#cccccc] dark:hover:bg-[#181818]"
              >
                Annulla
              </button>

              <button
                type="button"
                onClick={handleDeleteProfile}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Elimina definitivamente
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
