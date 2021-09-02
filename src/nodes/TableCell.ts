import { DecorationSet, Decoration } from "prosemirror-view";
import { Plugin } from "prosemirror-state";
import {
  isTableSelected,
  isRowSelected,
  getCellsInColumn,
} from "prosemirror-utils";
import Node from "./Node";

export default class TableCell extends Node {
  get name() {
    return "td";
  }

  get schema() {
    return {
      content: "paragraph+",
      tableRole: "cell",
      isolating: true,
      parseDOM: [{ tag: "td" }],
      toDOM(node) {
        const attrs = Object.assign(
          {},
          node.attrs.alignment
            ? { style: `text-align: ${node.attrs.alignment}` }
            : {},
          node.attrs.colspan > 1 ? { colspan: node.attrs.colspan } : {},
          node.attrs.rowspan > 1 ? { rowspan: node.attrs.rowspan } : {}
        );
        return ["td", attrs, 0];
      },
      attrs: {
        colspan: { default: 1 },
        rowspan: { default: 1 },
        alignment: { default: null },
      },
    };
  }

  toMarkdown() {
    // see: renderTable
  }

  parseMarkdown() {
    return {
      block: "td",
      getAttrs: tok => {
        return {
          alignment: tok.info,
          colspan: tok.meta?.colspan,
          rowspan: tok.meta?.rowspan,
        };
      },
    };
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          decorations: state => {
            const { doc, selection } = state;
            const decorations: Decoration[] = [];
            const cells = getCellsInColumn(0)(selection);

            const offset: number[] = [];

            if (cells) {
              cells.forEach(({ pos, node }, index) => {
                offset.push(node.attrs.rowspan - 1);
                if (index === 0) {
                  decorations.push(
                    Decoration.widget(pos + 1, () => {
                      let className = "grip-table";
                      const selected = isTableSelected(selection);
                      if (selected) {
                        className += " selected";
                      }
                      const grip = document.createElement("a");
                      grip.className = className;
                      grip.addEventListener("mousedown", event => {
                        event.preventDefault();
                        this.options.onSelectTable(state);
                      });
                      return grip;
                    })
                  );
                }
                decorations.push(
                  Decoration.widget(pos + 1, () => {
                    const i =
                      index +
                      offset.slice(0, index).reduce((acc, cur) => acc + cur, 0);
                    const rowSelected = isRowSelected(i)(selection);

                    let className = "grip-row";
                    if (rowSelected) {
                      className += " selected";
                    }
                    if (i === 0) {
                      className += " first";
                    } else if (i === cells.length - 1) {
                      className += " last";
                    }
                    const grip = document.createElement("a");
                    grip.className = className;
                    grip.addEventListener("mousedown", event => {
                      event.preventDefault();
                      this.options.onSelectRow(i, state);
                    });
                    return grip;
                  })
                );
              });
            }

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  }
}
