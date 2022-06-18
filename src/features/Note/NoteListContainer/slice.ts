import { Note } from 'models';
import {
  createAsyncThunk, createSlice, PayloadAction, SerializedError,
} from '@reduxjs/toolkit';
import { message } from 'antd';
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

export const getNotes = createAsyncThunk('getNotes', (params: Parameters<typeof noteService.get>[0], thunkAPI) => {
  try {
    return noteService.get({
      order: {
        column: 'updated_at',
      },
      ...params,
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createNote = createAsyncThunk('createNote', (note: Note, thunkAPI) => {
  try {
    return noteService.create(note);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteNoteById = createAsyncThunk('deleteNoteById', (id: string, thunkAPI) => {
  try {
    return noteService.delete(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const syncUpdateNotes = createAsyncThunk('syncUpdateNotes', (_, thunkAPI) => {
  try {
    return noteService.subscribe((payload) => {
      const note = payload.new;
      switch (payload.eventType) {
        case 'INSERT':
        case 'UPDATE':
          thunkAPI.dispatch(noteListSlice.actions.upsertNote(note));
          break;
        case 'DELETE':
          thunkAPI.dispatch(noteListSlice.actions.deleteNoteOnList(note.id));
          break;
        default:
      }
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const noteListSlice = createSlice({
  name: 'noteList',
  initialState,
  reducers: {
    upsertNote: (state: NoteListState, action: PayloadAction<Note>) => {
      if (state.data.find((e) => e.id === action.payload.id)) {
        state.data = state.data.map((e) => (e.id === action.payload.id ? action.payload : e));
      } else {
        state.data.push(action.payload);
      }
    },
    setNotes: (state: NoteListState, action: PayloadAction<Note[]>) => {
      state.data = action.payload;
    },
    updateNotes: (state: NoteListState, action: PayloadAction<Note[]>) => {
      state.data = state.data.map((note) => {
        const newNote = action.payload.find((n) => n.id === note.id);
        return newNote ?? note;
      });
    },
    deleteNoteOnList: (state: NoteListState, action: PayloadAction<string>) => {
      state.data = state.data.filter((note) => note.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...action.payload];
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
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

export const {
  upsertNote, setNotes, updateNotes, deleteNoteOnList,
} = noteListSlice.actions;

export default noteListSlice.reducer;
