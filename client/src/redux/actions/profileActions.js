import Cookies from "js-cookie";
import {
  createdPostFromProfile,
  deletePost,
  resetProfilePictures,
  resetUpdateProfilePic,
  setAllImages,
  setDeletePostError,
  setError,
  setImagesError,
  setImagesLoading,
  setLoading,
  setProfileInfo,
  setProfilePictures,
  setProfilePicturesError,
  setProfilePicturesLoading,
  setRelationship,
  setRelationshipError,
  setRelationshipLoading,
  setUpdateDetails,
  setUpdateDetailsError,
  updateCoverPic,
  updateCoverPicError,
  updateCoverPicLoading,
  updateProfileInfo,
} from "../slices/profileSlice";
import axios from "axios";

export const profileAction = (isUserLoggedIn, username) => async (dispatch) => {
  dispatch(setLoading());
  try {
    if (isUserLoggedIn) {
      console.log("is user logged in?", isUserLoggedIn);
      const user = JSON.parse(Cookies.get("user"));
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/get-profile/${username}`,
        {
          headers: {
            id: user.id,
          },
        }
      );
      dispatch(setProfileInfo(data));
    } else {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/get-profile/${username}`
      );
      dispatch(setProfileInfo(data));
    }
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
    dispatch(setImagesLoading());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/get-all-images`,
        { path, sort, max }
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
  ({ path, max, sort }) =>
  async (dispatch) => {
    dispatch(setProfilePicturesLoading());
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/get-all-images`,
        { path, sort, max }
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

export const resetProfilePicturesAction = () => (dispatch) => {
  dispatch(resetProfilePictures());
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

export const coverPictureAction = (formData) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(updateCoverPicLoading());
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/update-cover-picture`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(updateCoverPic(data));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(updateCoverPicError(err));
  }
};

export const updateDetailsAction = (details) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/update-details`,
      { details },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setUpdateDetails(data));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setUpdateDetailsError(err));
  }
};

export const resetUpdateProfilePicAction = () => (dispatch) => {
  dispatch(resetUpdateProfilePic());
};

export const addFriendAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/add-friend/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const cancelRequestAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/cancel-friend/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const followAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/follow/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const unFollowAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/un-follow/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const acceptRequestAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/accept-request/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const unFriendAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/un-friend/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const rejectRequestAction = (profileId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  dispatch(setRelationshipLoading());
  try {
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/reject-request/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    dispatch(setRelationship());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setRelationshipError(err));
  }
};

export const createdPostFromProfileAction = (data) => (dispatch) => {
  dispatch(createdPostFromProfile(data));
};

export const deletePostFromProfileAction = (postId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_ROUTE}/post/delete-post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(deletePost(postId));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setDeletePostError(err));
  }
};
