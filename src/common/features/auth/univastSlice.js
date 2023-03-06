import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UnivastService from "./univastService";

export const UnivastStates = {
  BASE: "base",
  LOADING: "loading",
  SUCCESSFUL: "successful",
  FAILED: "failed",
};

const initialState = {
  status: UnivastStates.BASE,
  data: {
    school: "",
    faculty: "",
    department: "",
    level: "",
  },
  allSchools: [],
  error: "",
};

export const fetchSchoolThunk = createAsyncThunk(
  "univast/school",
  async (_, { rejectWithValue }) => {
    try {
      const data = await UnivastService.getSchools();
      return data;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// export const fetchSchoolThunk = createAsyncThunk("user/fetchUser", async () => {
//   const response = await UnivastService.getSchools(); // some async API call
//   return response.data;
// });

const univastSlice = createSlice({
  name: "univast",
  initialState,

  reducers: {
    updateData: (state, action) => {
      const { name, value } = action.payload;
      console.log(value, "*****");
      state.data = {
        ...state.data,
        [name]: value,
      };
    },

    resetError: (state) => {
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSchoolThunk.pending, (state) => {
      state.status = UnivastStates.LOADING;
    });
    builder.addCase(fetchSchoolThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;
      if (data) {
        state.allSchools = data;
        state.status = UnivastStates.SUCCESSFUL;
      } else {
        state.error = error;
      }
    });
    builder.addCase(fetchSchoolThunk.rejected, (state) => {
      state.status = UnivastStates.FAILED;
    });
  },
});

export const allSchools = (state) => state.univast.allSchools;
export const selectsignUp = (state) => state.signup;

export default univastSlice.reducer;
export const { updateData, resetError } = univastSlice.actions;
