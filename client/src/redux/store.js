import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./slices/userSlice";
import postPopup from "./slices/postPopupSlice";
import post from "./slices/postSlice";

const reducer = combineReducers({
  user,
  postPopup,
  post,
});

export default configureStore({
  reducer,
});
