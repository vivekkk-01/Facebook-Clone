import React, { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const OldCover = ({
  setShowOld,
  profilePictures,
  classes,
  setCoverPicture,
}) => {
  const oldRef = useRef();
  useClickOutside(oldRef, () => {
    setShowOld(false);
  });

  return (
    <div className="blur_fixed" style={{ zIndex: 99999999 }}>
      <div
        className={`${classes.postBox} ${classes.selectCoverBox}`}
        ref={oldRef}
      >
        <div className={classes.box_header}>
          <div
            className="small_white_circle"
            onClick={() => {
              setShowOld(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className={classes.selectCoverBox_links}>
          <div className={classes.selectCoverBox_link}>Recent Photos</div>
          <div className={classes.selectCoverBox_link}>Photo Albums</div>
        </div>
        <div className={`${classes.old_pictures_wrap} `}>
          <div className={classes.old_pictures_cover}>
            {profilePictures &&
              profilePictures?.resources?.map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => {
                    setCoverPicture(photo.secure_url);
                    setShowOld(false);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCover;
