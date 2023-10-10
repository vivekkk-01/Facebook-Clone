import React, { useEffect, useRef, useState } from "react";
import { Return, Search } from "../../svg";
import useClickOutside from "../../hooks/useClickOutside";

const SearchMenu = ({ classes, color, setShowSearchMenu }) => {
  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const menuRef = useRef();
  const inputRef = useRef();
  useClickOutside(menuRef, () => setShowSearchMenu(false));

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
          />
        </div>
      </div>
      <div className={classes.search_history_header}>
        <span>Recent Searches</span>
        <a href="">Edit</a>
      </div>
      <div className={classes.search_history_header}></div>
      <div className={classes.search_history}></div>
      <div className={`${classes.search_results} ${classes.scrollbar}`}></div>
    </div>
  );
};

export default SearchMenu;
