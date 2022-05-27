import { Note } from 'models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoteState {
notes: Note[];
note?: Note;
}

const initialState: NoteState = {
  notes: [],
};

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotes: (state: NoteState, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setNote: (state: NoteState, action: PayloadAction<Note>) => {
      state.note = action.payload;
    },
  },
});

export const { setNotes, setNote } = noteSlice.actions;

export default noteSlice.reducer;
