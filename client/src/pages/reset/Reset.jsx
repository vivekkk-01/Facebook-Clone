import React, { useState } from "react";
import classes from "./reset.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/actions/userActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import ResetForm from "./ResetForm";
import ReceiveEmail from "./ReceiveEmail";
import CodeVerification from "./CodeVerification";
import ResetPassword from "./ResetPassword";
import axios from "axios";

const sendEmailSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address!")
    .required("Email is required!"),
});

const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password should contain at least 8 characters!")
    .max(36, "Password should not be more than 36 characters!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .required("Confirm your password!")
    .oneOf([Yup.ref("password")], "Passwords must match!"),
});

const codeSchema = Yup.object({
  code: Yup.string()
    .required("Code is required.")
    .min(5, "Code must contain 5 characters.")
    .max(5, "Code must contain 5 characters."),
});

const Reset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(0);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: sendEmailSchema,
    onSubmit: async (values, { setValues }) => {
      setError("");
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_ROUTE}/user/find-user/${values.email}`
        );
        setLoading(false);
        setUser(data);
        setVisible(1);
        setValues({ email: "" });
      } catch (error) {
        setLoading(false);
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
    },
  });

  const codeFormik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: codeSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_ROUTE}/user/verify-otp`,
          { OTP: values.code.trim(), email: user.email }
        );
        setLoading(false);
        setVisible(3);
      } catch (error) {
        setLoading(false);
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
    },
  });

  const resetFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setSuccess("");
      setError("");
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_ROUTE}/user/reset-password`,
          {
            password: values.password,
            confirmPassword: values.confirmPassword,
            email: user.email,
            OTP: codeFormik.values.code,
          }
        );
        setSuccess(data);
      } catch (error) {
        setLoading(false);
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
    },
  });

  const handleReceiveOTP = async () => {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_ROUTE}/user/reset-password-otp`,
        { email: user.email }
      );
      setSuccess(data);
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data
          ? error?.response?.data
          : error?.response?.data?.message
          ? error?.response?.data?.message
          : error?.message
          ? error?.message
          : "Something went wrong, please try again!"
      );
      error?.response?.status === 403 &&
        setTimeout(() => {
          setVisible(2);
        }, 3500);
    }
  };

  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/login");
  };

  return (
    <div className={classes.reset}>
      <div className={classes.reset_header}>
        <img src="../../../icons/facebook.svg" alt="" />
        {userInfo ? (
          <div className={classes.right_reset}>
            <Link to="/profile">
              <img src={userInfo?.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/profile" className={classes.right_reset}>
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className={classes.reset_wrap}>
        {visible === 0 && (
          <ResetForm
            classes={classes}
            formik={emailFormik}
            error={error}
            setError={setError}
          />
        )}
        {visible === 1 && (
          <ReceiveEmail
            classes={classes}
            userInfo={user}
            setVisible={setVisible}
            handleReceiveOTP={handleReceiveOTP}
            success={success}
            error={error}
            setError={setError}
            setSuccess={setSuccess}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            classes={classes}
            formik={codeFormik}
            error={error}
            loading={loading}
            setError={setError}
          />
        )}
        {visible === 3 && (
          <ResetPassword
            classes={classes}
            formik={resetFormik}
            loading={loading}
            error={error}
            success={success}
            setError={setError}
            setSuccess={setSuccess}
            setLoading={setLoading}
          />
        )}
      </div>
    </div>
  );
};

export default Reset;
