import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
  loading: false,
  error: null,
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
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default postSlice.reducer;
export const { setAllPosts, setLoading, setError } = postSlice.actions;
