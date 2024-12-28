import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "@/slice/loading";
import sidebarReducer from "@/slice/sidebarslice";
export default configureStore({
  reducer: {
    loadingSlice: loadingReducer,
    sidebarSlice: sidebarReducer,
  },
});
