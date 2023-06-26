import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  },
});

export default notificationSlice.reducer;
export const {
  updateFeed,
  updateQuestion,
  onChangeComment,
  updateProfile,
  resetProfile,
  hideSecondReply,
  hideThirdReply,
  optimisticQuestionVote,
  optimisticCommentVote,
  optimisticReplyVote,
  resetStatus,
  resetToast,
} = notificationSlice.actions;
