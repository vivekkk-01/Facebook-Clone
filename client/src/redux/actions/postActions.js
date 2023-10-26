import axios from "axios";
import {
  setAllPosts,
  setComments,
  setCommentError,
  setCommentLoading,
  setError,
  setLoading,
  setReactPost,
  setReactPostError,
  setReactPostLoading,
  resetComment,
} from "../slices/postSlice";
import Cookies from "js-cookie";

export const getPostsActions = () => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_ROUTE}/post/getAllPosts`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setAllPosts(data));
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

export const reactPostAction = (react, postId) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    dispatch(setReactPostLoading());
    await axios.put(
      `${process.env.REACT_APP_SERVER_ROUTE}/post/react-post`,
      { react, postId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setReactPost());
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setReactPostError(err));
  }
};

export const addCommentAction = (commentObj) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    dispatch(setCommentLoading());
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_ROUTE}/post/post-comment`,
      commentObj,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setComments(data));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setCommentError(err));
  }
};

export const resetCommentAction = () => async (dispatch) => {
  dispatch(resetComment());
};
