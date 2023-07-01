import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const ActivateForm = ({ loading, text, type, header, classes }) => {
  return (
    <div className="blur_fixed">
      <div className={classes.popup}>
        <div
          className={`${classes.popup_header} ${
            type === "success" ? classes.success_text : classes.error_text
          }`}
        >
          {header}
        </div>
        <div className={classes.popup_message}>{text}</div>
        <PropagateLoader size={30} loading={loading} color="#1876f2" />
      </div>
    </div>
  );
};

export default ActivateForm;
