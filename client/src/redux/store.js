import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./slices/userSlice";
import postPopup from "./slices/postPopupSlice";
import post from "./slices/postSlice";
import profile from "./slices/profileSlice";

const reducer = combineReducers({
  user,
  postPopup,
  post,
  profile,
});

export default configureStore({
  reducer,
});
