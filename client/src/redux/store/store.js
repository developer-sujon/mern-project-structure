//external import
import { configureStore } from "@reduxjs/toolkit";
import settingSlice from "../features/settingSlice";

const store = configureStore({
  reducer: {
    setting: settingSlice,
  },
});

export default store;
