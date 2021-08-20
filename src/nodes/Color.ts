import { toggleMark } from "prosemirror-commands";
import { EditorState } from "prosemirror-state";
import {
  replaceParentNodeOfType,
  findParentNodeOfType,
  setParentNodeMarkup,
} from "prosemirror-utils";
import Mark from "../marks/Mark";
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
      return $head.node(d);
    }
  }

  return null;
}


export default class Color extends Mark {
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
      content: "inline+",
      marks: "",
      group: "inline",
      selectable: true,
      parseDOM: [
        {
          tag: "span.colorify",
        },
      ],
      toDOM: node => {
        console.log('toDom', node)
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
      const colorNode = isInColor(state)
      console.log(colorNode)
      if (!isNodeActive(schema.nodes.color)(state)) {
      
        return toggleMark(type, attrs)(state, dispatch)
        // const node = type.create(attrs, content.content);
        // const transaction = state.tr.replaceSelectionWith(node);
        // dispatch(transaction);
        // return true;
      } else {
        const colorNode = isInColor(state)
        if (colorNode) {
          // const node = findParentNodeOfType(schema.nodes.color)(state.selection)
          // const transaction = replaceParentNodeOfType(
          //   schema.nodes.color,
          //   node?.node.content
          // )(state.tr); 
          // // state.tr.replaceSelectionWith(node) //state.tr.replaceSelection(content);
          // dispatch(transaction);
          // return true;
          // console.log(selection.from, colorNode)
          // const transaction = state.tr.setNodeMarkup(
          //   selection.from,
          //   type,
          //   { bg: "yellow" }
          // );
          // dispatch(transaction);
          const transaction = setParentNodeMarkup(schema.nodes.color, type, { bg: "yellow" })(state.tr)
          dispatch(transaction);
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
      mark: "color",
      getAttrs: tok => {
        const bg = tok.attrs[0][1].split(" ")[1]
        return {
          bg: bg.split("--")[1]
        }
      },
    };
  }
}
