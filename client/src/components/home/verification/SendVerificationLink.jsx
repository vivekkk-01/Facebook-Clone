import React, { useState } from "react";
import classes from "./sendVerificationLink.module.css";
import axios from "axios";

const SendVerificationLink = ({ accessToken }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/resend-verification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setError("");
      setSuccess(data);
    } catch (error) {
      setSuccess("");
      setError(
        error?.response?.data
          ? error?.response?.data
          : error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
          ? error?.message
          : "Something went wrong, please try again!"
      );
    }
  };

  return (
    <div className={classes.send_verification}>
      <span>Your account is not verified, verify your account now!</span>
      <a onClick={sendVerificationLink}>
        Click here to receive verification link.
      </a>
      {success && <p className={classes.success_text}>{success}</p>}
      {error && <p className={classes.error_text}>{error}</p>}
    </div>
  );
};

export default SendVerificationLink;
