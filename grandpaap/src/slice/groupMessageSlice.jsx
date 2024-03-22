import { createSlice } from "@reduxjs/toolkit";
import { grandpaapApi } from "../api/grandpaapApi";

const groupMessageSlice = createSlice({
    name: "groupMessage",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        grandpaapApi.endpoints.getGroupmessage.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default groupMessageSlice.reducer;
  
