import React from "react";

const DatePicker = ({ classes, days, years, months, formik, ageError }) => {
  return (
    <div className={classes.reg_col}>
      <div className={classes.reg_line_header}>
        Date of birth <i className="info_icon"></i>
      </div>
      <div className={classes.reg_grid}>
        <select
          name="birth_day"
          onChange={formik.handleChange}
          value={formik.values.birth_day}
        >
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="birth_month"
          onChange={formik.handleChange}
          value={formik.values.birth_month}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="birth_year"
          onChange={formik.handleChange}
          value={formik.values.birth_year}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {ageError && <div className={classes.input_error}>{ageError}</div>}
    </div>
  );
};

export default DatePicker;
