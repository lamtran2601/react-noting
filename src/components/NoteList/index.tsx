import './NoteList.scss';
import { Tree, TreeProps } from 'antd';
import { Note } from 'models';
import { forwardRef } from 'react';
import { getTitleText } from 'helpers';

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
    const title = getTitleText(note.data);
    return {
      title: title.length === 0 ? NEW_NOTE_TITLE : title,
      key: note.id,
      ...note.children ? { children: parseNotes(note.children) } : {},
    };
  });

  return (
    <Tree
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
      virtual
    />
  );
};
export default forwardRef(NoteList);
