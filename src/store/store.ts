import { configureStore } from '@reduxjs/toolkit';

import { saveState } from './storage';
import { USER_KEY_STATE, userSlice } from './user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, USER_KEY_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
