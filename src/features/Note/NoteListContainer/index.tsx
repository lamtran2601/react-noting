import {
  useCallback, useContext, useEffect, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { NoteContext } from 'contexts';
import { useAppDispatch, useAppSelector, useInfinityPagination } from 'hooks';
import NoteList from 'components/NoteList';
import { Note } from 'models';
import { setNotes } from 'features/Note';

const NEW_NOTE: Note = {
  id: '',
  data: 'New note',
};

const NoteListContainer = () => {
  const { id: currentNoteId = '' } = useParams();
  const treeRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const {
    createNote, navigateToNote, setSrollTo, handleGetNotes,
  } = useContext(NoteContext);

  useEffect(() => {
    if (treeRef.current) {
      setSrollTo?.((id) => treeRef.current.scrollTo?.({ key: id, align: 'auto' }));
    }
  }, [treeRef.current]);

  const notes = useAppSelector((state) => state.noteList.data);

  const {
    onLoadMore: handleGetMoreNotes,
  } = useInfinityPagination({ dataLength: notes.length, next: handleGetNotes });

  useEffect(() => {
    dispatch(setNotes([]));
    handleGetMoreNotes();
  }, []);

  const handleNoteClick = useCallback((id: string) => {
    if (id === '') {
      return createNote();
    }

    return navigateToNote(id, { isTransitionTo: true });
  }, [navigateToNote]);

  return (
    <div
      style={{ padding: '1rem 0' }}
    >
      <NoteList
        ref={treeRef}
        notes={[NEW_NOTE, ...[...notes].sort((a, b) => (new Date(b.updated_at ?? 0)).getTime() - (new Date(a.updated_at ?? 0)).getTime())]}
        selectedKeys={[currentNoteId]}
        onNoteClick={handleNoteClick}
        height={window.innerHeight - 42}
        scrollThreshold={0.8}
        onScrollEnd={handleGetMoreNotes}
      />
    </div>
  );
};
export default NoteListContainer;
