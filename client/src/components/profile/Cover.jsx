import { useCallback, useEffect, useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import {
  coverPictureAction,
  getProfilePicturesAction,
  resetProfilePicturesAction,
} from "../../redux/actions/profileActions";
import PulseLoader from "react-spinners/PulseLoader";
import OldCover from "./OldCover";

const Cover = ({ cover, classes, ownProfile }) => {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [updateCover, setUpdateCover] = useState(true);
  const [coverPicture, setCoverPicture] = useState("");
  const [width, setWidth] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [error, setError] = useState("");
  const menuRef = useRef(null);
  const refInput = useRef();
  const coverRef = useRef();
  const cRef = useRef();
  const dispatch = useDispatch();
  const { profileInfo, coverPictureLoading, coverPictureError } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    setWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  useClickOutside(menuRef, () => setShowCoverMenu(false));

  const { profilePictures, profilePicturesLoading, profilePicturesError } =
    useSelector((state) => state.profile);
  useEffect(() => {
    const max = 30;
    const picturesPath = `${profileInfo?.username}/cover_pictures`;
    dispatch(getProfilePicturesAction({ path: picturesPath, max }));

    return () => {
      dispatch(resetProfilePicturesAction());
    };
  }, []);
  const handleImage = (e) => {
    let file = e.target.files[0];
    setShowCoverMenu(false);
    if (!file) return;
    if (
      file?.type !== "image/jpeg" &&
      file?.type !== "image/png" &&
      file?.type !== "image/webp" &&
      file?.type !== "image/gif"
    ) {
      setError(`${file?.name} format is not supported.`);
      return;
    } else if (file?.size > 1024 * 1024 * 5) {
      setError(`${file?.name} is too large, max 5mb is allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event?.target?.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (coverPictureError) {
      setError(coverPictureError);
      setCoverPicture("");
    }
  }, [coverPictureError, coverPictureLoading]);

  useEffect(() => {
    if (coverPicture) {
      setShowCoverMenu(false);
      setUpdateCover(false);
    }
  }, [coverPicture]);

  const getCroppedImage = useCallback(async () => {
    try {
      let img = await getCroppedImg(coverPicture, croppedAreaPixels);
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${profileInfo?.username}/cover_pictures`;
      let formData = new FormData();
      formData.append("image", blob);
      formData.append("path", path);
      dispatch(coverPictureAction(formData));
      setTimeout(() => {
        if (!coverPictureError && !coverPictureLoading) {
          setCoverPicture("");
          setError("");
          setUpdateCover(true);
          cRef.current.src = img;
        }
      }, 2000);
    } catch (error) {
      setError("Something went wrong, please try again!");
    }
  }, [croppedAreaPixels]);

  return (
    <div className={classes.profile_cover} ref={coverRef}>
      {coverPicture ? (
        <div className={classes.save_changes_cover}>
          <div className={classes.save_changes_left}>
            <i className="public_icon"></i>
            Your cover photo is public.
          </div>
          <div className={classes.save_changes_right}>
            <button
              disabled={coverPictureLoading}
              className={`blue_btn ${classes.opacity_btn}`}
              onClick={() => {
                setCoverPicture("");
                setUpdateCover(true);
                setError("");
              }}
            >
              Cancel
            </button>
            <button
              disabled={coverPictureLoading}
              className="blue_btn"
              onClick={getCroppedImage}
              style={{ opacity: `${coverPictureLoading ? ".7" : "1"}` }}
            >
              {coverPictureLoading ? (
                <PulseLoader
                  size={9}
                  color="#fff"
                  loading={coverPictureLoading}
                />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      ) : null}
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      {error && (
        <div className={`${classes.postError} ${classes.comment_error}`}>
          <div className={classes.postError_error}>{error}</div>
          <button className="blue_btn" onClick={() => setError("")}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className={classes.cover_cropper}>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            onZoomChange={setZoom}
            onCropChange={setCrop}
            aspect={width / 350}
            onCropComplete={onCropComplete}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} ref={cRef} className={classes.cover} alt="" />
      )}
      {ownProfile && updateCover ? (
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
                {profilePictures?.resources?.length > 0 ? (
                  <div
                    onClick={() => {
                      setShowOld(true);
                      setShowCoverMenu(false);
                    }}
                    className={`${classes.open_cover_menu_item} hover1`}
                  >
                    <i className="photo_icon"></i>
                    Select Photo
                  </div>
                ) : null}
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={() => refInput.current?.click()}
                >
                  <i className="upload_icon"></i>
                  Upload Photo
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
      {showOld && (
        <OldCover
          setCoverPicture={setCoverPicture}
          setShowOld={setShowOld}
          classes={classes}
          profilePictures={profilePictures}
        />
      )}
    </div>
  );
};

export default Cover;
