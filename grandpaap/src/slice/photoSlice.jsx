import { createSlice } from "@reduxjs/toolkit";
import { grandpaapApi } from "../api/grandpaapApi";

const photoSlice = createSlice({
    name: "photo",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
       grandpaapApi.endpoints.getPhoto.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default photoSlice.reducer;
  
