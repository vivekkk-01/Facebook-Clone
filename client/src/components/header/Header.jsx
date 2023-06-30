import React, { useEffect, useRef, useState } from "react";
import classes from "./header.module.css";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  Friends,
  Gaming,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from "../../svg";
import { useSelector } from "react-redux";
import SearchMenu from "./SearchMenu";
import AllMenu from "./AllMenu";
import UserMenu from "./userMenu/UserMenu";
import useClickOutside from "../../hooks/useClickOutside";

const Header = () => {
  const color = "#65676b";
  const { userInfo } = useSelector((state) => state.user);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userRef = useRef();
  const menuRef = useRef();

  useClickOutside(menuRef, () => {
    setShowAllMenu(false);
  });

  useClickOutside(userRef, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className={classes.header_left}>
        <Link className={classes.header_logo}>
          <div className={classes.circle}>
            <Logo />
          </div>
        </Link>
        <div
          className={`${classes.search} ${classes.search1}`}
          onClick={() => setShowSearchMenu(true)}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search here..."
            className={classes.hide_input}
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu
          classes={classes}
          color={color}
          setShowSearchMenu={setShowSearchMenu}
        />
      )}
      <div className={classes.header_middle}>
        <Link to="/" className={`${classes.middle_icon} ${classes.active}`}>
          <HomeActive />
        </Link>
        <Link to="/" className={`hover1 ${classes.middle_icon}`}>
          <Friends color={color} />
        </Link>
        <Link to="/" className={`hover1 ${classes.middle_icon}`}>
          <Watch color={color} />
          <div className={classes.middle_notification}>9+</div>
        </Link>
        <Link to="/" className={`hover1 ${classes.middle_icon}`}>
          <Market color={color} />
        </Link>
        <Link to="/" className={`hover1 ${classes.middle_icon}`}>
          <Gaming color={color} />
        </Link>
      </div>
      <div className={classes.header_right}>
        <Link to="/profile" className={`hover1 ${classes.profile_link}`}>
          <img src={userInfo?.picture} />
          <span>{userInfo?.firstName}</span>
        </Link>
        <div
          className={`${classes.circle_icon} ${
            showAllMenu && classes.active_header
          } hover1`}
          ref={menuRef}
        >
          <div
            style={{ transform: "translateY(2px)" }}
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <Menu />
          </div>
          {showAllMenu && <AllMenu classes={classes} />}
        </div>
        <div className={`hover1 ${classes.circle_icon}`}>
          <Messenger />
        </div>
        <div className={`hover1 ${classes.circle_icon}`}>
          <Notifications />
          <div className={classes.right_notification}>5</div>
        </div>
        <div
          style={{ transform: "translateY(2px)" }}
          className={`hover1 ${classes.circle_icon} ${
            showUserMenu && classes.active_header
          }`}
          ref={userRef}
        >
          <div onClick={() => setShowUserMenu((prev) => !prev)}>
            <ArrowDown />
          </div>
          {showUserMenu && <UserMenu user={userInfo} classes={classes} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
