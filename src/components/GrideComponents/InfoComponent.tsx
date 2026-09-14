import { useEffect, useState } from "react";

export function InfoComponent() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const date = time.toLocaleDateString("it-IT", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const hour = time.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="
        h-full w-full overflow-hidden rounded-2xl
        border border-slate-200
        bg-white
        p-4
        text-slate-900
        shadow-sm
        transition-colors

        dark:border-slate-800
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="
              text-[10px] font-semibold uppercase tracking-widest
              text-slate-400
              dark:text-slate-500
            "
          >
            Informazioni
          </p>

          <p
            className="
              mt-1 text-sm capitalize
              text-slate-600
              dark:text-slate-300
            "
          >
            {date}
          </p>
        </div>

        <div
          className="
            flex h-9 w-9 items-center justify-center
            rounded-xl
            bg-slate-100
            text-lg
            dark:bg-slate-900
          "
        >
          ℹ️
        </div>
      </div>

      {/* Ora */}
      <div className="mt-5">
        <p className="text-4xl font-bold tracking-tight">
          {hour}
        </p>

        <p
          className="
            mt-1 text-xs
            text-slate-400
            dark:text-slate-500
          "
        >
          Ora locale
        </p>
      </div>

      {/* Meteo */}
      <div
        className="
          mt-5 flex items-center justify-between
          rounded-xl
          border border-slate-100
          bg-slate-50
          p-3
          dark:border-slate-800
          dark:bg-slate-900
        "
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">☀️</span>

          <div>
            <p className="text-lg font-semibold">
              24°C
            </p>

            <p
              className="
                text-xs
                text-slate-500
                dark:text-slate-400
              "
            >
              Sereno
            </p>
          </div>
        </div>

        <div className="text-right">
          <p
            className="
              text-xs font-medium
              text-slate-600
              dark:text-slate-300
            "
          >
            Bitonto
          </p>

          <p
            className="
              text-[11px]
              text-slate-400
              dark:text-slate-500
            "
          >
            Italia
          </p>
        </div>
      </div>

      {/* Extra info */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div
          className="
            rounded-xl
            bg-slate-50
            p-3
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-[9px] font-semibold uppercase tracking-wider
              text-slate-400
              dark:text-slate-500
            "
          >
            Umidità
          </p>

          <p className="mt-1 text-sm font-semibold">
            58%
          </p>
        </div>

        <div
          className="
            rounded-xl
            bg-slate-50
            p-3
            dark:bg-slate-900
          "
        >
          <p
            className="
              text-[9px] font-semibold uppercase tracking-wider
              text-slate-400
              dark:text-slate-500
            "
          >
            Vento
          </p>

          <p className="mt-1 text-sm font-semibold">
            12 km/h
          </p>
        </div>
      </div>
    </div>
  );
}

