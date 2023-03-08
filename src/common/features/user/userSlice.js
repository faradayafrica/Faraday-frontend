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
  error: "",
  status: "base",
  toast: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},
});

export default userSlice.reducer;
// export const {} = userSlice.actions;
