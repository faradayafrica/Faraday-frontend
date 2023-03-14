import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findTargetComment } from "./commonActions";
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
    replyStatus: "base",
    reply2Status: "base",
  },
  feed: {
    qfeed: [],
    profile: {
      profileData: {},
      userQuestions: [],
      userSolutions: [],
      userBookmarks: [],
    },
  },
  error: "",
  status: "base",
  toast: "",
  check: "", // Used for debugging only
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

// Close/Open a question
export const closeQuestionThunk = createAsyncThunk(
  "qfeed/close-question",
  async ({ postid }, { rejectWithValue }) => {
    try {
      const response = await QService.closeQuestion(postid);
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

// Vote reply
export const voteCommentThunk = createAsyncThunk(
  "qfeed/vote-comment",
  async ({ commentid, value = "upvote" }, { rejectWithValue }) => {
    try {
      const response = await QService.voteComment(commentid, value);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Fetch a second lvl comment
export const fetchSecondLevelCommentThunk = createAsyncThunk(
  "qfeed/fetch-second-comment",
  async ({ commentid }, { rejectWithValue }) => {
    try {
      const response = await QService.fetchSecondComments(commentid);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Fetch a third level comment
export const fetchThirdLevelCommentThunk = createAsyncThunk(
  "qfeed/fetch-third-comment",
  async ({ commentid }, { rejectWithValue }) => {
    try {
      const response = await QService.fetchThirdComments(commentid);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Create a second lvl comment
export const createSecondLevelCommentThunk = createAsyncThunk(
  "qfeed/create-second-comment",
  async ({ commentid, content }, { rejectWithValue }) => {
    try {
      const response = await QService.createSecondComments(commentid, content);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Create a third level comment
export const createThirdLevelCommentThunk = createAsyncThunk(
  "qfeed/create-third-comment",
  async ({ commentid, content }, { rejectWithValue }) => {
    try {
      const response = await QService.createThirdComments(commentid, content);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Delete a Second level comment
export const deleteReplyThunk = createAsyncThunk(
  "qfeed/delete-second-comment",
  async ({ replyid }, { rejectWithValue }) => {
    try {
      const response = await QService.deleteReply(replyid);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Vote reply
export const voteReplyThunk = createAsyncThunk(
  "qfeed/vote-reply",
  async ({ replyid, value = "upvote" }, { rejectWithValue }) => {
    try {
      const response = await QService.voteReply(replyid, value);
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
    // <--------------Qfeed Home Reducers ----------->
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
    // <----------Comments Home Reducers ----------->
    hideSecondReply: (state, action) => {
      const { commentid } = action.payload;

      const targetIndex = state.thisQuestion.comments.findIndex(
        (comment) => comment.id === commentid
      );
      // value = comment id
      if (state.thisQuestion.comments[targetIndex].replies) {
        state.thisQuestion.comments[targetIndex].replies = {
          ...state.thisQuestion.comments[targetIndex].replies,
          showReply: false,
          data: [],
        };
      }
    },

    hideThirdReply: (state, action) => {
      const { replyid } = action.payload;
      // value = reply parent id

      const targetComment = findTargetComment(
        state.thisQuestion.comments,
        replyid
      );

      const targetCommentIndex = state.thisQuestion.comments.findIndex(
        (comment) => comment.id === targetComment.id
      );

      const replyTarget = state.thisQuestion.comments[
        targetCommentIndex
      ].replies.data.findIndex((reply) => reply.id === replyid);

      // value = {id: , }
      if (
        state.thisQuestion.comments[targetCommentIndex].replies.data[
          replyTarget
        ]
      ) {
        state.thisQuestion.comments[targetCommentIndex].replies.data[
          replyTarget
        ].replies = {
          ...state.thisQuestion.comments[targetCommentIndex].replies.data[
            replyTarget.replies
          ],
          showReply: false,
          data: [],
        };
      }
    },

    // <--------------Profile Reducers ----------->
    updateProfile: (state, action) => {
      const { name, value } = action.payload;
      state.feed.profile = {
        ...state.feed.profile,
        [name]: value,
      };
    },

    resetProfile: (state) => {
      state.feed.profile = initialState.feed.profile;
    },

    resetStatus: (state) => {
      state.base = QfeedStates.BASE;
    },

    resetToast: (state) => {
      state.base = "";
    },
  },

  extraReducers: (builder) => {
    // <--------------------Question Actions------------------------------>
    // Extra Reducers for follow action
    builder.addCase(followUserThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(followUserThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;

      if (data) {
        // Update Qfeed on home Page
        const feed = state.feed.qfeed;
        for (let i = 0; i < feed.length; i++) {
          if (feed[i].user.username === data.username) {
            feed[i].user.is_following = data.is_following;
          }
        }
        state.feed.qfeed = feed;

        // Update the profile data
        if (
          state.feed.profile.profileData &&
          state.feed.profile.profileData?.username === data.username
        ) {
          const cloneThisProfile = { ...state.feed.profile.profileData };
          cloneThisProfile.profile.is_following = data.is_following;
          state.feed.profile.profileData = cloneThisProfile;
        }

        // Update Profile Question feed
        const newUserQuestionFeed = state.feed.profile.userQuestions;
        for (let i = 0; i < newUserQuestionFeed.length; i++) {
          if (newUserQuestionFeed[i].user.username === data.username) {
            newUserQuestionFeed[i].user.is_following = data.is_following;
          }
        }
        state.feed.profile.userQuestions = newUserQuestionFeed;

        // Update Profile Bookmark feed
        const newUserBookmarkFeed = state.feed.profile.userBookmarks;
        for (let i = 0; i < newUserBookmarkFeed.length; i++) {
          if (newUserBookmarkFeed[i].user.username === data.username) {
            newUserBookmarkFeed[i].user.is_following = data.is_following;
          }
        }
        state.feed.profile.userBookmarks = newUserBookmarkFeed;

        // Update Profile Solution feed
        const newUserSolutionFeed = state.feed.profile.userSolutions;
        for (let i = 0; i < newUserSolutionFeed.length; i++) {
          if (newUserSolutionFeed[i].question.user.username === data.username) {
            newUserSolutionFeed[i].question.user.is_following =
              data.is_following;
          }
        }
        state.feed.profile.userSolutions = newUserSolutionFeed;

        //Updates opened question on DiscussionPage
        if (
          state.thisQuestion.question &&
          state.thisQuestion?.question?.user?.id === data.id
        ) {
          const cloneThisQuestion = { ...state.thisQuestion.question };
          cloneThisQuestion.user.is_following = data.is_following;
          state.thisQuestion.question = cloneThisQuestion;
        }

        // Update All level of replies
        const _comments = state.thisQuestion.comments;
        for (let parent of state.thisQuestion.comments) {
          parent.user.is_following = data.is_following; // Updates 1st level comment
          if (parent.replies) {
            for (let child of parent?.replies?.data) {
              if (child.by_user) {
                child.by_user.is_following = data.is_following; // Updates 2nd level reply
              }

              if (child.replies) {
                for (let grandchild of child?.replies?.data) {
                  if (grandchild.by_user) {
                    grandchild.by_user.is_following = data.is_following; // Updates 3rd level reply
                  }
                }
              }
            }
          }
        }
        state.thisQuestion.comments = _comments;

        state.status = QfeedStates.SUCCESSFUL;
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
      // console.log(data, state.status, "create que");

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
      // console.log(data, "delete");

      if (data) {
        // Update qfeed home after delete
        const newFeed = state.feed.qfeed.filter(
          (question) => question.id !== data.queid
        );
        state.feed.qfeed = newFeed;

        // Update Profile Question feed
        const newUserQuestionFeed = state.feed.profile.userQuestions.filter(
          (question) => question.id !== data.queid
        );
        state.feed.profile.userQuestions = newUserQuestionFeed;

        // Update Profile Bookmark feed
        const newUserBookmarkFeed = state.feed.profile.userBookmarks.filter(
          (question) => question.id !== data.queid
        );
        state.feed.profile.userBookmarks = newUserBookmarkFeed;

        // Update Profile Solution feed
        const newUserSolutionFeed = state.feed.profile.userSolutions.filter(
          (soln) => soln.question.id !== data.queid
        );
        state.feed.profile.userSolutions = newUserSolutionFeed;

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
      // console.log(data, "vote");

      if (data) {
        // Updates the qfeed Home
        const newFeed = state.feed.qfeed.map((question) =>
          question.id === data.id ? data : question
        );
        state.feed.qfeed = newFeed;

        // Updates the profile question feed
        const newUserQuestionFeed = state.feed.profile.userQuestions.map(
          (question) => (question.id === data.id ? data : question)
        );
        state.feed.profile.userQuestions = newUserQuestionFeed;

        // Updates the profile bookmarks feed
        const newUserBookmarkFeed = state.feed.profile.userBookmarks.map(
          (question) => (question.id === data.id ? data : question)
        );
        state.feed.profile.userBookmarks = newUserBookmarkFeed;

        // Updates the profile Solution feed
        const newUserSolutionFeed = state.feed.profile.userSolutions.map(
          (solution) =>
            solution.question.id === data.id
              ? { ...solution, question: data }
              : solution
        );
        state.feed.profile.userSolutions = newUserSolutionFeed;

        // Update the discussionPage after voting
        state.thisQuestion.question = data;
        state.status = QfeedStates.SUCCESSFUL;
      }
    });
    builder.addCase(voteQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers to close a question
    builder.addCase(closeQuestionThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(closeQuestionThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      // console.log(data, "close q");

      if (data) {
        // Updates the qfeed Home
        const newFeed = state.feed.qfeed.map((question) =>
          question.id === data.id ? data : question
        );
        state.feed.qfeed = newFeed;

        // Updates the profile question feed
        const newUserQuestionFeed = state.feed.profile.userQuestions.map(
          (question) => (question.id === data.id ? data : question)
        );
        state.feed.profile.userQuestions = newUserQuestionFeed;

        // Updates the profile bookmarks feed
        const newUserBookmarkFeed = state.feed.profile.userBookmarks.map(
          (question) => (question.id === data.id ? data : question)
        );
        state.feed.profile.userBookmarks = newUserBookmarkFeed;

        // Updates the profile Solution feed
        const newUserSolutionFeed = state.feed.profile.userSolutions.map(
          (solution) =>
            solution.question.id === data.id
              ? { ...solution, question: data }
              : solution
        );
        state.feed.profile.userSolutions = newUserSolutionFeed;

        // Update the discussionPage after voting
        state.thisQuestion.question = data;
        state.status = QfeedStates.SUCCESSFUL;
      }
    });
    builder.addCase(closeQuestionThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // <--------------------Comment Actions------------------------------>

    // Extra Reducers for mark Solution
    builder.addCase(markSolutionThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(markSolutionThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      // console.log(data, "mark soln");

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
          (comment) => comment.id !== data.id
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
      // console.log(data, "create comment");

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

    // Extra reducer for fetching the Second comment Level
    builder.addCase(fetchSecondLevelCommentThunk.pending, (state) => {
      state.thisQuestion.replyStatus = QfeedStates.LOADING;
    });
    builder.addCase(fetchSecondLevelCommentThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const parent_id = data.results?.[0].parent_id; // Get the parent id
      // console.log(data, "second lvl comment");

      const newCommentReplies = state.thisQuestion.comments.map((comment) =>
        comment.id === parent_id
          ? {
              ...comment,
              replies: { next: data.next, data: data.results, showReply: true },
            }
          : {
              ...comment,
              replies: { next: "", data: [], showReply: false },
            }
      );
      state.thisQuestion.comments = newCommentReplies;

      // state.thisQuestion.comments;
      state.thisQuestion.replyStatus = QfeedStates.SUCCESSFUL;
    });
    builder.addCase(fetchSecondLevelCommentThunk.rejected, (state) => {
      state.thisQuestion.replyStatus = QfeedStates.FAILED;
    });

    // Extra reducer for fetching the Third comment Level
    builder.addCase(fetchThirdLevelCommentThunk.pending, (state) => {
      state.thisQuestion.reply2Status = QfeedStates.LOADING;
    });
    builder.addCase(fetchThirdLevelCommentThunk.fulfilled, (state, action) => {
      const data = action.payload;
      const parent_id = data?.results?.[0]?.parent_id; // Get the parent id
      // console.log(data, "third lvl comment");

      let targetComment = findTargetComment(
        state.thisQuestion.comments,
        parent_id
      );

      // Modify the mother/target comment to have the grandchildren comments
      if (data.results.length > 0) {
        const targetCommentReply = targetComment.replies.data.map((reply) =>
          reply.id === parent_id
            ? {
                ...reply,
                replies: {
                  next: data.next,
                  data: data.results,
                  showReply: true,
                },
              }
            : reply
        );
        targetComment.replies.data = targetCommentReply;

        // Find the index of the comment to be replaced
        const index = state.thisQuestion.comments.findIndex(
          (comment) => comment.id === targetComment.id
        );

        // Replace the old target comment by the modified target comment
        state.thisQuestion.comments[index] = targetComment;
      }

      state.thisQuestion.reply2Status = QfeedStates.SUCCESSFUL;
    });
    builder.addCase(fetchThirdLevelCommentThunk.rejected, (state) => {
      state.thisQuestion.reply2Status = QfeedStates.FAILED;
    });

    // Extra Reducers for create 2nd level reply action
    builder.addCase(createSecondLevelCommentThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(
      createSecondLevelCommentThunk.fulfilled,
      (state, action) => {
        const { data, message: error } = action.payload;

        const _comments = state.thisQuestion.comments;

        for (let parent of _comments) {
          if (parent.id === data.parent_id) {
            if (parent.replies) {
              parent.replies.data = [data, ...parent.replies.data];
            } else {
              parent.replies = { data: [data], next: null, showReply: false }; // Previews the newly added reply
            }
            parent.reply_count = parent.reply_count + 1;
          }
        }
        state.status = QfeedStates.SUCCESSFUL;
      }
    );
    builder.addCase(createSecondLevelCommentThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for create 3rd level reply action
    builder.addCase(createThirdLevelCommentThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(createThirdLevelCommentThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, "3rd Level create");

      const _comments = state.thisQuestion.comments;

      for (let parent of _comments) {
        if (parent.replies) {
          for (let child of parent.replies.data) {
            if (child.id === data.parent_id) {
              if (child.replies) {
                child.replies.data = [data, ...child.replies.data];
              } else {
                child.replies = { data: [data], next: null, showReply: false }; // Previews the newly added reply`
              }
              child.sub_count = child.sub_count + 1;
            }
          }
        }
      }
      state.status = QfeedStates.SUCCESSFUL;
    });
    builder.addCase(createThirdLevelCommentThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for delete 2nd level reply action
    builder.addCase(deleteReplyThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(deleteReplyThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, "3rd Level delete");

      const _comments = state.thisQuestion.comments;

      for (let parent of _comments) {
        if (parent.replies) {
          // Targeted comment

          // Find the index of the reply to remove
          let index = parent?.replies?.data.findIndex(
            (reply) => reply.id === data.id
          );

          // Use the splice() method to remove the object from the array
          if (index !== -1) {
            parent?.replies?.data.splice(index, 1);
          }

          parent.replies.data.filter((reply) => reply.id !== data.id);
          for (let child of parent.replies.data) {
            if (child.replies) {
              // Find the index of the reply to remove
              let index = child?.replies?.data.findIndex(
                (reply) => reply.id === data.id
              );

              // Use the splice() method to remove the object from the array
              if (index !== -1) {
                child?.replies?.data.splice(index, 1);
              }
            }
          }
        }
      }
      state.status = QfeedStates.SUCCESSFUL;
    });
    builder.addCase(deleteReplyThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for vote reply action
    builder.addCase(voteReplyThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(voteReplyThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      // console.log(data, "Reply vote");

      const _comments = state.thisQuestion.comments;

      for (let parent of _comments) {
        if (parent.replies) {
          // Targeted comment

          // Find the index of the reply to update
          let index = parent?.replies?.data.findIndex(
            (reply) => reply.id === data.id
          );

          // Use the splice() method to remove the object from the array
          if (index !== -1) {
            parent?.replies?.data.splice(index, 1, { ...data });
          }

          parent.replies.data.filter((reply) => reply.id !== data.id);
          for (let child of parent.replies.data) {
            if (child.replies) {
              // Find the index of the reply to remove
              let index = child?.replies?.data.findIndex(
                (reply) => reply.id === data.id
              );

              // Use the splice() method to remove the object from the array
              if (index !== -1) {
                child?.replies?.data.splice(index, 1, { ...data });
              }
            }
          }
        }
      }

      state.status = QfeedStates.SUCCESSFUL;
    });
    builder.addCase(voteReplyThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });

    // Extra Reducers for vote comment action
    builder.addCase(voteCommentThunk.pending, (state) => {
      state.status = QfeedStates.LOADING;
    });
    builder.addCase(voteCommentThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, "Reply comment");

      const _comments = state.thisQuestion.comments;

      // Find the index of the comment to update
      let index = _comments.findIndex((comment) => comment.id === data.id);

      // Use the splice() method to remove the object from the array
      if (index !== -1) {
        _comments.splice(index, 1, { ...data });
      }

      state.status = QfeedStates.SUCCESSFUL;
    });
    builder.addCase(voteCommentThunk.rejected, (state) => {
      state.status = QfeedStates.FAILED;
    });
  },
});

export default qfeedSlice.reducer;
export const {
  updateFeed,
  updateQuestion,
  updateProfile,
  resetProfile,
  hideSecondReply,
  hideThirdReply,
  resetStatus,
  resetToast,
} = qfeedSlice.actions;
