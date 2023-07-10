import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostPopup: false,
};

const postPopupSlice = createSlice({
  name: "postPopup",
  initialState,
  reducers: {
    setPostPopup: (state, { payload }) => {
      state.isPostPopup = payload;
    },
  },
});

export const { setPostPopup } = postPopupSlice.actions;
export default postPopupSlice.reducer;
