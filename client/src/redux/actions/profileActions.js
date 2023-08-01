import Cookies from "js-cookie";
import {
  resetUpdateProfilePic,
  setAllImages,
  setError,
  setImagesError,
  setImagesLoading,
  setLoading,
  setProfileInfo,
  setProfilePictures,
  setProfilePicturesError,
  setProfilePicturesLoading,
  updateProfileInfo,
} from "../slices/profileSlice";
import axios from "axios";

export const profileAction = (username) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    dispatch(setLoading());
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/get-profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setProfileInfo(data));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const allImagesAction =
  ({ path, sort, max }) =>
  async (dispatch) => {
    const { accessToken } = JSON.parse(Cookies.get("user"));
    dispatch(setImagesLoading());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/get-all-images`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(setAllImages(data));
    } catch (error) {
      const err = error?.response?.data
        ? error?.response?.data
        : error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message
        ? error?.message
        : "Something went wrong, please try again!";
      dispatch(setImagesError(err));
    }
  };

export const getProfilePicturesAction =
  ({ path, sort, max }) =>
  async (dispatch) => {
    const { accessToken } = JSON.parse(Cookies.get("user"));
    dispatch(setProfilePicturesLoading());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/get-all-images`,
        { path, sort, max },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      dispatch(setProfilePictures(data));
    } catch (error) {
      const err = error?.response?.data
        ? error?.response?.data
        : error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.message
        ? error?.message
        : "Something went wrong, please try again!";
      dispatch(setProfilePicturesError(err));
    }
  };

export const profilePictureAction = (formData) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setLoading());
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/update-profile-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(updateProfileInfo({ profile: data, accessToken }));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};

export const resetUpdateProfilePicAction = () => (dispatch) => {
  dispatch(resetUpdateProfilePic());
};
