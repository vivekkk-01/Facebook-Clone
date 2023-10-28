import axios from "axios";

export const createPost = async (data, token) => {
  try {
    const { data: postData } = await axios.post(
      `${process.env.REACT_APP_SERVER_ROUTE}/post/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: "ok", data: postData };
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    return err;
  }
};
