import {
  setLogout,
  setSearchEmpty,
  setSearchHistory,
  setSearchResults,
  setSearchResultsError,
  setSearchResultsLoading,
  setUserInfo,
  setUserVerification,
} from "../slices/userSlice";
import Cookies from "js-cookie";
import axios from "axios";

export const setUserInfoAction = (data) => (dispatch) => {
  dispatch(setUserInfo(data));
};

export const userVerificationAction = (data) => (dispatch) => {
  dispatch(setUserVerification(data));
};

export const searchResultsAction = (searchTerm) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  try {
    dispatch(setSearchResultsLoading());
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_ROUTE}/user/search/${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setSearchResults(data));
  } catch (error) {
    const err = error?.response?.data
      ? error?.response?.data
      : error?.response?.data?.message
      ? error?.response?.data?.message
      : error?.message
      ? error?.message
      : "Something went wrong, please try again!";
    dispatch(setSearchResultsError(err));
  }
};

export const searchEmptyAction = () => (dispatch) => {
  dispatch(setSearchEmpty());
};

export const logoutAction = () => (dispatch) => {
  Cookies.remove("user");
  dispatch(setLogout());
};

export const setSearchHistoryAction = (searchUser) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  const { data } = await axios.put(
    `${process.env.REACT_APP_SERVER_ROUTE}/user/add-to-search-history/`,
    { searchUser },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const newArray = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  dispatch(setSearchHistory(newArray));
};

export const getSearchHistoryAction = () => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  const { data } = await axios.get(
    `${process.env.REACT_APP_SERVER_ROUTE}/user/get-search-history/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const newArray = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  dispatch(setSearchHistory(newArray));
};

export const deleteFromSearchAction = (searchUser) => async (dispatch) => {
  const { accessToken } = JSON.parse(Cookies.get("user"));
  const { data } = await axios.delete(
    `${process.env.REACT_APP_SERVER_ROUTE}/user/delete-from-search/${searchUser}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const newArray = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  dispatch(setSearchHistory(newArray));
};
