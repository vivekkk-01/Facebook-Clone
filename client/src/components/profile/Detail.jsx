import { useState } from "react";
import Bio from "./Bio";

export default function Detail({
  text,
  img,
  value,
  placeholder,
  name,
  classes,
  handleChange,
  updateDetail,
  infos,
  rel
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className={classes.add_details_flex} onClick={() => setShow(true)}>
        {value ? (
          <div className={`${classes.info_profile} ${classes.no_underline}`}>
            <img src={`../../../icons/${img}.png`} alt="" />
            <span style={{ textDecoration: "none" }}>{value}</span>
            <i className={`${classes.icon_edit} edit_icon`}></i>
          </div>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => setShow(true)}
          >
            <i className="rounded_plus_icon"></i>
            Add {text}
          </div>
        )}
      </div>
      {show && (
        <Bio
          placeholder={placeholder}
          name={name}
          classes={classes}
          updateDetail={updateDetail}
          handleChange={handleChange}
          setShow={setShow}
          infos={infos}
          rel={rel}
          detail
        />
      )}
    </div>
  );
}
