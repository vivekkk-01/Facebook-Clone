import { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { useSelector } from "react-redux";
import Relation from "./Relation";

const ProfilePictureInfos = ({ profile, classes, ownProfile }) => {
  const [show, setShow] = useState(false);
  const { profileInfo } = useSelector((state) => state.profile);
  return (
    <div className={classes.profile_img_wrap}>
      {show ? <ProfilePicture classes={classes} setShow={setShow} /> : null}
      <div className={classes.profile_w_left}>
        <div className={classes.profile_w_img}>
          <div
            className={classes.profile_w_bg}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
          {ownProfile ? (
            <div
              className={`${classes.profile_circle} hover1`}
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          ) : null}
        </div>
        <div className={classes.profile_w_col}>
          <div className={classes.profile_name}>
            {profile?.first_name} {profile?.last_name}
            <p className={classes.othername}>
              {profileInfo?.details?.otherName
                ? `(${profileInfo?.details?.otherName})`
                : ""}
            </p>
          </div>
          <div className={classes.profile_friend_count}></div>
          <div className={classes.profile_friend_imgs}></div>
        </div>
      </div>
      {ownProfile ? (
        <div className={classes.profile_w_right}>
          <div className="blue_btn">
            <img
              src="../../../icons/plus.png"
              alt=""
              className={classes.invert}
            />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      ) : (
        <Relation
          classes={classes}
          relation={profile?.relation}
          profileId={profile?._id}
        />
      )}
    </div>
  );
};

export default ProfilePictureInfos;
