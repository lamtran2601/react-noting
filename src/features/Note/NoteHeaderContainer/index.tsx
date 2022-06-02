import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Popconfirm, Row, Space,
} from 'antd';
import {
  CloudTwoTone, CopyOutlined, DeleteOutlined,
} from '@ant-design/icons';
import { NoteContext } from 'contexts';
import { useAppDispatch, useAppSelector } from 'hooks';
import { deleteNoteById } from '..';

const NoteHeaderContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { createNote, navigateToNote } = useContext(NoteContext);
  const [isSynced, setIsSynced] = useState(true);

  const notes = useAppSelector((state) => state.noteList.data);
  const noteDetails = useAppSelector((state) => state.nodeDetails.data);
  const noteInList = notes.find((e) => e.id === noteDetails.id);

  useEffect(() => {
    setIsSynced(!noteDetails || !noteInList || noteInList.data === noteDetails.data);
  }, [noteInList, noteDetails]);

  const handleDeleteNote = useCallback(async () => {
    if (!id) return;

    const currentNoteIndex = notes.findIndex((note) => note.id === id);
    // eslint-disable-next-line no-nested-ternary
    const nextNote = currentNoteIndex > 0 ? notes[currentNoteIndex - 1] : (notes.length > currentNoteIndex ? notes[currentNoteIndex + 1] : null);
    if (nextNote) {
      navigateToNote(nextNote.id, { isTransitionTo: true });
    } else {
      createNote();
    }
    await dispatch(deleteNoteById(id));
  }, [notes, id]);

  const handleDuplicateClick = useCallback(() => {
    createNote(noteDetails.data);
  }, [noteDetails]);

  return (
    <Space>
      <Row>
        <CloudTwoTone
          style={{ fontSize: '1.25rem' }}
          twoToneColor={isSynced ? '#52c41a' : '#eb2f96'}
          onClick={() => navigate(`/note/${id}`)}
        />
      </Row>
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
