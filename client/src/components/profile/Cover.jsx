import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const Cover = ({ cover, classes, ownProfile }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  return (
    <div className={classes.profile_cover}>
      {cover && <img src={cover} className={classes.cover} alt="" />}
      {ownProfile ? (
        <div className={classes.update_cover_wrapper}>
          <div ref={menuRef}>
            <div
              className={classes.open_cover_update}
              onClick={() => setShowCoverMenu((prev) => !prev)}
            >
              <i className="camera_filled_icon"></i>
              Add Cover Photo
            </div>
            {showCoverMenu && (
              <div className={classes.open_cover_menu}>
                <div className={`${classes.open_cover_menu_item} hover1`}>
                  <i className="photo_icon"></i>
                  Select Photo
                </div>
                <div className={`${classes.open_cover_menu_item} hover1`}>
                  <i className="upload_icon"></i>
                  Upload Photo
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Cover;
