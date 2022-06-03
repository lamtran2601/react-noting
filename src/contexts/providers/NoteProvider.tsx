import { NoteContext, NoteContextProps, UserContext } from 'contexts';
import {
  createNote, getNotes, setNotes, syncUpdateNotes,
} from 'features/Note';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Note } from 'models';
import {
  ReactNode, useCallback, useContext, useEffect, useMemo, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NoteProvider = (props: {children: ReactNode}) => {
  const { children } = props;
  const { id: currentNoteId = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const scrollTo = useRef<any>();

  const { user } = useContext(UserContext);
  const noteDetails = useAppSelector((state) => state.nodeDetails.data);

  const LIMIT = 20;

  const handleGetNotes = useCallback((offset = 0) => dispatch(getNotes({
    from: offset,
    to: offset + LIMIT - 1,
  })), []);

  const navigateToNote = (id: string, options = { isTransitionTo: false }) => {
    const { isTransitionTo } = options;
    navigate(`note/${id}`);
    if (isTransitionTo) scrollTo.current?.(id);
  };

  useEffect(() => {
    dispatch(syncUpdateNotes());
  }, [user]);

  useEffect(() => {
    if (currentNoteId !== '' && noteDetails.id !== '' && currentNoteId !== noteDetails.id) {
      navigateToNote(currentNoteId);
    }
  }, [currentNoteId, noteDetails]);

  const handleCreateNote = useCallback(async (content = '') => {
    const createAction = await dispatch(createNote(content));
    if (createAction.meta.requestStatus === 'fulfilled') {
      const noteId = (createAction.payload as Note).id;
      navigateToNote(noteId, { isTransitionTo: true });
    }
  }, []);

  const value: NoteContextProps = useMemo(() => ({
    createNote: handleCreateNote,
    navigateToNote,
    setSrollTo: (callback) => {
      scrollTo.current = callback;
    },
    handleGetNotes,
  }), []);

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
