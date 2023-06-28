import React from "react";
import classes from "./loginInput.module.css";

const LoginInput = ({ placeholder, isError, bottom, ...props }) => {
  const top = !bottom
    ? {
        top: "63%",
      }
    : null;
  return (
    <div className={`${classes.input_wrap}`}>
      {isError && !bottom && (
        <div className={classes.input_error}>{isError}</div>
      )}
      <input
        placeholder={placeholder}
        {...props}
        className={isError && classes.input_error_border}
      />
      {isError && <i className="error_icon" style={top} />}
      {isError && bottom && (
        <div className={classes.input_error}>{isError}</div>
      )}
    </div>
  );
};

export default LoginInput;
