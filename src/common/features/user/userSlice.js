import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "./userServices";

export const userStates = {
  BASE: "base",
  LOADING: "loading",
  SUCCESSFUL: "successful",
  FAILED: "failed",
};

const initialState = {
  data: {},
  onlineStatus: {
    online: true,
    visible: false,
  },
  error: "",
  status: "base",
  toast: "",
};

// Follow a user
export const currentUserThunk = createAsyncThunk(
  "user/user-data",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await UserService.fetchUserProfile(username);
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    updateOnline: (state, action) => {
      console.log(action.payload);
      const { name, value } = action.payload;

      state.onlineStatus = {
        ...state.onlineStatus,
        [name]: value,
      };
      state.online = value;
    },
  },

  extraReducers: (builder) => {
    // Extra Reducers for feting current User
    builder.addCase(currentUserThunk.pending, (state) => {
      state.status = userStates.LOADING;
    });
    builder.addCase(currentUserThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      console.log(data, "fetch current user");

      if (data) {
        state.data = data;
        state.status = userStates.SUCCESSFUL;
      }
    });
    builder.addCase(currentUserThunk.rejected, (state) => {
      state.status = userStates.FAILED;
    });
  },
});

export default userSlice.reducer;
export const { updateOnline } = userSlice.actions;
