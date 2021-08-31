import { EditorState } from "prosemirror-state";
import { selectedRect } from 'prosemirror-tables'

export default function getCellCount (state: EditorState) {
  return {
    total: selectedRect(state).map.cellsInRect(selectedRect(state)).length,
    // TODO: count td/th count
    // th: thCount,
    // td: tdCount,
  }
}