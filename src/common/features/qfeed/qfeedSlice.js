import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QService from "./QfeedServices";

export const QfeedStates = {
  BASE: "base",
  LOADING: "loading",
  SUCCESSFUL: "successful",
  FAILED: "failed",
};

const initialState = {
  thisQuestion: {
    question: {},
    comments: {},
  },
  feed: {
    qfeed: [],
    profile: [],
  },
  error: "",
  status: "base",
  toast: "",
};

// Follow a user
export const followUserThunk = createAsyncThunk(
  "qfeed/follow-user",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await QService.followUser(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Ask a question
export const createQuestionThunk = createAsyncThunk(
  "qfeed/create-question",
  async ({ title, content }, { rejectWithValue }) => {
    try {
      const response = await QService.createQuestion(title, content);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Delete a question
export const deleteQuestionThunk = createAsyncThunk(
  "qfeed/delete-question",
  async ({ ques_id }, { rejectWithValue }) => {
    try {
      const response = await QService.deleteQuestion(ques_id);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Vote a question
export const voteQuestionThunk = createAsyncThunk(
  "qfeed/vote-question",
  async ({ postid, value = "upvote" }, { rejectWithValue }) => {
    try {
      console.log(postid, value);
      const response = await QService.voteQuestion(postid, value);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const qfeedSlice = createSlice({
  name: "qfeed",
  initialState,

  reducers: {
    updateFeed: (state, action) => {
      const { name, value } = action.payload;
      state.feed = {
        ...state.feed,
        [name]: value,
      };
    },
    updateQuestion: (state, action) => {
      const { value } = action.payload;
      state.thisQuestion.question = value;
    },
    resetStatus: (state) => {
      state.base = QfeedStates.BASE;
    },
    resetToast: (state) => {
      state.base = "";
    },
  },

  // Extra Reducers for follow action
  extraReducers: (builder) => {
    builder.addCase(followUserThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(followUserThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      //   console.log(data, "follow");

      if (data) {
        const feed = state.feed.qfeed;

        // Update Qfeed on home Page
        for (let i = 0; i < feed.length; i++) {
          if (feed[i].user.username === data.profile.username) {
            feed[i].user.is_following = !feed?.[i]?.user?.is_following;
            // TODO: Modify with the data from BE rather than toggling the boolean
          }
        }
        state.feed.qfeed = feed;
        state.status = QfeedStates.SUCCESSFUL;
        // TODO: We can replicate this filter for profile and
        // other question feed added to the project in the future

        //Updates opened question on DiscussionPage
        if (state.thisQuestion.question.user.id === data?.profile?.id) {
          const cloneThisQuestion = { ...state.thisQuestion.question };
          cloneThisQuestion.user.is_following =
            !cloneThisQuestion.user.is_following;
          state.thisQuestion.question = cloneThisQuestion;
        }
      } else {
        state.error = error;
      }
    });
    builder.addCase(followUserThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for creating a question
    builder.addCase(createQuestionThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(createQuestionThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, state.status, "create que");

      if (data) {
        // Updates the qfeed after voting
        state.feed.qfeed = [data, ...state.feed.qfeed];
        state.thisQuestion.question = {};
        state.status = QfeedStates.SUCCESSFUL;
        state.toast = "Success";
      }
    });
    builder.addCase(createQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for delete action
    builder.addCase(deleteQuestionThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(deleteQuestionThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;

      if (data) {
        // Update qfeed home after delete
        const newFeed = state.feed.qfeed.filter(
          (question) => question.id !== data.queid
        );
        state.feed.qfeed = newFeed;
        state.status = QfeedStates.SUCCESSFUL;
      }
    });
    builder.addCase(deleteQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for question vote action
    builder.addCase(voteQuestionThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(voteQuestionThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, "vote");

      if (data) {
        // Updates the qfeed after voting
        const newFeed = state.feed.qfeed.map((question) =>
          question.id === data.id ? data : question
        );

        state.feed.qfeed = newFeed;

        // Update the discussionPage after voting
        state.thisQuestion.question = data;
      }
    });
    builder.addCase(voteQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });
  },
});

export default qfeedSlice.reducer;
export const { updateFeed, updateQuestion, resetStatus, resetToast } =
  qfeedSlice.actions;
