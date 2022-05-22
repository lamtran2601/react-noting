import { Note } from "models/Note";
import React from "react";

interface NoteItemProps {
  note: Note;
}
const NoteItem: React.FC<NoteItemProps> = (props) => {
  const { note = { data: "", id: "" } } = props;
  const firstLine = note.data.split("\n")[0];
  return <>{firstLine.slice(0, Math.max(20, firstLine.length))}</>;
};
export default NoteItem;
