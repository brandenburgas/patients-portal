import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    patients: [],
    username: null,
  },
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        data: action.payload,
      };
    },
    loginFailure(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure } = authSlice.actions;

export const authSliceActions = authSlice.reducer;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
