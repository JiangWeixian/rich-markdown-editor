import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ItalicIcon,
  BlockQuoteIcon,
  LinkIcon,
  StrikethroughIcon,
  InputIcon,
  HighlightIcon,
} from "outline-icons";
import React from "react";
import { isInTable } from "prosemirror-tables";
import { EditorState } from "prosemirror-state";
import { isCellSelection } from "prosemirror-utils";
import isInList from "../queries/isInList";
import isMarkActive from "../queries/isMarkActive";
import isNodeActive from "../queries/isNodeActive";
import getCellCount from "../queries/getCellCount";
import { MenuItem } from "../types";
import baseDictionary from "../dictionary";
import { MergeCell } from "../components/Icons/MergeCell";
import { SplitCell } from "../components/Icons/SplitCell";
import { ColorifyItem } from "../components/Colorify";

export default function formattingMenuItems(
  state: EditorState,
  isTemplate: boolean,
  dictionary: typeof baseDictionary
): MenuItem[] {
  const { schema } = state;
  const isTable = isInTable(state);
  const isList = isInList(state);
  const isSingle =
    isCellSelection(state.selection) && getCellCount(state).total === 1;
  const allowBlocks = !isTable && !isList;

  return [
    {
      name: "placeholder",
      tooltip: dictionary.placeholder,
      icon: InputIcon,
      active: isMarkActive(schema.marks.placeholder),
      visible: isTemplate,
    },
    {
      name: "separator",
      visible: isTemplate,
    },
    {
      name: "strong",
      tooltip: dictionary.strong,
      icon: BoldIcon,
      active: isMarkActive(schema.marks.strong),
    },
    {
      name: "em",
      tooltip: dictionary.em,
      icon: ItalicIcon,
      active: isMarkActive(schema.marks.em),
    },
    {
      name: "strikethrough",
      tooltip: dictionary.strikethrough,
      icon: StrikethroughIcon,
      active: isMarkActive(schema.marks.strikethrough),
    },
    {
      name: "highlight",
      tooltip: dictionary.mark,
      icon: HighlightIcon,
      active: isMarkActive(schema.marks.color),
      visible: !isTemplate,
      items: [
        {
          name: "color",
          tooltip: "yellow",
          icon: () => <ColorifyItem className="yellow" />,
          attrs: { bg: "yellow" },
          active: isMarkActive(schema.marks.color),
          visible: !isTemplate,
        },
        {
          name: "color",
          tooltip: "red",
          icon: () => <ColorifyItem className="red" />,
          attrs: { bg: "red" },
          active: isMarkActive(schema.marks.color),
          visible: !isTemplate,
        },
        {
          name: "color",
          tooltip: "green",
          icon: () => <ColorifyItem className="green" />,
          attrs: { bg: "green" },
          active: isMarkActive(schema.marks.color),
          visible: !isTemplate,
        },
      ],
    },
    {
      name: "code_inline",
      tooltip: dictionary.codeInline,
      icon: CodeIcon,
      active: isMarkActive(schema.marks.code_inline),
    },
    {
      name: "separator",
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.heading,
      icon: Heading1Icon,
      active: isNodeActive(schema.nodes.heading, { level: 1 }),
      attrs: { level: 1 },
      visible: allowBlocks,
    },
    {
      name: "heading",
      tooltip: dictionary.subheading,
      icon: Heading2Icon,
      active: isNodeActive(schema.nodes.heading, { level: 2 }),
      attrs: { level: 2 },
      visible: allowBlocks,
    },
    {
      name: "blockquote",
      tooltip: dictionary.quote,
      icon: BlockQuoteIcon,
      active: isNodeActive(schema.nodes.blockquote),
      attrs: { level: 2 },
      visible: allowBlocks,
    },
    {
      name: "mergeCells",
      tooltip: dictionary.deleteColumn,
      icon: MergeCell,
      active: () => isCellSelection(state.selection),
      visible: isTable,
    },
    {
      name: "splitCell",
      tooltip: dictionary.deleteColumn,
      icon: SplitCell,
      active: () => {
        return isCellSelection(state.selection);
      },
      visible: isSingle,
    },
    {
      name: "separator",
    },
    {
      name: "link",
      tooltip: dictionary.createLink,
      icon: LinkIcon,
      active: isMarkActive(schema.marks.link),
      attrs: { href: "" },
    },
  ];
}
