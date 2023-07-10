import { combineReducers, configureStore } from "@reduxjs/toolkit";

import user from "./slices/userSlice";
import postPopup from "./slices/postPopupSlice";

const reducer = combineReducers({
  user,
  postPopup,
});

export default configureStore({
  reducer,
});
