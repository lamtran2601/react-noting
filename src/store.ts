import { configureStore } from '@reduxjs/toolkit';
import { noteDetailsSlice, noteListSlice } from 'features/Note';

export const store = configureStore({
  reducer: {
    noteList: noteListSlice,
    nodeDetails: noteDetailsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
