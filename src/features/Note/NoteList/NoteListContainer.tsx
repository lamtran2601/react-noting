import Loading from 'components/Loading';
import NoteList from 'components/NoteList';
import { useAppDispatch, useAppSelector } from 'hooks';
import useInfinityPagination from 'hooks/useInfinityPagination';
import { Note } from 'models';
import {
  useCallback, useContext, useEffect, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import NoteContext from '../context';
import { getNotes } from './noteListSlice';

const NEW_NOTE = {
  id: '',
  data: 'New note',
};

const NoteListContainer = () => {
  const { id: currentNoteId = '' } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const treeRef = useRef<any>(null);

  const { createNote, navigateToNote, setSrollTo } = useContext(NoteContext);

  useEffect(() => {
    if (treeRef.current) {
      setSrollTo?.((id) => treeRef.current.scrollTo?.({ key: id, align: 'auto' }));
    }
  }, [treeRef.current]);

  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.noteList.data);

  const LIMIT = 30;

  const navigateToFirstNote = useCallback((noteList = notes) => {
    if (noteList.length > 0) {
      navigateToNote(noteList[0].id, { isTransitionTo: true });
    }
  }, [notes]);

  const handleGetNotes = useCallback(async (offset = 0) => {
    dispatch(getNotes({
      from: offset,
      to: offset + LIMIT - 1,
    })).then((action) => {
      if (currentNoteId !== '') return;

      if (action.meta.requestStatus === 'fulfilled') {
        const data = action.payload as Note[];
        if (data.length === 0) {
          createNote();
        } else {
          navigateToFirstNote(data);
        }
      }
    });
  }, []);

  const {
    onLoadMore: handleGetMoreNotes,
  } = useInfinityPagination({
    limit: LIMIT, dataLength: notes.length, next: handleGetNotes,
  });

  useEffect(() => {
    handleGetMoreNotes();
  }, []);

  const handleNoteClick = useCallback((id: string) => {
    if (id === '') {
      return createNote();
    }

    return navigateToNote(id, { isTransitionTo: true });
  }, [navigateToNote]);

  if (notes.length === 0) {
    return <Loading />;
  }

  return (
    <div
      ref={ref}
      style={{ padding: '1rem 0' }}
    >
      <NoteList
        ref={treeRef}
        notes={[NEW_NOTE, ...notes]}
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
