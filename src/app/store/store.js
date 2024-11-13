// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import singleEventReducer from './singleEventSlice';

const store = configureStore({
  reducer: {
    singleEvent: singleEventReducer,
  },
});

export default store;
