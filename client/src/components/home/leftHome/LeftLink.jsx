import React from "react";

const LeftLink = ({ img, text, notification, classes }) => {
  return (
    <div className={`${classes.left_link} hover1`}>
      <img src={`../../../left/${img}.png`} alt="" />
      {notification ? (
        <div className={classes.col}>
          <div className={classes.col1}>{text}</div>
          <div className={classes.col2}>{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default LeftLink;
