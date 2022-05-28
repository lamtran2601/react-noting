import './NoteList.scss';
import { Tree } from 'antd';
import { Note } from 'models';
import React from 'react';

const NEW_NOTE_TITLE = 'Untitled';
interface NoteListProps {
  notes: Note[];
  selectedKeys?: string[];
  onNoteClick: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = (props) => {
  const { notes = [], onNoteClick, selectedKeys = [] } = props;

  const treeData = notes.map((note) => {
    const firstLine = note.data.split('\n')[0];
    return {
      title: note.data.length === 0 ? NEW_NOTE_TITLE : firstLine.slice(firstLine.lastIndexOf('#') + 1).trimStart(),
      key: note.id,
    };
  });

  return (
    <Tree
      treeData={treeData}
      selectedKeys={selectedKeys}
      onSelect={(_, info) => onNoteClick(info.node.key.toString())}
    />
  );
};
export default NoteList;
