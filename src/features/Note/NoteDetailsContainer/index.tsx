import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import { debounce } from 'lodash';
import { defaultNote } from 'models';
import { useAppDispatch, useAppSelector } from 'hooks';
import NoteDetails from 'components/NoteDetails';
import { updateNoteOnList, getNoteById, saveNote } from '..';

const NoteDetailsContainer = () => {
  const { id: paramsId = '' } = useParams();
  const dispatch = useAppDispatch();
  const { data: noteList } = useAppSelector((state) => state.noteList);
  const noteInList = noteList.find((e) => e.id === paramsId);

  useEffect(() => {
    if (paramsId !== '') {
      dispatch(getNoteById(paramsId));
    }
  }, [paramsId]);

  const noteDetails = useAppSelector((state) => state.nodeDetails.data);
  const error = useAppSelector((state) => state.nodeDetails.error);

  const note = noteDetails?.id === paramsId ? noteDetails : noteInList ?? defaultNote;

  // TODO: handle cursor when receive new note
  // const { data: newNote } = useSubscription<Note>((callback) => syncNoteById(id, callback));

  const handleSave = debounce((value: string) => {
    dispatch(saveNote({ id: note.id, content: value }));
  }, 200);

  const handleChange = (value: string) => {
    dispatch(updateNoteOnList({ ...note, data: value }));
    handleSave(value);
  };

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
