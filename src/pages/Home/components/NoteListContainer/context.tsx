import React from "react";

interface NoteListContextProps {
  onNoteClick: (id: string) => void;
}

export const NoteListContext = React.createContext<NoteListContextProps>(
  {} as any
);
