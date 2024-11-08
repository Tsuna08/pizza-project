import { configureStore } from '@reduxjs/toolkit';

import { CART_KEY_STATE, cartSlice } from './cart.slice';
import { saveState } from './storage';
import { USER_KEY_STATE, userSlice } from './user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer
  }
});

store.subscribe(() => {
  saveState({ jwt: store.getState().user.jwt }, USER_KEY_STATE);
  saveState(store.getState().cart, CART_KEY_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
