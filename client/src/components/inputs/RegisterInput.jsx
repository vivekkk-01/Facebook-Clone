import React from "react";
import classes from "./registerInput.module.css";
import { useMediaQuery } from "react-responsive";

const RegisterInput = ({ placeholder, isError, ...props }) => {
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });

  return (
    <div className={`${classes.input_wrap} ${classes.register_input_wrap}`}>
      <input
        placeholder={placeholder}
        {...props}
        className={isError && classes.input_error_border}
        style={{
          width: `${
            view1 && (props.name === "first_name" || props.name === "last_name")
              ? "100%"
              : view1 && (props.name === "email" || props.name === "password")
              ? "370px"
              : "300px"
          }`,
        }}
      />
      {isError && <i className="error_icon" />}
      {isError && <div className={classes.input_error}>{isError}</div>}
    </div>
  );
};

export default RegisterInput;
