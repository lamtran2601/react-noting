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
    dispatch(deleteNoteById(id));

    const currentNoteIndex = notes.findIndex((note) => note.id === id);
    const preNote = currentNoteIndex > 0 ? notes[currentNoteIndex - 1] : null;
    if (preNote) {
      navigateToNote(preNote.id, { isTransitionTo: true });
      return;
    }
    const nextNote = notes.length > currentNoteIndex ? notes[currentNoteIndex + 1] : null;
    if (nextNote) {
      navigateToNote(nextNote.id, { isTransitionTo: true });
      return;
    }
    createNote();
  }, [notes, id]);

  const handleDuplicateClick = useCallback(() => {
    const newNoteDatas = noteDetails.data.split('\n');
    const firstLine = newNoteDatas[0];
    const title = `${firstLine.substring(0, firstLine.lastIndexOf('#') + 1)} [Copy]${firstLine.replace('#', '')}`;
    createNote(`${title}\n${newNoteDatas.slice(1).join('\n')}`);
  }, [noteDetails]);

  return (
    <Space wrap>
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
