import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  loading: false,
  error: null,
  reactPostLoading: false,
  reactPostError: null,
};

const postSlice = createSlice({
  initialState,
  name: "post",
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setAllPosts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.allPosts = payload;
    },
    setReactPostLoading: (state) => {
      state.reactPostLoading = true;
    },
    setReactPost: (state) => {
      state.reactPostLoading = false;
      state.reactPostError = null;
    },
    setReactPostError: (state, { payload }) => {
      state.reactPostLoading = false;
      state.reactPostError = payload;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default postSlice.reducer;
export const {
  setAllPosts,
  setLoading,
  setReactPost,
  setReactPostError,
  setReactPostLoading,
  setError,
} = postSlice.actions;
