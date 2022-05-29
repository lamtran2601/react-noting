import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Note } from 'models';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createNote, deleteNoteById } from '../NoteList/noteListSlice';

const NoteHeaderContainer = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const notes = useAppSelector((state) => state.noteList.data);
  const noteDetails = useAppSelector((state) => state.nodeDetails.data);

  const handleCreateNote = useCallback(async (content = '') => {
    const createAction = await dispatch(createNote(content));
    if (createAction.meta.requestStatus === 'fulfilled') {
      navigate(`note/${(createAction.payload as Note).id}`);
    }
  }, []);

  const handleDeleteNote = useCallback(async () => {
    if (!id) return;

    const currentNoteIndex = notes.findIndex((note) => note.id === id);
    // eslint-disable-next-line no-nested-ternary
    const nextNote = currentNoteIndex > 0 ? notes[currentNoteIndex - 1] : (notes.length > currentNoteIndex ? notes[currentNoteIndex + 1] : null);
    if (nextNote) {
      navigate(`/note/${nextNote.id}`);
    } else {
      handleCreateNote();
    }
    await dispatch(deleteNoteById(id));
  }, [notes, id]);

  const handleDuplicateClick = useCallback(() => {
    handleCreateNote(noteDetails.data);
  }, [noteDetails]);

  return (
    <Space>
      <Button type="dashed" shape="round" icon={<CopyOutlined />} onClick={handleDuplicateClick}>Duplicate</Button>
      <Popconfirm
        title="Are you sure delete this note?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleDeleteNote}
        disabled={!id}
      >
        <Button type="dashed" shape="round" icon={<DeleteOutlined />}>Delete</Button>
      </Popconfirm>
    </Space>
  );
};

export default NoteHeaderContainer;
