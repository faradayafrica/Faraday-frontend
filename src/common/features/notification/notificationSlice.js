import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { SuccessToast, NotificationToast } from "../../components/CustomToast";

export const NotificationStates = {
  BASE: "base",
  LOADING: "loading",
  SUCCESSFUL: "successful",
  FAILED: "failed",
};

const initialState = {
  notificationFeed: [],
  error: "",
};

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
      // console.log("VALUE", value);
      if (value.type !== "connection_established") {
        NotificationToast(value.message);
      }
      state.notificationFeed.unshift(value);
    },
  },
});

export default notificationSlice.reducer;
export const { updateFeed, addNewNotification } = notificationSlice.actions;
