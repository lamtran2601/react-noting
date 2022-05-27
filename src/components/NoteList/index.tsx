import './style.scss';
import { Tree } from 'antd';
import { Note } from 'models';
import React from 'react';

const NEW_NOTE_TITLE = 'New note';
const NEW_NOTE_OBJECT = { title: NEW_NOTE_TITLE, key: 'new' };
interface NoteListProps {
  notes: Note[];
  onNoteClick: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = (props) => {
  const { notes = [], onNoteClick } = props;

  const treeData = notes.map((note) => {
    const firstLine = note.data.split('\n')[0];
    return {
      title: note.data.length === 0 ? NEW_NOTE_TITLE : firstLine.slice(firstLine.lastIndexOf('#') + 1).trimStart(),
      key: note.id,
    };
  });

  return (
    <Tree
      treeData={treeData.length === 0
        ? [NEW_NOTE_OBJECT]
        : [
          ...treeData[0].title !== NEW_NOTE_TITLE
            ? [NEW_NOTE_OBJECT]
            : [],
          ...treeData,
        ]}
      onSelect={(_, info) => onNoteClick(info.node.key.toString())}
    />
  );
};
export default NoteList;
