import { setUserInfo } from "../slices/userSlice";

export const setUserInfoAction = (data) => (dispatch) => {
  dispatch(setUserInfo(data));
};
