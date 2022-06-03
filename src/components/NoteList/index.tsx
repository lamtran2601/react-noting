import './NoteList.scss';
import { Tree, TreeProps } from 'antd';
import { Note } from 'models';
import { forwardRef } from 'react';

const NEW_NOTE_TITLE = 'Untitled';

type Node = Note & { children?: []};
interface NoteListProps extends TreeProps {
  notes: Node[];
  selectedKeys?: string[];
  onNoteClick: (id: string) => void;
  height?: number;
  scrollThreshold?: number;
  onScrollEnd?: () => void;
}

const NoteList = (props: NoteListProps, ref: any) => {
  const {
    notes = [], onNoteClick, selectedKeys = [], height, onScrollEnd, scrollThreshold = 1,
    ...treeProps
  } = props;

  const parseNotes = (list: Node[]): any => list.map((note) => {
    const firstLine = note.data.split('\n')[0] ?? '#';
    const title = firstLine.slice(firstLine.lastIndexOf('#') + 1).trimStart();
    return {
      title: title.length === 0 ? NEW_NOTE_TITLE : title,
      key: note.id,
      ...note.children ? { children: parseNotes(note.children) } : {},
    };
  });

  return (
    <Tree
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...treeProps}
      blockNode
      ref={ref}
      treeData={parseNotes(notes)}
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
