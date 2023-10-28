import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostPopup: false,
  postFromProfile: false,
};

const postPopupSlice = createSlice({
  name: "postPopup",
  initialState,
  reducers: {
    setPostPopup: (state, { payload }) => {
      state.isPostPopup = payload;
    },
    setPostFromProfile: (state, { payload }) => {
      state.postFromProfile = payload;
    },
  },
});

export const { setPostPopup, setPostFromProfile } = postPopupSlice.actions;
export default postPopupSlice.reducer;
