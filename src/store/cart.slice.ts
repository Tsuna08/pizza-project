import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loadState } from '@/store/storage';
import { Cart } from '@/types/cart';

export interface CartState {
  items: Cart[];
}

export const CART_KEY_STATE = 'cartData';

const initialState: CartState = loadState<CartState>(CART_KEY_STATE) ?? {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ id: action.payload, count: 1 });
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        if (existingItem.count > 1) {
          existingItem.count -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
    },
    delete: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    }
  },
  extraReducers: () => {}
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
