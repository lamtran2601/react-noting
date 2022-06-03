import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Divider,
  message, Typography,
} from 'antd';
import { debounce } from 'lodash';
import { defaultNote } from 'models';
import { useAppDispatch, useAppSelector } from 'hooks';
import NoteDetails from 'components/NoteDetails';
import {
  upsertNote, saveNote, setNoteDetails,
} from 'features/Note';

const NoteDetailsContainer = () => {
  const { id: paramsId = '' } = useParams();

  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useAppDispatch();
  const noteList = useAppSelector((state) => state.noteList.data);
  const noteInList = noteList.find((e) => e.id === paramsId);
  const error = useAppSelector((state) => state.nodeDetails.error);
  const [note, setNote] = useState(noteInList || defaultNote);

  useEffect(() => {
    if (!isFocus) {
      setNote(noteInList || defaultNote);
      dispatch(setNoteDetails(noteInList || defaultNote));
    }
  }, [isFocus, noteInList]);

  const handleSave = useCallback(debounce((value: string) => {
    dispatch(saveNote({ id: note.id, content: value }));
  }, 300), [note]);

  const handleChange = useCallback((value: string) => {
    const newNote = { ...note, data: value, updated_at: new Date().toISOString() };
    dispatch(setNoteDetails(newNote));
    dispatch(upsertNote(newNote));
    handleSave(value);
  }, [note, noteInList]);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);

  return (
    <div
      style={{
        padding: '16px 42px',
        height: '100%',
      }}
    >
      {noteInList?.updated_at ? (
        <Typography.Text type="secondary">
          Edited:
          {' '}
          {dayjs(noteInList.updated_at).format('LLL')}
        </Typography.Text>
      ) : '' }
      <Divider />
      <NoteDetails
        key={note.id}
        id={note.id}
        defaultValue={note.data ?? ''}
        value={!isFocus ? note.data ?? '' : ''}
        onChange={handleChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};
export default NoteDetailsContainer;
