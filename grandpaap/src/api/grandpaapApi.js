import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const grandpaapApi = createApi({
  reducerPath: "grandpaapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    //users
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/api/users/",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    getUserByToken: builder.query({
      query: () => ({
        url: "/api/users/me",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (id, userData) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),

    //groups

    createGroup: builder.mutation({
      query: (groupsData) => ({
        url: "/api/group/",
        method: "POST",
        body: groupsData,
      }),
    }),
    getGroups: builder.query({
      query: () => ({
        url: "/api/group/",
        method: "GET",
      }),
    }),
    getGroup: builder.query({
      query: (id) => ({
        url: `api/group/${id}`,
        method: "GET",
      }),
    }),
    updateGroup: builder.mutation({
      query: (id, groupData) => ({
        url: `/api/group/${id}`,
        method: "PUT",
        body: groupData,
      }),
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/api/group/${id}`,
        method: "DELETE",
      }),
    }),

    //groupmembership

    getGroupmemberships: builder.query({
      query: () => ({
        url: "/api/groupmembership/",
        method: "GET",
      }),
    }),
    getGroupmembership: builder.query({
      query: () => ({
        url: (id) => `/api/groupmembership/${id}`,
        method: "GET",
      }),
    }),
    createGroupmembership: builder.mutation({
      query: (groupmembershipData) => ({
        url: "/api/groupmembership/",
        method: "POST",
        body: groupmembershipData,
      }),
    }),
    deleteGroupmembership: builder.mutation({
      query: (id) => ({
        url: `/api/groupmembership/${id}`,
        method: "DELETE",
      }),
    }),
    updateGroupmembership: builder.mutation({
      query: ({ id, ...groupmembershipData }) => ({
        url: `/api/groupmembership/${id}`,
        method: "PUT",
        body: groupmembershipData,
      }),
    }),

    //groupmessage

    getGroupmessages: builder.query({
      query: () => ({
        url: "/api/groupmessage/",
        method: "GET",
      }),
    }),
    getGroupmessage: builder.query({
      query: () => ({
        url: (id) => `/api/groupmessage/${id}`,
        method: "GET",
      }),
    }),
    createGroupmessage: builder.mutation({
      query: (groupmessageData) => ({
        url: "/api/groupmessage/",
        method: "POST",
        body: groupmessageData,
      }),
    }),
    deleteGroupmessage: builder.mutation({
      query: (id) => ({
        url: `/api/groupmessage/${id}`,
        method: "DELETE",
      }),
    }),
    updateGroupmessage: builder.mutation({
      query: ({ id, ...groupmessageData }) => ({
        url: `/api/groupmessage/${id}`,
        method: "PUT",
        body: groupmessageData,
      }),
    }),

    //messsage

    getMessages: builder.query({
      query: () => ({
        url: "/api/message/",
        method: "GET",
      }),
    }),
    getMessage: builder.query({
      query: () => ({
        url: (id) => `/api/message/${id}`,
        method: "GET",
      }),
    }),
    createMessage: builder.mutation({
      query: (messageData) => ({
        url: "/api/message/",
        method: "POST",
        body: messageData,
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/api/message/${id}`,
        method: "DELETE",
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ id, ...messageData }) => ({
        url: `/api/message/${id}`,
        method: "PUT",
        body: messageData,
      }),
    }),

    //photo

    getPhotos: builder.query({
      query: () => ({
        url: "/api/photo/",
        method: "GET",
      }),
    }),
    getPhoto: builder.query({
      query: () => ({
        url: (id) => `/api/photo/${id}`,
        method: "GET",
      }),
    }),
    createPhoto: builder.mutation({
      query: (photoData) => ({
        url: "/api/photo/",
        method: "POST",
        body: photoData,
      }),
    }),
    deletePhoto: builder.mutation({
      query: (id) => ({
        url: `/api/photo/${id}`,
        method: "DELETE",
      }),
    }),
    updatePhoto: builder.mutation({
      query: ({ id, ...photoData }) => ({
        url: `/api/photo/${id}`,
        method: "PUT",
        body: photoData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetGroupQuery,
  useGetGroupsQuery,
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
  useGetGroupmembershipsQuery,
  useGetGroupmembershipQuery,
  useCreateGroupmembershipMutation,
  useUpdateGroupmembershipMutation,
  useDeleteGroupmembershipMutation,
  useGetGroupmessagesQuery,
  useGetGroupmessageQuery,
  useCreateGroupmessageMutation,
  useUpdateGroupmessageMutation,
  useDeleteGroupmessageMutation,
  useGetMessagesQuery,
  useGetMessageQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useGetPhotosQuery,
  useGetPhotoQuery,
  useCreatePhotoMutation,
  useUpdatePhotoMutation,
  useDeletePhotoMutation,
} = grandpaapApi;
