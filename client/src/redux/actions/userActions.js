import {
  setLogout,
  setUserInfo,
  setUserVerification,
} from "../slices/userSlice";
import Cookies from "js-cookie";

export const setUserInfoAction = (data) => (dispatch) => {
  dispatch(setUserInfo(data));
};

export const userVerificationAction = (data) => (dispatch) => {
  dispatch(setUserVerification(data));
};

export const logoutAction = () => (dispatch) => {
  Cookies.remove("user");
  dispatch(setLogout());
};
