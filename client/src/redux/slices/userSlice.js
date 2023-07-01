import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userInfo: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
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
    setLogout: (state) => {
      state.userInfo = null;
    },
  },
});

export default userSlice.reducer;
export const { setUserInfo, setUserVerification, setLogout } =
  userSlice.actions;
