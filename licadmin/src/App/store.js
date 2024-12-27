import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/slice/loading";
export default configureStore({
  reducer: {
    loadingSlice: loadingReducer,
  },
});
