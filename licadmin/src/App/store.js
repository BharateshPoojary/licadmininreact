import { configureStore } from "@reduxjs/toolkit";
import catReducer from "../slice/indexCatSlice.js";
export default configureStore({
  reducer: {
    indexCatSlice: catReducer,
  },
});
