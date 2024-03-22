import { createSlice } from "@reduxjs/toolkit";
import { grandpaapApi } from "../api/grandpaapApi";

const groupMembershipSlice = createSlice({
  name: "groupMembership",
  initialState: [],
  extraReducers: (builder) => {
    builder.addMatcher(
      grandpaapApi.endpoints.getGroupmembership.matchFulfilled,
      (state, { payload }) => {
        return payload.results;
      }
    );
  },
});
export default groupMembershipSlice.reducer;
