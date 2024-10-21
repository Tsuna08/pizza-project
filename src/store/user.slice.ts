import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { PREFIX } from '@/helpers/api';
import { loadState } from '@/store/storage';

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
}

export interface UserResponse {
  access_token: string;
}

export const USER_KEY_STATE = 'userData';

const initialState: UserState = {
  jwt: loadState<Omit<UserState, 'loginErrorMessage'>>(USER_KEY_STATE)?.jwt ?? null
};

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    const response = await axios.post(`${PREFIX}/auth/login`, { ...params }).catch((error) => {
      if (error instanceof AxiosError) {
        throw new Error(error?.response?.data.message);
      }
    });
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearErrorMessage: (state) => {
      state.loginErrorMessage = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AxiosResponse<UserResponse> | void>) => {
        if (!action.payload) return;
        state.jwt = action.payload.data.access_token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
