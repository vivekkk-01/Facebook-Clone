import React from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ReceiveEmail = ({
  classes,
  userInfo,
  setVisible,
  handleReceiveOTP,
  success,
  error,
  setError,
  setSuccess,
  loading,
  setLoading,
}) => {
  error &&
    setTimeout(() => {
      setError("");
    }, 3500);
  success &&
    setTimeout(() => {
      setLoading(false);
      setSuccess("");
      setVisible(2);
    }, 3500);
  return (
    <div
      className={`${classes.reset_form} ${classes.dynamic_height}`}
      style={{ height: "fit-content", paddingBottom: "3.5rem" }}
    >
      <h2 className={classes.reset_form_header}>Reset Your Password</h2>
      <div className={classes.reset_grid}>
        <div className={classes.reset_left}>
          <p className={classes.reset_form_text}>
            You will receive a code in your email.
          </p>
          <label htmlFor="email" className="hover1">
            <input type="radio" id="email" checked readOnly />
            <div className={classes.label_col}>
              <span>Send code via email</span>
              <span>{userInfo?.email}</span>
            </div>
          </label>
        </div>
        <div className={classes.reset_right}>
          <img src={userInfo?.picture} alt="" />
          <span>{userInfo?.email}</span>
          <span>Facebook User</span>
        </div>
        <div style={{ margin: "0 auto", width: "100%", textAlign: "center" }}>
          {error && (
            <p className="error_text" style={{ textAlign: "center" }}>
              {error}
            </p>
          )}
          {success && (
            <p className="success_text" style={{ textAlign: "center" }}>
              {success}
            </p>
          )}
        </div>
      </div>
      <div className={classes.reset_form_btns}>
        <Link onClick={() => setVisible(0)} className="gray_btn">
          Not You?
        </Link>
        <button
          disabled={loading}
          style={{ opacity: `${loading ? 0.6 : 1}` }}
          onClick={handleReceiveOTP}
          className="blue_btn"
        >
          {loading ? (
            <ClipLoader color="#fff" loading={loading} size={20} />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </div>
  );
};

export default ReceiveEmail;
