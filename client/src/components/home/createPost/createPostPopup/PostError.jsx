import React from "react";

const PostError = ({ error, setError, classes }) => {
  return (
    <div className={classes.postError}>
      <div className={error.postError_error}>{error}</div>
      <button
        className="blue_btn"
        onClick={() => {
          setError("");
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default PostError;
