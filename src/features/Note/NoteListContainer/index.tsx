import {
  useCallback, useContext, useEffect, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { NoteContext } from 'contexts';
import { useAppSelector } from 'hooks';
import Loading from 'components/Loading';
import NoteList from 'components/NoteList';

const NEW_NOTE = {
  id: '',
  data: 'New note',
};

const NoteListContainer = () => {
  const { id: currentNoteId = '' } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const treeRef = useRef<any>(null);

  const {
    createNote, navigateToNote, setSrollTo, handleGetMoreNotes,
  } = useContext(NoteContext);

  useEffect(() => {
    if (treeRef.current) {
      setSrollTo?.((id) => treeRef.current.scrollTo?.({ key: id, align: 'auto' }));
    }
  }, [treeRef.current]);

  const notes = useAppSelector((state) => state.noteList.data);

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
