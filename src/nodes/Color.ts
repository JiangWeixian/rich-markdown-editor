import { EditorState, TextSelection } from "prosemirror-state";
import { replaceSelectedNode, replaceParentNodeOfType, findParentNodeOfType } from "prosemirror-utils";
import toggleBlockType from "../commands/toggleBlockType";
import isNodeActive from "../queries/isNodeActive";
import Node from "./Node";

function isInColor(state) {
  const $head = state.selection.$head;
  for (let d = $head.depth; d > 0; d--) {
    console.log($head.node(d))
    if (
      ["color"].includes(
        $head.node(d).type.name
      )
    ) {
      return true;
    }
  }

  return false;
}


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
      console.log(content, isInColor(state))
      if (!isNodeActive(schema.nodes.color)(state)) {
        const node = type.create({ ...attrs, bg: 'red' }, content.content);
        const transaction = state.tr.replaceSelectionWith(node);
        dispatch(transaction);
        return true;
      } else {
        if (isInColor(state)) {
          const node = findParentNodeOfType(schema.nodes.color)(state.selection)
          const transaction = replaceParentNodeOfType(
            schema.nodes.color,
            node?.node.content
          )(state.tr); 
          // state.tr.replaceSelectionWith(node) //state.tr.replaceSelection(content);
          dispatch(transaction);
          return true;
        } else {
          // TODO: maybe not need this one
          const innode = type.create({ ...attrs, bg: 'red' }, content.content);
          const intransaction = state.tr.replaceSelectionWith(innode);
          dispatch(intransaction);
          return true;
        }
      }
      // dispatch(
      //   state.tr.setSelection(TextSelection.near(state.doc.resolve(1)))
      // );
      // state.schema.text("div")
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
