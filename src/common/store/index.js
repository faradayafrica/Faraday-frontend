import { configureStore } from "@reduxjs/toolkit";
import univastReducer from "../features/auth/univastSlice";
import qfeedReducer from "../features/qfeed/qfeedSlice";

const store = configureStore({
  reducer: {
    univast: univastReducer,
    qfeed: qfeedReducer,
  },
});

export default store;
