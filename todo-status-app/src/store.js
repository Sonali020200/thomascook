import { configureStore } from '@reduxjs/toolkit';
import groupReducer from './features/groups/groupSlice';

const store = configureStore({
  reducer: {
    groups: groupReducer,
  },
});

export default store;
