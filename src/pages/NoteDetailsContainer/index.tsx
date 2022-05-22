import { getNoteById, updateNote } from 'apis/note';
import Loading from 'components/Loading';
import NoteDetails from 'components/NoteDetails';
import useRequest from 'hooks/useRequest';
import { debounce } from 'lodash';
import { Note } from 'models/Note';
import { useParams } from 'react-router-dom';

const NoteDetailsContainer = () => {
  const { id = '' } = useParams();
  const {
    data: note,
    error,
    loading,
  } = useRequest<Note>(() => getNoteById(id));

  const handleSave = debounce((value: string) => updateNote(id, value), 500);

  if (error) {
    return <div>{error.message}</div>;
  }
  if (loading) {
    return <Loading />;
  }
  return <NoteDetails id={id} content={note.data} onChange={handleSave} />;
};
export default NoteDetailsContainer;
