import { createSlice } from "@reduxjs/toolkit";
const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: {
    status: "",
  },
  reducers: {
    toggleSidebar: (state, action) => {
      state.status = action.payload;
    },
  },
});
export default sidebarSlice.reducer;
export const { toggleSidebar } = sidebarSlice.actions;
