import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  loading: false,
  error: null,
  reactPostLoading: false,
  reactPostError: null,
  commentLoading: false,
  comments: null,
  commentError: null,
  savePostLoading: false,
  savePost: null,
  savePostError: null,
  deletePostError: null,
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
    setCommentLoading: (state) => {
      state.commentLoading = true;
    },
    setComments: (state, { payload }) => {
      state.commentLoading = false;
      state.comments = payload;
      state.commentError = null;
    },
    resetComment: (state) => {
      state.commentLoading = false;
      state.commentError = null;
      state.comments = null;
    },
    setCommentError: (state, { payload }) => {
      state.commentLoading = false;
      state.commentError = payload;
    },
    postFromHome: (state, { payload }) => {
      state.allPosts = [payload, ...state.allPosts];
    },
    setSavePostLoading: (state) => {
      state.savePostLoading = true;
    },
    setSavePost: (state, { payload }) => {
      state.savePostLoading = false;
      state.savePost = payload;
      state.savePostError = null;
    },
    setSavePostError: (state, { payload }) => {
      state.savePostLoading = false;
      state.savePostError = payload;
    },
    deletePost: (state, { payload }) => {
      const index = state.allPosts.findIndex((post) => post._id === payload);
      state.allPosts.splice(index, 1);
    },
    setDeletePostError: (state, { payload }) => {
      state.deletePostError = payload;
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
  setComments,
  setCommentError,
  setCommentLoading,
  resetComment,
  postFromHome,
  setError,
  setSavePostError,
  setSavePostLoading,
  setSavePost,
  deletePost,
  setDeletePostError,
} = postSlice.actions;
