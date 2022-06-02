import { createContext } from 'react';

export interface NoteContextProps {
  createNote: (content?: string) => void;
  navigateToNote: (id: string, options?: { isTransitionTo: boolean }) => void;
  setSrollTo: (callback: (_: any) => void) => void;
  handleGetNotes: (offset?: number) => Promise<any>;
}

export const initialState = {
  createNote: () => {},
  navigateToNote: () => {},
  setSrollTo: () => {},
  handleGetNotes: () => Promise.resolve(),
};

const NoteContext = createContext<NoteContextProps>(initialState);

export default NoteContext;
