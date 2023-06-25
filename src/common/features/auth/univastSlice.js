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
  allCountries: [],
  allSchools: [],
  error: "",
};

export const fetchCountryThunk = createAsyncThunk(
  "univast/country",
  async (_, { rejectWithValue }) => {
    try {
      const response = await UnivastService.getCountries();
      return response;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

export const fetchSchoolThunk = createAsyncThunk(
  "univast/school",
  async ({ countryid }, { rejectWithValue }) => {
    try {
      const data = await UnivastService.getSchools(countryid);
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
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // ##############################
    // Extra Reducers for Countries
    // ##############################
    builder.addCase(fetchCountryThunk.pending, (state) => {
      state.status = UnivastStates.LOADING;
    });
    builder.addCase(fetchCountryThunk.fulfilled, (state, action) => {
      const { data, message: error } = action.payload;

      if (data) {
        state.allCountries = data;
        state.status = UnivastStates.SUCCESSFUL;
      } else {
        state.error = error;
      }
    });
    builder.addCase(fetchCountryThunk.rejected, (state) => {
      state.status = UnivastStates.FAILED;
    });

    // ##############################
    // Extra Reducers for Schools
    // ##############################

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

// export const allSchools = (state) => state.univast.allSchools;
// export const selectsignUp = (state) => state.signup;

export default univastSlice.reducer;
export const { resetError } = univastSlice.actions;
