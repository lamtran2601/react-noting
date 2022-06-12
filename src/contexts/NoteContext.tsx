import { createContext } from 'react';

export interface NoteContextProps {
  createNote: (content?: string) => void;
  navigateToNote: (id: string, options?: { isTransitionTo: boolean }) => void;
  setSrollTo: (callback: (id: string) => void) => void;
  handleGetNotes: (offset?: number) => void;
}

export const initialState = {
  createNote: () => {},
  navigateToNote: () => {},
  setSrollTo: () => {},
  handleGetNotes: () => {},
};

const NoteContext = createContext<NoteContextProps>(initialState);

export default NoteContext;
