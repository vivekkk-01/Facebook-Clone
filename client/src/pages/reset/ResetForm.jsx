import React from "react";
import LoginInput from "../../components/inputs/LoginInput";
import { Link } from "react-router-dom";

const ResetForm = ({ classes, formik, error, setError }) => {
  error &&
    setTimeout(() => {
      setError("");
    }, 3500);
  return (
    <div
      className={classes.reset_form}
      style={{ height: "fit-content", paddingBottom: "3.5rem" }}
    >
      <h2 className={classes.reset_form_header}>Find Your Account!</h2>
      <p className={classes.reset_form_text}>
        Please enter your email address to search your account.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <LoginInput
          placeholder="Email"
          name="email"
          type="email"
          isError={formik.touched.email && formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <div className={classes.reset_form_btns}>
          <Link to="/login" className="gray_btn">
            Cancel
          </Link>
          <button type="submit" className="blue_btn">
            Continue
          </button>
        </div>
        {error && <p className={classes.error_text}>{error}</p>}
      </form>
    </div>
  );
};

export default ResetForm;
