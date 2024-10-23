import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { PREFIX } from '@/helpers/api';
import { loadState } from '@/store/storage';
import { RootState } from '@/store/store';
import { UserProfile, UserResponse } from '@/types/user';

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: UserProfile;
}

export const USER_KEY_STATE = 'userData';

const initialState: UserState = {
  jwt: loadState<UserState>(USER_KEY_STATE)?.jwt ?? null
};

export const getUserProfile = createAsyncThunk<UserProfile, void, { state: RootState }>(
  'user/profile',
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;

    const { data } = await axios.get<UserProfile>(`${PREFIX}/user/profile`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });
    return data;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (params: { email: string; password: string }) => {
    const response = await axios
      .post<UserResponse>(`${PREFIX}/auth/login`, { ...params })
      .catch((error) => {
        if (error instanceof AxiosError) {
          throw new Error(error?.response?.data.message);
        }
      });
    return response;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (params: { email: string; password: string; name: string }) => {
    const response = await axios
      .post<UserResponse>(`${PREFIX}/auth/register`, { ...params })
      .catch((error) => {
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
    clearLoginMessage: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterMessage: (state) => {
      state.registerErrorMessage = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
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
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<AxiosResponse<UserResponse> | void>) => {
        if (!action.payload) return;
        state.jwt = action.payload.data.access_token;
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
