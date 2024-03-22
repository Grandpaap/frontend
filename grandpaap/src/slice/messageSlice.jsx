import { createSlice } from "@reduxjs/toolkit";
import { grandpaapApi } from "../api/grandpaapApi";

const messageSlice = createSlice({
    name: "message",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        grandpaapApi.endpoints.getMessage.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default messageSlice.reducer;
  
