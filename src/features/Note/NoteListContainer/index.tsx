import {
  Ref,
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import RcTree from 'antd/node_modules/rc-tree';
import { NoteContext, UserContext } from 'contexts';
import { useAppDispatch, useAppSelector, useInfinityPagination } from 'hooks';
import NoteList from 'components/NoteList';
import { Note } from 'models';
import { setNotes } from 'features/Note';

const NEW_NOTE: Note = {
  id: '',
  data: 'New note',
};

const MY_NOTE_KEY = 'my-note';
const PUBLIC_KEY = 'public';

const LIMIT = 50;

const NoteListContainer = () => {
  const { id: currentNoteId = '' } = useParams();
  const treeRef = useRef<RcTree>();
  const dispatch = useAppDispatch();

  const [expandedKeys, setExpandedKeys] = useState([MY_NOTE_KEY, PUBLIC_KEY]);

  const { user } = useContext(UserContext);
  const {
    createNote, navigateToNote, setSrollTo, handleGetNotes,
  } = useContext(NoteContext);

  useEffect(() => {
    setSrollTo?.((id) => treeRef.current?.scrollTo?.({ key: id, align: 'auto' }));
  }, [treeRef.current]);

  const notes = useAppSelector((state) => state.noteList.data);
  const loading = useAppSelector((state) => state.noteList.loading);

  const {
    onLoadMore: handleGetMoreNotes,
  } = useInfinityPagination({ dataLength: notes.length, limit: LIMIT, next: handleGetNotes });

  useEffect(() => {
    dispatch(setNotes([]));
    if (!loading) {
      handleGetNotes();
    }
  }, [user]);

  const handleNoteClick = useCallback((id: string) => {
    if ([MY_NOTE_KEY, PUBLIC_KEY].includes(id)) {
      if (expandedKeys.includes(id)) {
        return setExpandedKeys((e) => [...e.filter((key: string) => key !== id)]);
      }
      return setExpandedKeys((e) => [...e, id]);
    }
    if (id === '') { return createNote(); }
    return navigateToNote(id, { isTransitionTo: true });
  }, [navigateToNote, expandedKeys]);

  const notesList: Note[] = useMemo(() => {
    const newNote = { ...NEW_NOTE };
    const sortedList = [...notes].sort((a, b) => (new Date(b.updated_at ?? 0)).getTime() - (new Date(a.updated_at ?? 0)).getTime());
    return [
      newNote,
      { id: 'my-note', data: 'My note', children: sortedList.filter((note) => note.owner_id) },
      { id: 'public', data: 'Public', children: sortedList.filter((note) => !note.owner_id) },
    ];
  }, [notes]);

  return (
    <NoteList
      ref={treeRef as Ref<RcTree>}
      notes={notesList}
      selectedKeys={[currentNoteId]}
      expandedKeys={expandedKeys}
      defaultExpandParent
      autoExpandParent
      onExpand={(keys) => setExpandedKeys(keys.map((e) => e.toString()))}
      onNoteClick={handleNoteClick}
      height={window.innerHeight}
      scrollThreshold={0.8}
      onScrollEnd={handleGetMoreNotes}
    />
  );
};
export default NoteListContainer;
