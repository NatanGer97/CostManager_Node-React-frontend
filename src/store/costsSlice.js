import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { json } from "react-router-dom";
import authHeader from "../services/auth-header";
import AuthService from "../services/authService";

const URL = "http://localhost:3000/expenses";

const initState = {
  entities: [],
  loading: false,

};
export const postCost = createAsyncThunk(
  "costs/postCost",
  async (thunkAPI, { rejectWithValue }) => {
 
      try {
      const response = await axios.post(
        `${URL}/${thunkAPI.selectedCategory}/${thunkAPI.userId}`,
        { sum: thunkAPI.sum, description: thunkAPI.description },
        { headers: authHeader() }
      );
      
      return response.data;

    
    } catch (error) {
      return rejectWithValue({
        message: "Opps there seems to be an error",
        error: error,
      });
    }
  }
);
export const getCosts = createAsyncThunk(
  // action type : string
  "costs/getCosts",
  async (thunkAPI) => {
    const response = await fetch(`${URL}/${thunkAPI.userId}`, {
      headers: {
        authorization: "Bearer " + AuthService.getCurrentUser().token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      return response;
    }
  }
);

export const costsSlice = createSlice({
  name: "costs",
  initialState: initState,
  reducers: {},
  extraReducers: {
    [getCosts.pending]: (state) => {
      state.loading = true;
    },
    [getCosts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getCosts.rejected]: (state) => {
      state.loading = false;
    },
  },

  [postCost.pending]: (state) => {
    state.loading = true;
  },
  [postCost.fulfilled]: (state, action) => {
    state.loading = false;
    
  },
  [postCost.rejected]: (state, action) => {
    state.loading = false;
    console.log(action.payload);
  },
});

export const costsReducer = costsSlice.reducer;
