import { defaultNote, Note } from 'models';
import {
  createAsyncThunk, createSlice, PayloadAction, SerializedError,
} from '@reduxjs/toolkit';
import { noteService } from '..';

export interface NoteDetailsState {
  data: Note;
  loading: boolean;
  error: SerializedError | null;
}

const initialState: NoteDetailsState = {
  data: defaultNote,
  loading: false,
  error: null,
};

export const getNoteById = createAsyncThunk('getNoteById', (id: string, thunkAPI) => {
  try {
    return noteService.getNoteById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const saveNote = createAsyncThunk('saveNote', (params: { id: string, content: string }, thunkAPI) => {
  const { id, content } = params;
  try {
    return noteService.updateNote(id, content);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const noteDetailsSlice = createSlice({
  name: 'noteDetails',
  initialState,
  reducers: {
    setNoteDetails: (state: NoteDetailsState, action: PayloadAction<Note>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNoteById.pending, (state) => {
        state.loading = true;
        state.data = defaultNote;
        state.error = null;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loading = false;
        state.data = defaultNote;
        state.error = action.error;
      })
      .addCase(saveNote.pending, (state) => {
        state.error = null;
      })
      .addCase(saveNote.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(saveNote.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { setNoteDetails } = noteDetailsSlice.actions;

export default noteDetailsSlice.reducer;
