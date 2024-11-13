// src/store/singleEventSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for single event
const initialState = {
  event: null,
  ticketQuantities: {},
  totalAmount: 0,
  loading: false,
  error: null,
};

const singleEventSlice = createSlice({
  name: 'singleEvent',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setTicketQuantities: (state, action) => {
      state.ticketQuantities = action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setEvent,
  setTicketQuantities,
  setTotalAmount,
  setLoading,
  setError,
} = singleEventSlice.actions;

// Selectors for accessing the data in Redux store
export const selectEvent = (state) => state.singleEvent.event;
export const selectTicketQuantities = (state) => state.singleEvent.ticketQuantities;
export const selectTotalAmount = (state) => state.singleEvent.totalAmount;
export const selectLoading = (state) => state.singleEvent.loading;
export const selectError = (state) => state.singleEvent.error;

export default singleEventSlice.reducer;
