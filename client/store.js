/* eslint-disable no-param-reassign */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const dateState = {
  checkin: null,
  checkout: null,
};

const dateSlice = createSlice({
  name: 'dates',
  initialState: dateState,
  reducers: {
    changeCheckin(state, action) {
      state.checkin = action.payload;
    },
    changeCheckout(state, action) {
      state.checkout = action.payload;
    },
  },
});

const roomState = {
  room: {
    price: 50,
    reviewScore: 3.00,
    reviews: 2,
    cleaning: 20,
    tax: 15,
    id: 0,
    service: 80,
    maxGuests: 3,
  },
  error: null,
};

const roomData = createSlice({
  name: 'room',
  initialState: roomState,
  reducers: {
    loadDataSuccess(state, action) {
      state.room = action.payload;
      state.error = null;
    },
    loadDataFailure(state, action) {
      state.room = null;
      state.error = action.payload;
    },
  },
});


const dateReducer = dateSlice.reducer;
const roomReducer = roomData.reducer;

const store = configureStore({
  reducer: {
    dateReducer,
    roomReducer,
  },
});

export default store;

export const { changeCheckin, changeCheckout } = dateSlice.actions;
export const { loadDataSuccess, loadDataFailure } = roomData.actions;

export const fetchData = (record) => async (dispatch) => {
  let response;
  try {
    response = await axios.get(`/api/room/${record}`);
  } catch (err) {
    dispatch(loadDataFailure(JSON.stringify(err)));
    console.log('Error in fetchData:', err);
    return;
  }
  dispatch(loadDataSuccess(response.data));
};
