import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    isAuthenticated: false,
    token: '',
    account: {},
  },
  reducers: {
    login: (state, action) => {
      const {token, account} = action.payload;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = token;
      state.account = account;
    },
    logout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = '';
      state.account = {};
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
    updateUserData: (state, action) => {
      const {rolesWithPermission, email, username} = action.payload;
      state.account = {rolesWithPermission, email, username};
      state.isAuthenticated = true;
    },
    updateLoadingState: (state) => {
      state.isLoading = false;
    },
    setError: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.token = '';
      state.account = {};
    },
  },
});

export const {login, logout, updateToken, updateUserData, updateLoadingState, setError} = authSlice.actions;
export default authSlice.reducer;

