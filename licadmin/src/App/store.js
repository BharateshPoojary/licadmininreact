import { configureStore } from "@reduxjs/toolkit";
import catReducer from "../slice/indexCatSlice.js";
import tempreducer from "../slice/tempSlice.js";
export default configureStore({
  reducer: {
    indexCatSlice: catReducer,
    tempSlice: tempreducer,
  },
});
