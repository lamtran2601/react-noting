import { createNote, getNoteById, updateNote } from 'apis/note';
import Loading from 'components/Loading';
import NoteDetails from 'components/NoteDetails';
import { useRequest } from 'hooks';
import { debounce } from 'lodash';
import { Note } from 'models';
import { useNavigate, useParams } from 'react-router-dom';

const NoteDetailsContainer = () => {
  const { id = '' } = useParams();

  const navigate = useNavigate();
  const {
    data: note,
    error,
    loading,
  } = useRequest<Note>(async () => {
    if (id === 'new') {
      const newNote = await createNote('');
      navigate(`/note/${newNote.id}`);
      return newNote;
    }
    return getNoteById(id);
  }, [id]);

  // TODO: handle cursor when receive new note
  // const { data: newNote } = useSubscription<Note>((callback) => syncNoteById(id, callback));

  const handleChange = debounce(async (value: string) => updateNote(id, value), 500);

  if (loading) {
    return <Loading />;
  }

  return <NoteDetails key={id} id={id} content={note?.data ?? ''} onChange={handleChange} />;
};
export default NoteDetailsContainer;
