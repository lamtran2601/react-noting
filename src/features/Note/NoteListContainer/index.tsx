import {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { NoteContext, UserContext } from 'contexts';
import { useAppDispatch, useAppSelector, useInfinityPagination } from 'hooks';
import NoteList from 'components/NoteList';
import { Note } from 'models';
import { getNotes, setNotes } from 'features/Note';
import Loading from 'components/Loading';

const NEW_NOTE: Note = {
  id: '',
  data: 'New note',
};

const MY_NOTE_KEY = 'my-note';
const PUBLIC_KEY = 'public';

const NoteListContainer = () => {
  const { id: currentNoteId = '' } = useParams();
  const treeRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const [expandedKeys, setExpandedKeys] = useState([MY_NOTE_KEY]);

  const LIMIT = 20;
  const handleGetNotes = useCallback((offset = 0, limit = LIMIT) => dispatch(getNotes({
    from: offset,
    to: offset + limit - 1,
  })), []);

  const { user } = useContext(UserContext);
  const {
    createNote, navigateToNote, setSrollTo,
  } = useContext(NoteContext);

  useEffect(() => {
    if (treeRef.current) {
      setSrollTo?.((id) => treeRef.current.scrollTo?.({ key: id, align: 'auto' }));
    }
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
    <div
      style={{ padding: '1rem 0' }}
    >
      <NoteList
        ref={treeRef}
        notes={notesList}
        selectedKeys={[currentNoteId]}
        expandedKeys={expandedKeys}
        defaultExpandParent
        autoExpandParent
        onExpand={(keys) => setExpandedKeys(keys.map((e) => e.toString()))}
        onNoteClick={handleNoteClick}
        height={window.innerHeight - 42}
        scrollThreshold={0.8}
        onScrollEnd={handleGetMoreNotes}
      />
    </div>
  );
};
export default NoteListContainer;
