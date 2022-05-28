import { defaultNote, Note } from 'models';
import {
  createAsyncThunk, createSlice, PayloadAction, SerializedError,
} from '@reduxjs/toolkit';
import supabaseClient, { GetParams } from 'services/supabase';
import noteService from '../noteService';

interface NoteListState {
  data: Note[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: NoteListState = {
  data: [],
  loading: false,
  error: null,
};

export const getNotes = createAsyncThunk('getNotes', (params: GetParams, thunkAPI) => {
  try {
    return supabaseClient.get<Note>('note', params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createNote = createAsyncThunk('createNote', (content: string | undefined, thunkAPI) => {
  try {
    return noteService.createNote(content);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const noteListSlice = createSlice({
  name: 'noteList',
  initialState,
  reducers: {
    setNotes: (state: NoteListState, action: PayloadAction<Note[]>) => {
      state.data = action.payload;
    },
    updateNoteOnList: (state: NoteListState, action: PayloadAction<Note>) => {
      state.data = state.data.map((note) => (note.id === action.payload.id ? action.payload : note));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.data = [];
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(createNote.pending, (state) => {
        state.data = [defaultNote, ...state.data];
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.data[0] = action.payload;
        state.error = null;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { setNotes, updateNoteOnList } = noteListSlice.actions;

export default noteListSlice.reducer;
