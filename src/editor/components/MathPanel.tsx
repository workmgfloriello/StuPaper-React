"use client";

import { useEffect, useRef, useState } from "react";
import type { MathfieldElement } from "mathlive";

// Dichiarazione TypeScript per poter usare <math-field> come tag JSX
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "math-field": React.DetailedHTMLProps<
          React.HTMLAttributes<MathfieldElement> & {
            virtualKeyboardMode?: "on" | "off" | "auto" | string;
          },
          MathfieldElement
        >;
      }
    }
  }
}

interface MathPanelProps {
  onInsert: (latex: string) => void;
  onClose: () => void;
}

interface MathButton {
  label: string;
  value: string;
}

interface MathCategory {
  title: string;
  buttons: MathButton[];
}

const mathCategories: MathCategory[] = [
  {
    title: "Base",
    buttons: [
      { label: "+", value: "+" },
      { label: "−", value: "-" },
      { label: "×", value: "\\times" },
      { label: "÷", value: "\\div" },
      { label: "=", value: "=" },
      { label: "≠", value: "\\neq" },
      { label: "±", value: "\\pm" },
      { label: "≤", value: "\\leq" },
      { label: "≥", value: "\\geq" },
      { label: "<", value: "<" },
      { label: ">", value: ">" },
      { label: "≈", value: "\\approx" },
    ],
  },
  {
    title: "Potenze e radici",
    buttons: [
      { label: "x²", value: "^{}" },
      { label: "xⁿ", value: "^{}" },
      { label: "x₂", value: "_{}" },
      { label: "xₙ", value: "_{}" },
      { label: "√x", value: "\\sqrt{}" },
      { label: "∛x", value: "\\sqrt[3]{}" },
      { label: "ⁿ√x", value: "\\sqrt[n]{}" },
      { label: "eˣ", value: "e^{}" },
      { label: "10ˣ", value: "10^{}" },
      { label: "|x|", value: "|x|" },
    ],
  },
  {
    title: "Frazioni",
    buttons: [
      { label: "a / b", value: "\\frac{}{}" },
      { label: "½", value: "\\frac{1}{2}" },
      { label: "⅓", value: "\\frac{1}{3}" },
      { label: "¼", value: "\\frac{1}{4}" },
      { label: "x/y", value: "\\frac{x}{y}" },
      { label: "a+b / c", value: "\\frac{a+b}{c}" },
    ],
  },
  {
    title: "Greche",
    buttons: [
      { label: "α", value: "\\alpha" },
      { label: "β", value: "\\beta" },
      { label: "γ", value: "\\gamma" },
      { label: "δ", value: "\\delta" },
      { label: "ε", value: "\\epsilon" },
      { label: "θ", value: "\\theta" },
      { label: "λ", value: "\\lambda" },
      { label: "μ", value: "\\mu" },
      { label: "π", value: "\\pi" },
      { label: "ρ", value: "\\rho" },
      { label: "σ", value: "\\sigma" },
      { label: "φ", value: "\\phi" },
      { label: "ω", value: "\\omega" },
      { label: "Δ", value: "\\Delta" },
      { label: "Σ", value: "\\Sigma" },
      { label: "Ω", value: "\\Omega" },
    ],
  },
  {
    title: "Calcolo",
    buttons: [
      { label: "∑", value: "\\sum_{i=1}^{n}" },
      { label: "∏", value: "\\prod_{i=1}^{n}" },
      { label: "∫", value: "\\int" },
      { label: "∫ₐᵇ", value: "\\int_{a}^{b}" },
      { label: "∮", value: "\\oint" },
      { label: "∂", value: "\\partial" },
      { label: "lim", value: "\\lim_{x\\to}" },
      { label: "∞", value: "\\infty" },
      { label: "d/dx", value: "\\frac{d}{dx}" },
      { label: "∇", value: "\\nabla" },
    ],
  },
  {
    title: "Insiemi e logica",
    buttons: [
      { label: "∈", value: "\\in" },
      { label: "∉", value: "\\notin" },
      { label: "⊂", value: "\\subset" },
      { label: "⊆", value: "\\subseteq" },
      { label: "⊃", value: "\\supset" },
      { label: "∪", value: "\\cup" },
      { label: "∩", value: "\\cap" },
      { label: "∅", value: "\\emptyset" },
      { label: "∀", value: "\\forall" },
      { label: "∃", value: "\\exists" },
      { label: "¬", value: "\\neg" },
      { label: "⇒", value: "\\Rightarrow" },
      { label: "⇔", value: "\\Leftrightarrow" },
    ],
  },
  {
    title: "Funzioni",
    buttons: [
      { label: "sin", value: "\\sin" },
      { label: "cos", value: "\\cos" },
      { label: "tan", value: "\\tan" },
      { label: "cot", value: "\\cot" },
      { label: "log", value: "\\log" },
      { label: "ln", value: "\\ln" },
      { label: "exp", value: "\\exp" },
      { label: "f(x)", value: "f(x)" },
    ],
  },
  {
    title: "Parentesi",
    buttons: [
      { label: "( )", value: "\\left(\\right)" },
      { label: "[ ]", value: "\\left[\\right]" },
      { label: "{ }", value: "\\left\\{\\right\\}" },
      { label: "⟨ ⟩", value: "\\langle\\rangle" },
      { label: "⌈x⌉", value: "\\lceil x \\rceil" },
      { label: "⌊x⌋", value: "\\lfloor x \\rfloor" },
    ],
  },
];

