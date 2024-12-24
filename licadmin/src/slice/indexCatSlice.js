import { createSlice } from "@reduxjs/toolkit";
const indexCatSlice = createSlice({
  name: "indexCatSlice",
  initialState: {
    stateCatId: 0,
    stateCatName: "",
  },
  reducers: {
    setStateCatId: (state, action) => {
      state.stateCatId = action.payload;
    },
    setStateCatName: (state, action) => {
      state.stateCatName = action.payload;
    },
  },
});
export default indexCatSlice.reducer;
export const { setStateCatId, setStateCatName } = indexCatSlice.actions;
