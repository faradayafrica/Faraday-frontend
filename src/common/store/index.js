import { configureStore } from "@reduxjs/toolkit";
import univastReducer from "../features/auth/univastSlice";
import qfeedReducer from "../features/qfeed/qfeedSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    univast: univastReducer,
    qfeed: qfeedReducer,
    user: userReducer,
  },
});

export default store;
