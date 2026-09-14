import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "system" | "light" | "dark";

export type PaletteColor =
  | "color1"
  | "color2"
  | "color3"
  | "color4"
  | "color5"
  | "color6"
  | "color7"
  | "color8"
  | "color9"
  | "color10"
  | "color11"
  | "color12";

export type Palette = Record<PaletteColor, string>;

export const defaultPalette: Palette = {
  color1: "#6366f1",
  color2: "#3b82f6",
  color3: "#8b5cf6",
  color4: "#10b981",
  color5: "#f59e0b",
  color6: "#f97316",
  color7: "#ef4444",
  color8: "#ec4899",
  color9: "#14b8a6",
  color10: "#06b6d4",
  color11: "#64748b",
  color12: "#a855f7",
};

interface ThemeContextType {
  theme: Theme;
  palette: Palette;

  setTheme: (theme: Theme) => void;

  updatePaletteColor: (
    color: PaletteColor,
    value: string,
  ) => void;

  resetPalette: () => void;

  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      return savedTheme;
    }

    return "system";
  });

  const [palette, setPalette] = useState<Palette>(() => {
    try {
      const savedPalette = localStorage.getItem("palette");

      if (savedPalette) {
        return {
          ...defaultPalette,
          ...JSON.parse(savedPalette),
        };
      }
    } catch (error) {
      console.error(
        "Errore caricamento palette:",
        error,
      );
    }

    return defaultPalette;
  });

  /* =========================
     THEME
  ========================= */

  useEffect(() => {
    localStorage.setItem("theme", theme);

    const root = document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const isDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      root.classList.add(isDark ? "dark" : "light");

      return;
    }

    root.classList.add(theme);
  }, [theme]);

  /* =========================
     PALETTE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "palette",
      JSON.stringify(palette),
    );

    const root = document.documentElement;

    Object.entries(palette).forEach(
      ([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      },
    );
  }, [palette]);

  function setTheme(theme: Theme) {
    setThemeState(theme);
  }

  function updatePaletteColor(
    color: PaletteColor,
    value: string,
  ) {
    setPalette((current) => ({
      ...current,
      [color]: value,
    }));
  }

  function resetPalette() {
    setPalette(defaultPalette);
  }

  function toggleTheme() {
    setThemeState((current) => {
      if (current === "light") {
        return "dark";
      }

      return "light";
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        palette,
        setTheme,
        updatePaletteColor,
        resetPalette,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme deve essere usato dentro ThemeProvider",
    );
  }

  return context;
}