import { setPostPopup } from "../slices/postPopupSlice";

export const postPopupActions = (data) => (dispatch) => {
  dispatch(setPostPopup(data));
};