export default function MathPanel({ onInsert, onClose }: MathPanelProps) {
  const [activeCategory, setActiveCategory] = useState(mathCategories[0].title);
  const [latex, setLatex] = useState("");
  const [ready, setReady] = useState(false);
  const mfRef = useRef<MathfieldElement | null>(null);

  // Carica MathLive lato client, registra il custom element <math-field>
  // e disattiva i suoni di feedback (i file .wav non sono serviti da
  // Next.js di default, causavano 404 su ogni tasto premuto).
  useEffect(() => {
    let cancelled = false;
    import("mathlive").then(({ MathfieldElement: MFE }) => {
      if (cancelled) return;
      MFE.soundsDirectory = null;
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (ready) mfRef.current?.focus();
  }, [ready]);

  // ESC per chiudere e tornare alla topbar classica
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleInsert = () => {
    if (!latex.trim()) return;
    onInsert(latex);
    mfRef.current?.setValue("");
    setLatex("");
    // il pannello resta aperto: pronto per la formula successiva
    requestAnimationFrame(() => mfRef.current?.focus());
  };

  const clearLatex = () => {
    mfRef.current?.setValue("");
    setLatex("");
    mfRef.current?.focus();
  };

  // Inserisce un simbolo/struttura nel punto in cui si trova il cursore
  // (o intorno alla selezione, se c'è testo selezionato nel campo).
  // "placeholder" fa saltare automaticamente il cursore nel primo campo vuoto.
  const insertSymbol = (value: string) => {
    const mf = mfRef.current;
    if (!mf) return;

    // Il click sui pulsanti non deve far perdere la posizione del cursore.
    // Ripristiniamo il focus e inseriamo al frame successivo.
    mf.focus();
    requestAnimationFrame(() => {
      mf.insert(value, { selectionMode: "placeholder" });
      setLatex(mf.value);
    });
  };

  const currentButtons =
    mathCategories.find((c) => c.title === activeCategory)?.buttons ?? [];

  return (

      <><style>{`
        math-field::part(virtual-keyboard-toggle) {
          display: none !important;
        }
      `}</style><div className="flex w-full max-w-4xl flex-col gap-2 rounded-xl border border-indigo-100 bg-white p-2.5 shadow-sm">
              {/* RIGA 1: chiudi + categorie */}
              <div className="flex flex-wrap items-center gap-1.5">
                  <button
                      type="button"
                      onClick={onClose}
                      title="Chiudi formule (Esc)"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                  >
                      ×
                  </button>

                  <div className="h-5 w-px shrink-0 bg-gray-200" />

                  {mathCategories.map((category) => (
                      <button
                          key={category.title}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                              setActiveCategory(category.title);
                              requestAnimationFrame(() => {
                                  mfRef.current?.focus();
                              });
                          } }
                          className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition ${activeCategory === category.title
                                  ? "bg-indigo-600 text-white shadow-sm"
                                  : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700"}`}
                      >
                          {category.title}
                      </button>
                  ))}
              </div>

              {/* RIGA 2: simboli della categoria attiva */}
              <div className="flex flex-wrap gap-1.5 rounded-lg bg-gray-50 p-2">
                  {currentButtons.map((button) => (
                      <button
                          key={`${activeCategory}-${button.label}`}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()} // non ruba il focus dal campo math
                          onClick={() => insertSymbol(button.value)}
                          title={button.value}
                          className="flex h-8 min-w-8 items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
                      >
                          {button.label}
                      </button>
                  ))}
              </div>

              {/* RIGA 3: editor visuale — qui la formula si vede già "vera",
        niente più anteprima separata */}
              <div className="min-h-12 rounded-lg border border-gray-300 bg-white px-3 py-2 transition focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
                  {ready ? (
                      <math-field
                            ref = {(el) => {
                                mfRef.current = el;
                            }}
                          virtualKeyboardMode="off"
                          onInput={(e: React.FormEvent<MathfieldElement>) => setLatex((e.currentTarget as MathfieldElement).value)}
                          onKeyDown={(e: React.KeyboardEvent) => {
                              if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleInsert();
                              }
                          } }
                          style={{ display: "block", width: "100%", fontSize: "1.2rem", minHeight: "1.75rem" }} />
                  ) : (
                      <span className="text-xs text-gray-400">Caricamento editor formule…</span>
                  )}
              </div>

              {/* RIGA 4: azioni */}
              <div className="flex items-center justify-end gap-2">
                  <button
                      type="button"
                      onClick={clearLatex}
                      disabled={!latex}
                      title="Cancella"
                      className="shrink-0 rounded-md px-2 py-1.5 text-xs text-gray-400 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                      Cancella
                  </button>

                  <button
                      type="button"
                      onClick={handleInsert}
                      disabled={!latex.trim()}
                      className="shrink-0 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                      Inserisci
                  </button>
              </div>

              {/* SUGGERIMENTI RAPIDI */}
              <p className="px-0.5 text-[11px] text-gray-400">
                  Scrivi <span className="font-mono">1/2</span> o <span className="font-mono">x^2</span>{" "}
                  direttamente: diventano frazione/esponente veri, come a Word ·{" "}
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1">Tab</kbd> campo successivo ·{" "}
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1">↑↓←→</kbd> naviga ·{" "}
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1">Invio</kbd> inserisce (resti qui) ·{" "}
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1">Esc</kbd> chiudi
              </p>
          </div></>
  );
}