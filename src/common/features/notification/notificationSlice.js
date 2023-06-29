import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationToast } from "../../components/CustomToast";
import alertSound from "../../../common/assets/sound/alert1.wav";

export const NotificationStates = {
  BASE: "base",
  LOADING: "loading",
  SUCCESSFUL: "successful",
  FAILED: "failed",
};

const initialState = {
  notificationFeed: [],
  unreadCount: 0,
  error: "",
};

function play() {
  new Audio(alertSound).play();
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    updateFeed: (state, action) => {
      const { value } = action.payload;
      state.notificationFeed = value;
    },

    addNewNotification: (state, action) => {
      const { value } = action.payload;
      if (value.type !== "connection_established") {
        NotificationToast(value?.message);
        play();
        state.notificationFeed.unshift(value);
        state.unreadCount = state.unreadCount + 1;
      } else {
        state.unreadCount = value?.notification_count;
        // console.log("VALUE", value);
      }
    },

    resetReadCount: (state) => {
      state.unreadCount = 0;
    },
  },
});

export default notificationSlice.reducer;
export const { updateFeed, addNewNotification, resetReadCount } =
  notificationSlice.actions;
