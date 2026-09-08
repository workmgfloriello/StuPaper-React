import { Extension, InputRule } from "@tiptap/core";

interface CustomShortcutOptions {
  onMathBlock?: () => void;
}

export default Extension.create<CustomShortcutOptions>({
  name: "customShortcut",

  addOptions() {
    return {
      onMathBlock: undefined,
    };
  },

  addInputRules() {
    const headingType = this.editor.schema.nodes.heading;

    if (!headingType) {
      return [];
    }

    return [
      //h[NUmero] per creare un heading di livello [Numero]
      new InputRule({
        find: /\/\/h([1-3])\s$/,
        handler: ({ state, range, match, chain }) => {
          const level = parseInt(match[1], 10);

          chain().deleteRange(range).setNode("heading", { level }).run();
        },
      }),

      //code-[linguaggio] per creare un blocco di codice
      new InputRule({
        find: /\/\/code\s$/,
        handler: ({ state, range, match, chain }) => {
          const codeBLockType = this.editor.schema.nodes.codeBlock;

          if (!codeBLockType) return;

          chain().deleteRange(range).setNode("codeBlock").run();
        },
      }),

      //hr per creare una regola orizzontale
      new InputRule({
        find: /\/\/hr\s$/,
        handler: ({ state, range, match, chain }) => {
          chain().deleteRange(range).setHorizontalRule().run();
        },
      }),

      //def | warn | example | quote  per creare un blockquote di tipo definizione
      new InputRule({
        find: /\/\/(quote|def|warn|example)\s$/,
        handler: ({ state, range, match, chain }) => {
          const quoteTypeDigit = match[1].toLowerCase();

          let quoteType;
          switch (quoteTypeDigit) {
            case "def":
              quoteType = "definition";
              break;
            case "warn":
              quoteType = "warning";
              break;
            case "example":
              quoteType = "example";
              break;
            case "quote":
              quoteType = "default";
              break;
            default:
              quoteType = "default";
          }

          chain()
            .deleteRange(range)
            .setBlockquote()
            .updateAttributes("blockquote", { type: quoteType })
            .run();
        },
      }),

      //todo per creare un task list
      new InputRule({
        find: /\/\/todo\s$/,
        handler: ({ state, range, match, chain }) => {
          const taskListType = this.editor.schema.nodes.taskList;
          const taskItemType = this.editor.schema.nodes.taskItem;

          if (!taskListType || !taskItemType) return;

          chain().deleteRange(range).toggleTaskList().run();
        },
      }),

      //ul | li per creare una lista non ordinata
      new InputRule({
        find: /\/\/(ul|li)\s$/,
        handler: ({ state, range, match, chain }) => {
          const bulletListType = this.editor.schema.nodes.bulletList;
          const listItemType = this.editor.schema.nodes.listItem;
          const listType = match[1].toLowerCase();

          let listTypeToUse;
          switch (listType) {
            case "ul":
              listTypeToUse = bulletListType;
              break;
            case "li":
              listTypeToUse = listItemType;
              break;
            default:
              listTypeToUse = bulletListType;
          }

          if (!bulletListType || !listItemType) return;

          if (listTypeToUse === bulletListType) {
            chain().deleteRange(range).toggleBulletList().run();
          } else if (listTypeToUse === listItemType) {
            chain().deleteRange(range).toggleOrderedList().run();
          }
        },
      }),

      //math per creare il blocco di matematica
      new InputRule({
        find: /\/\/math\s$/,
        handler: ({ state, range, chain }) => {
          const mathBlockType = state.schema.nodes.inlineMath;

          console.log("mathBlockType:", mathBlockType);

          if (!mathBlockType) {
            console.error("Nodo mathBlock non presente nello schema");
            return;
          }

          chain()
            .deleteRange(range)
            .insertContentAt(range.from, {
              type: "inlineMath",
            })
            .run();
          this.options.onMathBlock?.();
        },
      }),

      new InputRule({
        find: /\/\/table-(\d+)-(\d+)\s$/,

        handler: ({ state, range, chain, match })=>{
          const righe = parseInt(match[1], 10);
          const colonne = parseInt(match[2], 10);

          chain()
            .deleteRange(range)
            .insertTable({ rows: righe, cols: colonne, withHeaderRow: true })
            .run();
        },
      }),
    ];
  },
});
