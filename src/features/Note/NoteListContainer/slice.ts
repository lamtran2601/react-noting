import { Note } from 'models';
import {
  createAsyncThunk, createSlice, PayloadAction, SerializedError,
} from '@reduxjs/toolkit';
import supabaseClient, { GetParams } from 'services/supabase';
import { message } from 'antd';
import noteService from '../noteService';

interface NoteListState {
  offset: number;
  data: Note[];
  error: SerializedError | null;
}

const initialState: NoteListState = {
  offset: 0,
  data: [],
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

export const deleteNoteById = createAsyncThunk('deleteNoteById', (id: string, thunkAPI) => {
  try {
    return noteService.deleteNoteById(id);
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
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload];
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(createNote.pending, (state) => {
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.data = [action.payload, ...state.data];
      })
      .addCase(createNote.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(deleteNoteById.pending, (state, action) => {
        state.error = null;
        state.data = state.data.filter((note) => note.id !== action.meta.arg);
      })
      .addCase(deleteNoteById.fulfilled, () => {
        message.success('Note deleted');
      })
      .addCase(deleteNoteById.rejected, (state, action) => {
        state.error = action.error;
      });
  },
});

export const { setNotes, updateNoteOnList } = noteListSlice.actions;

export default noteListSlice.reducer;
