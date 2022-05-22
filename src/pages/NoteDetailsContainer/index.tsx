import { getNoteById, syncNoteById, updateNote } from 'apis/note';
import Loading from 'components/Loading';
import NoteDetails from 'components/NoteDetails';
import useRequest from 'hooks/useRequest';
import useSubscription from 'hooks/useSubscription';
import { debounce } from 'lodash';
import { Note } from 'models/Note';
import { useParams } from 'react-router-dom';

const NoteDetailsContainer = () => {
  const { id = '' } = useParams();
  const {
    data: currentNote,
    error,
    loading,
  } = useRequest<Note>(() => getNoteById(id));

  const { data: newNote = currentNote } = useSubscription<Note>((callback) => syncNoteById(id, callback));

  const handleSave = debounce((value: string) => updateNote(id, value), 500);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <Loading />;
  }
  return <NoteDetails id={id} content={newNote.data} onChange={handleSave} />;
};
export default NoteDetailsContainer;
