import { configureStore } from "@reduxjs/toolkit";
import { grandpaapApi } from "../api/grandpaapApi";
import photoSlice from "../slice/photoSlice";
import groupSlice from "../slice/groupSlice";
import getUserSlice from "../slice/userSlice";
import messageSlice from "../slice/messageSlice";
import groupMessageSlice from "../slice/groupMessageSlice";
import groupMembershipSlice from "../slice/groupMembershipSlice";

export const store = configureStore({
  reducer: {
    [grandpaapApi.reducerPath]: grandpaapApi.reducer,
    message: messageSlice,
    photo: photoSlice,
    currentUser: getUserSlice,
    group: groupSlice,
    groupMembership: groupMembershipSlice,
    groupMessage: groupMessageSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(grandpaapApi.middleware),
});

export default store;
