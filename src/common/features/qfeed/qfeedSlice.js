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
    comments: [],
    shortLink: "",
  },
  feed: {
    qfeed: [],
    profile: {
      userQuestions: [],
      userSolutions: [],
      userBookmarks: [],
    },
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
      const response = await QService.voteQuestion(postid, value);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// <--------------------Comment Thunk------------------------------>

// Mark a comment as Solution
export const markSolutionThunk = createAsyncThunk(
  "qfeed/mark-solution",
  async ({ postid, commentid }, { rejectWithValue }) => {
    try {
      const response = await QService.markSolution(postid, commentid);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Delete a comment
export const deleteCommentThunk = createAsyncThunk(
  "qfeed/delete-comment",
  async ({ ques_id, commentid }, { rejectWithValue }) => {
    try {
      const response = await QService.deleteComment(ques_id, commentid);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Create a comment
export const createCommentThunk = createAsyncThunk(
  "qfeed/create-comment",
  async ({ postid, content }, { rejectWithValue }) => {
    try {
      const response = await QService.createComment(postid, content);
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
      const { name, value } = action.payload;
      state.thisQuestion = {
        ...state.thisQuestion,
        [name]: value,
      };
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
      // console.log(data, "follow");

      if (data) {
        // Update Qfeed on home Page
        const feed = state.feed.qfeed;
        for (let i = 0; i < feed.length; i++) {
          if (feed[i].user.username === data.username) {
            feed[i].user.is_following = data.is_following;
          }
        }
        state.feed.qfeed = feed;
        state.status = QfeedStates.SUCCESSFUL;

        // Update Comments from discussion page
        const comments = state.thisQuestion.comments;
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].user.username === data.username) {
            comments[i].user.is_following = data.is_following;
          }
        }
        state.thisQuestion.comments = comments;

        //Updates opened question on DiscussionPage
        if (state.thisQuestion.question.user.id === data.id) {
          const cloneThisQuestion = { ...state.thisQuestion.question };
          cloneThisQuestion.user.is_following = data.is_following;
          state.thisQuestion.question = cloneThisQuestion;
          console.log(data.is_following);
        }

        // TODO: We can replicate this filter for profile and
        // other question feed added to the project in the future
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
        // Updates the qfeed
        state.feed.qfeed = [data, ...state.feed.qfeed];
        state.thisQuestion.question = {};
        state.status = QfeedStates.SUCCESSFUL;
        state.toast = "Success";
      }
    });
    builder.addCase(createQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for delete question action
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

      if (data) {
        // Updates the qfeed after voting
        const newFeed = state.feed.qfeed.map((question) =>
          question.id === data.id ? data : question
        );
        state.feed.qfeed = newFeed;

        // Update the discussionPage after voting
        state.thisQuestion.question = data;
        state.status = QfeedStates.SUCCESSFUL;
      }
    });
    builder.addCase(voteQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // <--------------------Comment Actions------------------------------>

    // Extra Reducers for mark Solution
    builder.addCase(markSolutionThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(markSolutionThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;

      if (data) {
        // Updates the solution from the comments array
        const newComments = state.thisQuestion.comments.map((comment) => {
          if (comment.id === data.id) {
            return Object.assign({}, data);
          } else {
            return Object.assign({}, comment, { is_solution: false });
          }
        });
        state.thisQuestion.comments = newComments;
        state.status = QfeedStates.SUCCESSFUL;

        // Update solution for question on the Qfeed Home
        const newFeed = state.feed.qfeed;
        const question = newFeed.find(
          (q) => q.id === state.thisQuestion.question.id
        );
        if (question) {
          question.solution = data;
        }
        state.feed.qfeed = newFeed;
      }
    });
    builder.addCase(markSolutionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for delete comment action
    builder.addCase(deleteCommentThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(deleteCommentThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;

      if (data) {
        // Update the comment list
        const newCommnets = state.thisQuestion.comments.filter(
          (comment) => comment.id !== data.commentid
        );
        state.thisQuestion.comments = newCommnets;

        // Find the question on Qfeed and decrement it's comment count
        const newFeed = state.feed.qfeed;
        const question = newFeed.find((q) => q.id === data.queid);
        if (question) {
          question.comments = question.comments - 1;
        }
        state.feed.qfeed = newFeed;

        state.status = QfeedStates.SUCCESSFUL;
      }
    });
    builder.addCase(deleteCommentThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for creating a comment
    builder.addCase(createCommentThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(createCommentThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, "create comment");

      if (data) {
        // Add the new comment on the comments feed
        state.thisQuestion.comments = [data, ...state.thisQuestion.comments];

        // Update comment count on the discussion page
        state.thisQuestion.question.comments =
          state.thisQuestion.question.comments + 1;

        // Update comment count on that question on qfeed home
        const newFeed = state.feed.qfeed;
        const question = newFeed.find(
          (q) => q.id === state.thisQuestion.question.id
        );
        if (question) {
          question.comments = question.comments + 1;
        }
        state.feed.qfeed = newFeed;

        state.status = QfeedStates.SUCCESSFUL;
      }
    });
    builder.addCase(createCommentThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });
  },
});

export default qfeedSlice.reducer;
export const { updateFeed, updateQuestion, resetStatus, resetToast } =
  qfeedSlice.actions;
