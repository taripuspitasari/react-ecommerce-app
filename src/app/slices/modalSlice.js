import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    type: "",
    data: null,
    selectedAddress: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.data = action.payload.data || null;
    },
    closeModal: state => {
      state.type = "";
      state.data = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const {openModal, closeModal, setSelectedAddress} = modalSlice.actions;
export default modalSlice.reducer;
