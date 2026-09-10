/**
 * Utility per gestire in modo coerente il colore associato a un corso.
 *
 * In precedenza `course.color` veniva talvolta salvato come coppia di
 * classi Tailwind (es. "bg-indigo-100 text-indigo-700") e talvolta come
 * hex (es. "#6366f1", prodotto dal color picker del form "Nuovo corso").
 * I componenti applicavano il valore direttamente come
 * `style={{ backgroundColor: color }}`, che è un CSS non valido per le
 * classi Tailwind: il browser lo ignora silenziosamente e il badge resta
 * senza colore. Questo file normalizza tutto su un solo formato (hex) e
 * calcola automaticamente un testo leggibile sopra qualsiasi sfondo.
 */

const FALLBACK_COLOR = "#6366f1"; // indigo-500

const TAILWIND_COLOR_MAP: Record<string, string> = {
  indigo: "#6366f1",
  sky: "#0ea5e9",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  teal: "#14b8a6",
  fuchsia: "#d946ef",
  slate: "#64748b",
};

/** Converte qualsiasi valore storico ("bg-x-100 text-x-700" oppure "#hex") in un hex valido. */
export function normalizeCourseColor(rawColor?: string | null): string {
  if (!rawColor) return FALLBACK_COLOR;

  const trimmed = rawColor.trim();

  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  const match = trimmed.match(/bg-(\w+)-\d+/);
  if (match && TAILWIND_COLOR_MAP[match[1]]) {
    return TAILWIND_COLOR_MAP[match[1]];
  }

  return FALLBACK_COLOR;
}

/** Restituisce nero o bianco a seconda della luminanza dello sfondo, per garantire contrasto leggibile. */
export function getReadableTextColor(hex: string): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return "#111827";

  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  // Luminanza relativa (WCAG)
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 0.6 ? "#111827" : "#ffffff";
}

/** Sfondo tenue (10% di opacità) + testo pieno dello stesso colore: usato per badge/etichette. */
export function getTintedBadgeStyle(rawColor?: string | null) {
  const hex = normalizeCourseColor(rawColor);
  return {
    backgroundColor: `${hex}1a`, // ~10% opacity
    color: hex,
  };
}

/** Sfondo pieno + testo a contrasto automatico: usato per icone/avatar dei corsi. */
export function getSolidBadgeStyle(rawColor?: string | null) {
  const hex = normalizeCourseColor(rawColor);
  return {
    backgroundColor: hex,
    color: getReadableTextColor(hex),
  };
}