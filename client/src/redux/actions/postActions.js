import axios from "axios";
import { setAllPosts, setError, setLoading } from "../slices/postSlice";
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
    const err = error.response.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setError(err));
  }
};
