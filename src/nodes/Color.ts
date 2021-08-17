import { EditorState } from "prosemirror-state";
import toggleBlockType from "../commands/toggleBlockType";
import Node from "./Node";

export default class Color extends Node {
  get name() {
    return "color";
  }

  get schema() {
    return {
      attrs: {
        bg: {
          default: ''
        }
      },
      inline: true,
      content: "text*",
      marks: "",
      group: "inline",
      selectable: true,
      draggable: true,
      parseDOM: [
        {
          tag: "span.colorify",
        },
      ],
      toDOM: node => {
        console.log(node)
        return [
          "span",
          {
            class: 'colorify',
            style: `background-color: ${node.attrs.bg}`,
          },
          0
        ];
      },
    };
  }

  toMarkdown(state, node) {
    state.write(`{${node.attrs.bg}}(`);
    state.renderContent(node);
    state.write(`)`)
  }

  commands({ type, schema }) {
    return attrs => (state: EditorState, dispatch) => {
      const { selection } = state;
      const from = selection.$from.pos;
      const to = selection.$to.pos;
      const content = state.doc.slice(from, to)
      // const text = schema.nodes.text.create("div")
      // state.schema.text("div")
      const node = type.create({ ...attrs, bg: 'red' }, content.content);
      const transaction = state.tr.replaceSelectionWith(node);
      dispatch(transaction);
      return true;
    };
  }

  parseMarkdown() {
    return {
      block: "color",
      getAttrs: tok => {
        const bg = tok.attrs[0][1].split(" ")[1]
        return {
          bg: bg.split("--")[1]
        }
      },
    };
  }
}
