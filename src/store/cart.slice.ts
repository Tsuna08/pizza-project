import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Cart } from '@/types/cart';

export interface CartState {
  items: Cart[];
}

export const USER_KEY_STATE = 'cartData';

const initialState: CartState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((item) => item.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }

      state.items.map((item) => {
        if (item.id === action.payload) {
          item.count += 1;
        }
        return item;
      });
    }
  },
  extraReducers: () => {}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
