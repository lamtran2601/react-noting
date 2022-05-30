import { message } from 'antd';
import NoteDetails from 'components/NoteDetails';
import { useAppDispatch, useAppSelector } from 'hooks';
import { debounce } from 'lodash';
import { defaultNote } from 'models';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateNoteOnList } from '../NoteList/noteListSlice';
import { getNoteById, saveNote } from './noteDetailsSlice';

const NoteDetailsContainer = () => {
  const { id: paramsId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { data: noteList } = useAppSelector((state) => state.noteList);

  useEffect(() => {
    if (paramsId !== '') {
      dispatch(getNoteById(paramsId));
    }
  }, [paramsId]);

  const noteDetails = useAppSelector((state) => state.nodeDetails.data);
  const error = useAppSelector((state) => state.nodeDetails.error);

  const note = noteDetails?.id === paramsId ? noteDetails : noteList.find((e) => e.id === paramsId) ?? defaultNote;

  // TODO: handle cursor when receive new note
  // const { data: newNote } = useSubscription<Note>((callback) => syncNoteById(id, callback));

  const handleChange = debounce(async (value: string) => {
    dispatch(updateNoteOnList({ ...note, data: value }));
    dispatch(saveNote({ id: note.id, content: value }));
  }, 400);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  return (
    <div
      style={{
        padding: '16px 42px',
      }}
    >
      <NoteDetails key={note.id} id={note.id} content={note.data ?? ''} onChange={handleChange} />
    </div>
  );
};
export default NoteDetailsContainer;
