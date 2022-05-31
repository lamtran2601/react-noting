import { NoteContext, NoteContextProps, UserContext } from 'contexts';
import { createNote, getNotes, setNotes } from 'features/Note';
import { useAppDispatch, useAppSelector, useInfinityPagination } from 'hooks';
import { Note } from 'models';
import {
  ReactNode, useCallback, useContext, useEffect, useMemo, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

const NoteProvider = (props: {children: ReactNode}) => {
  const { children } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const scrollTo = useRef<any>();

  const { user } = useContext(UserContext);
  const notes = useAppSelector((state) => state.noteList.data);

  const LIMIT = 50;

  const handleGetNotes = useCallback(async (offset = 0) => dispatch(getNotes({
    from: offset,
    to: offset + LIMIT - 1,
  })), []);

  const navigateToNote = (id: string, options = { isTransitionTo: false }) => {
    const { isTransitionTo } = options;
    navigate(`note/${id}`);
    if (isTransitionTo) scrollTo.current?.(id);
  };

  // TODO: subscribe note list
  useEffect(() => {
    dispatch(setNotes([]));
    handleGetNotes().then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        const data = action.payload as Note[];
        if (data.length === 0) {
          createNote();
        } else {
          navigateToNote(data[0].id);
        }
      }
    });
  }, [user]);

  const {
    onLoadMore: handleGetMoreNotes,
  } = useInfinityPagination({ dataLength: notes.length, next: handleGetNotes });

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
    handleGetMoreNotes: () => handleGetMoreNotes(),
  }), []);

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
