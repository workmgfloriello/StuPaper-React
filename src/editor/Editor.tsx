"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Mathematics from "@tiptap/extension-mathematics";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import { createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";

import TopBar from "./components/TopBar";
import SaveBar from "./components/SaveBar";
import CustomShortCut from "./extension/CustomShortcut";
import MathPanel from "./components/MathPanel";
import CustomBlockquote from "./extension/CustomBlockquote";
import { useEffect, useRef, useState, type ReactNode } from "react";

const lowlight = createLowlight({
  javascript,
  typescript,
  html,
  css,
  java,
  cpp,
});

interface EditorProps {
  /** Contenuto iniziale (HTML) */
  content?: string;
  /** Callback invocata ad ogni modifica, restituisce l'HTML aggiornato */
  onChange?: (html: string) => void;
  /** Testo placeholder quando l'editor è vuoto */
  placeholder?: string;
  /** Disabilita la modifica */
  editable?: boolean;
}

/**
 * Wrapper che anima l'ingresso del suo contenuto (fade + piccolo slide).
 * Va usato con una `key` diversa per ogni "vista" della toolbar, così che
 * React lo rimonti da zero e l'animazione riparta ad ogni cambio.
 */
function ToolbarFade({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`transition-all duration-200 ease-out ${
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "-translate-y-1 scale-95 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function Editor({
  content = "",
  onChange,
  placeholder = "Inizia a scrivere...",
  editable = true,
}: EditorProps) {
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: false,
        underline: false,
        codeBlock: false,
        horizontalRule: false,
        blockquote: false,
      }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-indigo-600 underline underline-offset-2 cursor-pointer",
        },
      }),
      Placeholder.configure({ placeholder }),
      CodeBlockLowlight.configure({
        lowlight,
        enableTabIndentation: true,
        tabSize: 2,
      }),
      HorizontalRule,
      TaskList,
      TaskItem.configure({
        nested: false,
      }),
      Mathematics,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,

      //CUSTOM EXTENDS
      CustomBlockquote,
      CustomShortCut.configure({
        onMathBlock: () => {
          setShowMathPanel(true);
        },
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "max-w-none min-h-[300px] px-4 py-3 focus:outline-none ",
      },
    },
  });

  const [showMathPanel, setShowMathPanel] = useState(false);

  const handleMathInsert = (latex: string) => {
    editor
      ?.chain()
      .focus()
      .insertContent({
        inline: true,
        type: "inlineMath",
        attrs: { latex },
      })
      .run();

    // Formula inserita: si torna alla topbar classica
    setShowMathPanel(false);
  };

  const handleMathClick = () => {
    setShowMathPanel(true);
  };

  const handleMathClose = () => {
    setShowMathPanel(false);
    editor?.chain().focus().run();
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-gray-200">
      {/* TOOLBAR */}
      <div className="mt-2 flex flex-col items-center relative z-50">
        <div className="flex items-center justify-center gap-5 align-middle">
          {showMathPanel ? (
            <ToolbarFade key="math">
              {editor && (
                <MathPanel
                  onInsert={handleMathInsert}
                  onClose={handleMathClose}
                />
              )}
            </ToolbarFade>
          ) : (
            <ToolbarFade key="classic">
              <TopBar editor={editor} onMathClick={handleMathClick} />
            </ToolbarFade>
          )}
          <SaveBar editor={editor} />
        </div>
      </div>

      {/* EDITOR */}
      <div className="mx-auto mt-5 w-198.5 flex-1 overflow-y-auto rounded-t-lg border border-gray-200 bg-white h-auto relative z-10">
        <EditorContent editor={editor} />
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-3 py-1 text-xs text-gray-500">
        <span>
          Informatica 4.0 - Progetto di Tecnologie Web e Mobile - A.A. 2023/2024
        </span>

        <span>04/09/2026</span>
      </div>
    </div>
  );
}
