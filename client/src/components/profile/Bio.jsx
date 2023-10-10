import React from "react";
const Bio = ({
  infos,
  handleChange,
  classes,
  max,
  setShowBio,
  updateDetail,
  name,
  placeholder,
  setShow,
  detail,
  rel,
}) => {
  return (
    <div className={classes?.add_bio_wrap}>
      {rel ? (
        <select
          className={classes.select_rel}
          name="relationship"
          onChange={handleChange}
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="In A Relationship">In A Relationship</option>
          <option value="Divorced">Divorced</option>
        </select>
      ) : (
        <textarea
          placeholder={placeholder}
          name={name}
          value={infos?.[name]}
          className={`${classes?.details_input} ${classes?.textarea_blue}`}
          onChange={handleChange}
          maxLength={detail ? 25 : 100}
        ></textarea>
      )}
      {!detail ? (
        <div className={classes?.remaining}>{max} characters remaining</div>
      ) : null}
      <div className={classes?.flex}>
        <div className={`${classes?.flex} ${classes?.flex_left}`}>
          <i className="public_icon"></i>Public
        </div>
        <div className={`${classes?.flex} ${classes?.flex_right}`}>
          <button
            className="gray_btn"
            onClick={() => (detail ? setShow(false) : setShowBio(false))}
          >
            Cancel
          </button>
          <button
            className="blue_btn"
            onClick={() => {
              updateDetail();
              {
                detail && setShow(false);
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bio;
