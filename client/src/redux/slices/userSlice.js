import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  searchResultsLoading: false,
  searchResults: [],
  searchResultsError: null,
  searchHistory: [],
  friendsInfoLoading: false,
  friendsInfo: null,
  friendsInfoError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    setUserVerification: (state, { payload }) => {
      state.userInfo = payload;
    },
    setSearchResultsLoading: (state) => {
      state.searchResultsLoading = true;
    },
    setSearchResults: (state, { payload }) => {
      state.searchResultsLoading = false;
      state.searchResults = payload;
      state.searchHistory = [];
      state.searchResultsError = null;
    },
    setSearchResultsError: (state, { payload }) => {
      state.searchResultsLoading = false;
      state.searchResults = [];
      state.searchResultsError = payload;
    },
    setSearchEmpty: (state) => {
      state.searchResultsLoading = false;
      state.searchResults = [];
      state.searchResultsError = null;
    },
    setSearchHistory: (state, { payload }) => {
      state.searchHistory = payload;
      state.searchResults = [];
    },
    setFriendsInfoLoading: (state) => {
      state.friendsInfoLoading = true;
    },
    setFriendsInfo: (state, { payload }) => {
      state.friendsInfoLoading = false;
      state.friendsInfo = payload;
      state.friendsInfoError = null;
    },
    setFriendsInfoError: (state, { payload }) => {
      state.friendsInfoLoading = false;
      state.friendsInfo = null;
      state.friendsInfoError = payload;
    },
    cancelFriendRequest: (state, { payload }) => {
      const index = state.friendsInfo.requestsSent.findIndex(
        (user) => user._id === payload
      );
      if (index !== -1) {
        state.friendsInfo.requestsSent.splice(index, 1);
      }
    },
    confirmFriendRequest: (state, { payload }) => {
      const { id, user } = payload;
      const index = state.friendsInfo.requestsReceived.findIndex(
        (user) => user._id === id
      );
      if (index !== -1) {
        state.friendsInfo.requestsReceived.splice(index, 1);
        state.friendsInfo.friends.push(user);
      }
    },
    deleteFriendRequest: (state, { payload }) => {
      const { id } = payload;
      const index = state.friendsInfo.requestsReceived.findIndex(
        (user) => user._id === id
      );
      if (index !== -1) {
        state.friendsInfo.requestsReceived.splice(index, 1);
      }
    },
    setLogout: (state) => {
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
export const {
  setUserInfo,
  setUserVerification,
  setSearchResultsLoading,
  setSearchResults,
  setSearchResultsError,
  setSearchEmpty,
  setSearchHistory,
  setFriendsInfo,
  setFriendsInfoError,
  setFriendsInfoLoading,
  confirmFriendRequest,
  cancelFriendRequest,
  deleteFriendRequest,
  setLogout,
} = userSlice.actions;
