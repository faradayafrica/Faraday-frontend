import { configureStore } from "@reduxjs/toolkit";
import univastReducer from "../features/auth/univastSlice";
import qfeedReducer from "../features/qfeed/qfeedSlice";
import userReducer from "../features/user/userSlice";
import notificationReducer from "../features/notification/notificationSlice";
import AdsReducer from "../features/ads/AdsSlice";

const store = configureStore({
  reducer: {
    univast: univastReducer,
    qfeed: qfeedReducer,
    notification: notificationReducer,
    user: userReducer,
    ads: AdsReducer,
  },
});

export default store;
