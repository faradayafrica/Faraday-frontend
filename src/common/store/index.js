import { configureStore } from "@reduxjs/toolkit";
import univastReducer from "../features/auth/univastSlice";

const store = configureStore({
  reducer: {
    univast: univastReducer,
  },
});

export default store;
