import Loading from 'components/Loading';
import NoteList from 'components/NoteList';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Note } from 'models';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNote, getNotes } from './noteListSlice';

const NEW_NOTE = {
  id: '',
  data: 'New note',
};

const NoteListContainer = () => {
  const { id: currentNoteId = '' } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.noteList.data);
  const loading = useAppSelector((state) => state.noteList.loading);

  useEffect(() => {
    dispatch(getNotes({}));
  }, []);

  const handleCreateNote = useCallback(async () => {
    const createAction = await dispatch(createNote());
    if (createAction.meta.requestStatus === 'fulfilled') {
      navigate(`note/${(createAction.payload as Note).id}`);
    }
  }, [notes]);

  const handleNoteClick = useCallback(
    (id: string) => {
      if (id === '') {
        handleCreateNote();
        return;
      }
      navigate(`/note/${id}`);
    },
    [navigate],
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <NoteList
      notes={[NEW_NOTE, ...notes]}
      selectedKeys={[currentNoteId]}
      onNoteClick={handleNoteClick}
    />
  );
};
export default NoteListContainer;
