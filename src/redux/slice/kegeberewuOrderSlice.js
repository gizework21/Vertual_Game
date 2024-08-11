import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentFetchedData: null,
  loading: false,
  error: false,
};

const KegeberewuOrderListSlice = createSlice({
  name: 'KegeberewuOrderList',
  initialState,
  reducers: {
    fetchingStart: (state) => {
        state.loading = true;
      },
    getKegeberewuOrder: (state, action) => {
      state.currentFetchedData = action.payload;
      state.loading = false;
      state.error = false;
    },
    getKegeberewuOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },  
  },
});

export const {
    getKegeberewuOrder,
    getKegeberewuOrderFailure,
    fetchingStart,
} = KegeberewuOrderListSlice.actions;

export default KegeberewuOrderListSlice.reducer;