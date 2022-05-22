import { Button } from 'antd';
import NoteItem from 'components/NoteList/NoteItem';
import { Note } from 'models/Note';
import React from 'react';

interface NoteListProps {
  notes: Note[];
  onNoteClick: (id: string) => void;
}
const NoteList: React.FC<NoteListProps> = (props) => {
  const { notes = [], onNoteClick } = props;

  return (
    <>
      {(notes || []).map((note) => (
        <Button key={note.id} type="text" onClick={() => onNoteClick(note.id)}>
          <NoteItem note={note} />
        </Button>
      ))}
    </>
  );
};
export default NoteList;
