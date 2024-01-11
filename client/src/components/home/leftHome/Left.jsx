import React, { useState } from "react";
import classes from "./left.module.css";
import left from "../../../data/home";
import LeftLink from "./LeftLink";
import { ArrowDown1 } from "../../../svg";
import { Link } from "react-router-dom";

const Left = ({ user }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`${classes.left_home} scrollbar`}>
      {user && (
        <Link to="/profile" className={`${classes.left_link} hover1`}>
          <img src={user?.picture} alt="" />
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
      )}
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
          classes={classes}
        />
      ))}
      {!visible && (
        <div
          className={`${classes.left_link} hover1`}
          onClick={() => setVisible(true)}
        >
          <div>
            <ArrowDown1 />
          </div>
          <span>Show More</span>
        </div>
      )}
      {visible && (
        <>
          <div className={classes.more_left}>
            {left.slice(8, left.length - 1).map((link, i) => (
              <LeftLink
                key={i}
                img={link.img}
                text={link.text}
                notification={link.notification}
                classes={classes}
              />
            ))}
            <div
              className={`${classes.left_link} hover1`}
              onClick={() => setVisible(false)}
            >
              <div className={classes.rotate360}>
                <ArrowDown1 />
              </div>
              <span>Show Less</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Left;
