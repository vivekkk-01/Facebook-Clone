import React from "react";

const GenderSelector = ({ classes, formik, genderError }) => {
  return (
    <div className={classes.reg_col}>
      <div className={classes.reg_line_header}>
        Gender <i className="info_icon"></i>
      </div>
      <div className={classes.reg_grid}>
        <label htmlFor="male">
          Male
          <input
            type="radio"
            name="gender"
            id="male"
            value="Male"
            onChange={formik.handleChange}
          />
        </label>
        <label htmlFor="female">
          Female
          <input
            type="radio"
            name="gender"
            id="female"
            value="Female"
            onChange={formik.handleChange}
          />
        </label>
        <label htmlFor="other">
          Other
          <input
            type="radio"
            name="gender"
            id="other"
            value="Other"
            onChange={formik.handleChange}
          />
        </label>
      </div>
      {genderError && <div className={classes.input_error}>{genderError}</div>}
    </div>
  );
};

export default GenderSelector;
