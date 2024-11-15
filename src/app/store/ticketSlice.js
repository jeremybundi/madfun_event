import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  event: null,
  ticketQuantities: {},
  totalAmount: 0,
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setEventDetails(state, action) {
      state.event = action.payload;
    },
    updateTicketQuantity(state, action) {
      const { ticketId, quantity } = action.payload;
      state.ticketQuantities[ticketId] = quantity;
    },
    setTotalAmount(state, action) {
      state.totalAmount = action.payload;
    },
  },
});

export const { setEventDetails, updateTicketQuantity, setTotalAmount } = ticketSlice.actions;
export default ticketSlice.reducer;
