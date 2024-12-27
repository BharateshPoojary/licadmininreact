import { createSlice } from "@reduxjs/toolkit";
const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export default loadingSlice.reducer;
export const { setLoading } = loadingSlice.actions;
