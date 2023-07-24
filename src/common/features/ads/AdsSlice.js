import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feedAds: [],
  discussionAds: {},
};

const adsSlice = createSlice({
  name: "ads",
  initialState,

  reducers: {
    addFeedAds: (state, action) => {
      state.feedAds = action.payload;
    },

    addDisccussionAds: (state, action) => {
      state.discussionAds = action.payload;
    },
  },
});

export default adsSlice.reducer;
export const { addFeedAds, addDisccussionAds } = adsSlice.actions;
