import React from "react";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/LoginInput";
import ClipLoader from "react-spinners/ClipLoader";

const CodeVerification = ({ classes, formik, error, loading, setError }) => {
  error &&
    setTimeout(() => {
      setError("");
    }, 3000);
  return (
    <div
      className={classes.reset_form}
      style={{ height: "fit-content", paddingBottom: "3.5rem" }}
    >
      <h2 className={classes.reset_form_header}>Code Verification!</h2>
      <p className={classes.reset_form_text}>
        Please enter the code that we've sent to you.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <LoginInput
          placeholder="Code"
          name="code"
          type="text"
          isError={formik.touched.code && formik.errors.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
        />
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
        {error && <p className={classes.error_text}>{error}</p>}
      </form>
    </div>
  );
};

export default CodeVerification;
