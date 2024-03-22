import { createSlice } from "@reduxjs/toolkit";
import { grandpaapApi } from "../api/grandpaapApi";

const groupSlice = createSlice({
    name: "group",
    initialState: [],
    extraReducers: (builder) => {
      builder.addMatcher(
        grandpaapApi.endpoints.getGroup.matchFulfilled,
        (state, { payload }) => {
          return payload.results;
        }
      );
    },
  });
  export default groupSlice.reducer;
  
