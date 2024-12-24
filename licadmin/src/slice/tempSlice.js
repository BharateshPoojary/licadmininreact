import { createSlice } from "@reduxjs/toolkit";
const tempSlice = createSlice({
  name: "tempSlice",
  initialState: {
    tempId: 0,
    tempName: "",
    tempImg: "",
  },
  reducers: {
    setTempId: (state, action) => {
      state.tempId = action.payload;
    },
    setTempName: (state, action) => {
      state.tempName = action.payload;
    },
    setTempImg: (state, action) => {
      state.tempImg = action.payload;
    },
  },
});
export default tempSlice.reducer;
export const { setTempId, setTempName, setTempImg } = tempSlice.actions;
