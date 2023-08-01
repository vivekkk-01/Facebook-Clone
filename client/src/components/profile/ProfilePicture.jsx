import { useEffect, useRef, useState } from "react";
import UpdateProfilePicture from "./UpdateProfilePicture";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import {
  allImagesAction,
  getProfilePicturesAction,
} from "../../redux/actions/profileActions";
const ProfilePicture = ({ classes, setShow }) => {
  const refInput = useRef(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const boxRef = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large, max 5mb is allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };

  const { profilePictures, profilePicturesLoading, profilePicturesError } =
    useSelector((state) => state.profile);

  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const path = `${userInfo.username}/profile_pictures`;
  const max = 30;

  useEffect(() => {
    dispatch(getProfilePicturesAction({ path, max }));
  }, []);

  useClickOutside(boxRef, () => setShow(false));

  return (
    <div className="blur_fixed">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div ref={boxRef}>
        <div className={`${classes.postBox} ${classes.pictureBox}`}>
          <div className={classes.box_header}>
            <div className="small_white_circle" onClick={() => setShow(false)}>
              <i className="exit_icon"></i>
            </div>
            <span>Update profile picture</span>
          </div>
          <div className={classes.update_picture_wrap}>
            <div className={classes.update_picture_buttons}>
              <button
                className="light_blue_btn"
                onClick={() => refInput.current.click()}
              >
                <i className="plus_icon filter_blue"></i>
                Upload photo
              </button>
              <button className="gray_btn">
                <i className="frame_icon"></i>
                Add frame
              </button>
            </div>
          </div>
          {error && (
            <div className={`${classes.postError} ${classes.comment_error}`}>
              <div className={classes.postError_error}>{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <div className={classes.old_pictures_wrap}>
            <h3>Your profile pictures</h3>
            <div className={classes.old_pictures}>
              {profilePictures?.resources?.map((photo) => (
                <img
                  src={photo.secure_url}
                  key={photo.public_id}
                  alt=""
                  onClick={() => setImage(photo.secure_url)}
                />
              ))}
            </div>
          </div>
        </div>
        {image && (
          <UpdateProfilePicture
            classes={classes}
            image={image}
            setImage={setImage}
            setError={setError}
            setShow={setShow}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
