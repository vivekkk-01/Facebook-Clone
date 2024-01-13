import React, { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromSearchAction,
  getSearchHistoryAction,
  searchEmptyAction,
  searchResultsAction,
  setSearchHistoryAction,
} from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const SearchMenu = ({ classes, color, setShowSearchMenu }) => {
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const menuRef = useRef();
  const inputRef = useRef();
  useClickOutside(menuRef, () => setShowSearchMenu(false));
  const dispatch = useDispatch();
  const {
    searchResultsLoading,
    searchResults,
    searchHistory,
    searchResultsError,
    userInfo,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const searchHandler = () => {
    if (searchTerm === "") {
      dispatch(searchEmptyAction());
    } else {
      dispatch(searchResultsAction(searchTerm));
    }
  };

  const searchHistoryHandler = (searchUser) => {
    if (userInfo) {
      dispatch(setSearchHistoryAction(searchUser));
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(getSearchHistoryAction());
    }
  }, [userInfo]);

  const deleteFromSearchHandler = (searchUser) => {
    dispatch(deleteFromSearchAction(searchUser));
  };

  return (
    <div
      ref={menuRef}
      className={`${classes.header_left} ${classes.search_area} scrollbar`}
    >
      <div className={classes.search_wrap}>
        <div className={classes.header_logo}>
          <div
            className={`${classes.circle} hover1`}
            onClick={() => setShowSearchMenu(false)}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className={classes.search}
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          {showSearchIcon && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search People..."
            ref={inputRef}
            onFocus={() => setShowSearchIcon(false)}
            onBlur={() => setShowSearchIcon(true)}
            onChange={(event) => setSearchTerm(event.target.value)}
            onKeyUp={searchHandler}
          />
        </div>
      </div>
      {searchResults.length === 0 && searchHistory.length > 0 && (
        <div className={classes.search_history_header}>
          <span>Recent Searches</span>
        </div>
      )}
      {searchHistory.length > 0 && searchResults.length === 0 && (
        <div className={`${classes.search_history} scrollbar`}>
          {searchHistory.map((user) => {
            return (
              <div
                className={`${classes.search_user_item} hover1`}
                key={user._id}
              >
                <Link
                  to={`/profile/${user.user.username}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                  onClick={() => {
                    searchHistoryHandler.bind(null, user.user._id);
                    navigate(`/profile/${user.user.username}`);
                  }}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.first_name} {user.user.last_name}
                  </span>
                </Link>
                {userInfo && (
                  <i
                    className="exit_icon"
                    onClick={deleteFromSearchHandler.bind(null, user.user._id)}
                  ></i>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className={`${classes.search_results} scrollbar`}>
        {searchResults &&
          searchResults.map((user) => (
            <Link
              key={user._id}
              to={`/profile/${user.username}`}
              className={`${classes.search_user_item} hover1`}
              onClick={searchHistoryHandler.bind(null, user._id)}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.first_name} {user.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchMenu;
