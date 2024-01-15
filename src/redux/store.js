// store.js
import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../hooks/authSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
  devTools: true,
});

export default store;
