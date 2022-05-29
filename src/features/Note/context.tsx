import { createContext } from 'react';

export interface NoteContextProps {
  createNote: (content?: string) => void;
  navigateToNote: (id: string, options?: { isTransitionTo: boolean }) => void;
  setSrollTo?: (callback: (_: any) => void) => void;
}

export const initialState = {
  createNote: () => {},
  navigateToNote: () => {},
  setSrollTo: () => {},
};

const NoteContext = createContext<NoteContextProps>(initialState);

export default NoteContext;
