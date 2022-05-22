import { getNoteById, syncNoteById, updateNote } from 'apis/note';
import Loading from 'components/Loading';
import NoteDetails from 'components/NoteDetails';
import useRequest from 'hooks/useRequest';
import useSubscription from 'hooks/useSubscription';
import { debounce } from 'lodash';
import { Note } from 'models/Note';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const NoteDetailsContainer = () => {
  const { id = '' } = useParams();

  const [note, setNote] = useState<Note>();

  const {
    data: oldNote,
    error,
    loading,
  } = useRequest<Note>(() => getNoteById(id));

  // TODO: handle cursor when receive new note
  // const { data: newNote } = useSubscription<Note>((callback) => syncNoteById(id, callback));

  useEffect(() => {
    setNote(oldNote);
  }, [oldNote]);

  const handleSave = debounce((value: string) => updateNote(id, value), 500);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return <NoteDetails id={id} content={note?.data || ''} onChange={handleSave} />;
};
export default NoteDetailsContainer;
