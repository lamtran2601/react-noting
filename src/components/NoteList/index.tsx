import './NoteList.scss';
import { Tree } from 'antd';
import { Note } from 'models';
import { forwardRef } from 'react';

const NEW_NOTE_TITLE = 'Untitled';
interface NoteListProps {
  notes: Note[];
  selectedKeys?: string[];
  onNoteClick: (id: string) => void;
  height?: number;
  scrollThreshold?: number;
  onScrollEnd?: () => void;
}

const NoteList = (props: NoteListProps, ref: any) => {
  const {
    notes = [], onNoteClick, selectedKeys = [], height, onScrollEnd, scrollThreshold = 1,
  } = props;

  const treeData = notes.map((note) => {
    const firstLine = note.data.split('\n')[0] ?? '#';
    const title = firstLine.slice(firstLine.lastIndexOf('#') + 1).trimStart();
    return {
      title: title.length === 0 ? NEW_NOTE_TITLE : title,
      key: note.id,
    };
  });

  return (
    <Tree
      ref={ref}
      treeData={treeData}
      selectedKeys={selectedKeys}
      onSelect={(_, info) => onNoteClick(info.node.key.toString())}
      height={height}
      onScroll={(e) => {
        const { scrollTop, scrollHeight } = e.currentTarget;
        if (height && scrollHeight - (scrollTop + height) <= height * (1 - scrollThreshold)) {
          onScrollEnd?.();
        }
      }}
    />
  );
};
export default forwardRef(NoteList);
