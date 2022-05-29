import { createNote } from 'features/Note';
import NoteContext, { NoteContextProps } from 'features/Note/context';
import { useAppDispatch } from 'hooks';
import { Note } from 'models';
import React, {
  ReactNode, useCallback, useMemo, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';

const HomeProvider: React.FC<{children: ReactNode}> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const scrollTo = useRef<any>();

  const navigateToNote = (id: string, options = { isTransitionTo: false }) => {
    const { isTransitionTo = false } = options;
    navigate(`note/${id}`);
    if (isTransitionTo) scrollTo.current?.(id);
  };

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
  }), []);

  return (
    <NoteContext.Provider value={value}>
      {children}
    </NoteContext.Provider>
  );
};

export default HomeProvider;
