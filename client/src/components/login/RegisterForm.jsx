import { useFormik } from "formik";
import React, { useState } from "react";
import RegisterInput from "../inputs/RegisterInput";
import * as Yup from "yup";
import DatePicker from "./DatePicker";
import GenderSelector from "./GenderSelector";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setUserInfoAction } from "../../redux/actions/userActions";

const formSchema = Yup.object({
  first_name: Yup.string()
    .required("First Name is required.")
    .min(2, "First name should contain at least 2 characters.")
    .max(16, "First name should not be more than 16 characters.")
    .matches(
      /^[aA-zZ]+$/,
      "Numbers, space and special characters are not allowed."
    ),
  last_name: Yup.string()
    .required("Last Name is required.")
    .min(2, "Last name should contain at least 2 characters.")
    .max(16, "Last name should not be more than 16 characters.")
    .matches(
      /^[aA-zZ]+$/,
      "Numbers, space and special characters are not allowed."
    ),
  email: Yup.string()
    .email("Enter a valid email address.")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password should contain at least 8 characters.")
    .max(36, "Password should not be more than 36 characters.")
    .required("Password is required."),
});

const RegisterForm = ({ classes, setVisible }) => {
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      birth_year: new Date().getFullYear(),
      birth_month: new Date().getMonth() + 1,
      birth_day: new Date().getDate(),
      gender: "",
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      const currentDate = new Date();
      const pickedDate = new Date(
        values.birth_year,
        values.birth_month - 1,
        values.birth_day
      );
      const underAge = new Date(1970 + 14, 0, 1);
      if (currentDate - pickedDate < underAge) {
        setAgeError("You're under age!");
        return;
      }
      if (values.gender === "") {
        setAgeError("");
        setGenderError("What's your Gender?");
        return;
      }
      setAgeError("");
      setGenderError("");
      setError("");
      setSuccess("");
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_ROUTE}/user/register`,
          values
        );
        setLoading(false);
        setSuccess(data.message);
        const { message, ...rest } = data;
        setTimeout(() => {
          dispatch(setUserInfoAction(rest));
          Cookies.set("user", JSON.stringify(rest));
          navigate("/");
        }, 2000);
      } catch (error) {
        setLoading(false);
        setSuccess("");
        setError(
          error.response.data
            ? error.response.data
            : error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Something went wrong, please try again!"
        );
      }
    },
  });

  const years = Array.from(
    new Array(108),
    (val, index) => +new Date().getFullYear() - index
  );

  const months = Array.from(new Array(12), (val, index) => index + 1);

  const getDays = () =>
    new Date(formik.values.birth_year, formik.values.birth_month, 0).getDate();

  const days = Array.from(new Array(getDays()), (val, index) => index + 1);

  return (
    <div className="blur_absolute">
      <div className={classes.register}>
        <div className={classes.register_header}>
          <i className="exit_icon" onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy!</span>
        </div>
        <form onSubmit={formik.handleSubmit} className={classes.register_form}>
          <div className={classes.reg_line}>
            <RegisterInput
              type="text"
              placeholder="First Name"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              isError={formik.touched.first_name && formik.errors.first_name}
            />
            <RegisterInput
              type="text"
              placeholder="Last Name"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              isError={formik.touched.last_name && formik.errors.last_name}
            />
          </div>
          <div className={classes.reg_line}>
            <RegisterInput
              type="email"
              placeholder="Email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isError={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className={classes.reg_line}>
            <RegisterInput
              type="password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isError={formik.touched.password && formik.errors.password}
            />
          </div>
          <DatePicker
            formik={formik}
            years={years}
            months={months}
            days={days}
            classes={classes}
            ageError={ageError}
          />
          <GenderSelector
            classes={classes}
            genderError={genderError}
            formik={formik}
          />
          <div className={classes.reg_infos}>
            By clicking Sign Up, you agree to our{" "}
            <span>Terms, Data Policy</span> and <span>Cookie Policy.</span> You
            may receive notifications from us, and can opt out at any time.
          </div>
          <div className={classes.reg_btn_wrapper}>
            <button
              disabled={loading}
              type="submit"
              className={`blue_btn ${classes.open_signup}`}
              style={{ opacity: `${loading ? 0.7 : 1}` }}
            >
              {loading ? (
                <ClipLoader color="#fff" loading={loading} size={40} />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
          {error && <div className={classes.error_text}>{error}</div>}
          {success && <div className={classes.success_text}>{success}</div>}
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
