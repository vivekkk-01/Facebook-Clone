import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  searchResultsLoading: false,
  searchResults: [],
  searchResultsError: null,
  searchHistory: [],
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
  setLogout,
} = userSlice.actions;
