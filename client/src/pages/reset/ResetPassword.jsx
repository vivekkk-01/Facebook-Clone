import React from "react";
import LoginInput from "../../components/inputs/LoginInput";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = ({
  classes,
  formik,
  loading,
  error,
  success,
  setError,
  setSuccess,
  setLoading,
}) => {
  const navigate = useNavigate();
  error &&
    setTimeout(() => {
      setError("");
    }, 3000);
  success &&
    setTimeout(() => {
      setLoading(false);
      setSuccess("");
      navigate("/");
    }, 2000);
  return (
    <div
      className={classes.reset_form}
      style={{
        height: "fit-content",
        paddingBottom: "3.5rem",
      }}
    >
      <h2 className={classes.reset_form_header}>Change Your Password!</h2>
      <p className={classes.reset_form_text}>Pick a strong password.</p>
      <form onSubmit={formik.handleSubmit}>
        <LoginInput
          placeholder="Password"
          name="password"
          type="password"
          isError={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <LoginInput
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          isError={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          bottom={true}
        />
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
        <div className={classes.reset_form_btns}>
          <Link to="/login" className="gray_btn">
            Cancel
          </Link>
          <button
            disabled={loading}
            style={{ opacity: `${loading ? 0.6 : 1}` }}
            type="submit"
            className="blue_btn"
          >
            {loading ? (
              <ClipLoader color="#fff" loading={loading} size={20} />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
