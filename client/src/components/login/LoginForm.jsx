import React, { useState } from "react";
import LoginInput from "../../components/inputs/LoginInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { setUserInfoAction } from "../../redux/actions/userActions";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password should contain at least 8 characters.")
    .required("Password is required."),
});
const LoginForm = ({ classes, setVisible }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_ROUTE}/user/login`,
          values
        );
        setLoading(false);
        dispatch(setUserInfoAction(data));
        Cookies.set("user", JSON.stringify(data), {
          secure: true,
          sameSite: "strict",
          expires: 30,
        });
        navigate("/");
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
  return (
    <div className={classes.login_wrap}>
      <Link to="/" className={classes.login_1}>
        <img src="../../../icons/facebook.svg" alt="" />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </Link>
      <div className={classes.login_2}>
        <div className={classes.login_2_wrap}>
          <form onSubmit={formik.handleSubmit}>
            <LoginInput
              placeholder="Enter your Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.email && formik.errors.email}
            />
            <LoginInput
              placeholder="Enter your Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isError={formik.touched.password && formik.errors.password}
              bottom={true}
            />
            <button
              disabled={loading}
              style={{ opacity: `${loading ? 0.7 : 1}` }}
              type="submit"
              className="blue_btn"
            >
              {loading ? (
                <ClipLoader color="#fff" loading={loading} size={40} />
              ) : (
                "Log In"
              )}
            </button>
            {error && <div className={classes.error_text}>{error}</div>}
          </form>
          <Link to="/reset" className={classes.forgot_password}>
            Forgot Password?
          </Link>
          <div className={classes.sign_splitter}></div>
          <button
            onClick={() => setVisible(true)}
            className={`blue_btn ${classes.open_signup}`}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
