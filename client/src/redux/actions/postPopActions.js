import { setPostPopup, setPostFromProfile } from "../slices/postPopupSlice";

export const postPopupActions = (data) => (dispatch) => {
  dispatch(setPostPopup(data));
};

export const postFromProfileAction = (data) => (dispatch) => {
  dispatch(setPostFromProfile(data));
};
