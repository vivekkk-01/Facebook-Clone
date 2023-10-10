import { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../helpers/getCroppedImg";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { profilePictureAction } from "../../redux/actions/profileActions";
import { resetUpdateProfilePic } from "../../redux/slices/profileSlice";
import { setUserInfoAction } from "../../redux/actions/userActions";
import Cookies from "js-cookie";

const UpdateProfilePicture = ({
  setImage,
  image,
  classes,
  setError,
  setShow,
}) => {
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [prevImage, setPrevImage] = useState(image);
  const sliderRef = useRef();
  const dispatch = useDispatch();
  const { profileInfo, updatedProfilePic, error, loading } = useSelector(
    (state) => state.profile
  );

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setPrevImage(img);
        } else {
          updateProfilePic();
        }
      } catch (error) {
        setError("Something went wrong, please try again!");
      }
    },
    [croppedAreaPixels]
  );

  useEffect(() => {
    if (updatedProfilePic) {
      dispatch(setUserInfoAction(JSON.parse(Cookies.get("user"))));
      dispatch(resetUpdateProfilePic());
      setImage("");
      setShow(false);
    }
  }, [updatedProfilePic]);

  const updateProfilePic = async () => {
    let img = await getCroppedImg(prevImage, croppedAreaPixels);
    let blob = await fetch(img).then((b) => b.blob());
    const path = `${profileInfo?.username}/profile_pictures`;
    let formData = new FormData();
    formData.append("image", blob);
    formData.append("path", path);
    dispatch(profilePictureAction(formData));
  };

  return (
    <>
      {error ? (
        <div
          className={`${classes.postBox}`}
          style={{ height: "400px", width: "700px", overflow: "hidden" }}
        >
          <div className={`${classes.postError} ${classes.comment_error}`}>
            <h2 className={classes.postError_error}>{error}</h2>
            <button
              className="blue_btn"
              onClick={() => {
                dispatch(resetUpdateProfilePic());
                setImage("");
              }}
            >
              Try again
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{ height: "550px " }}
          className={`${classes.postBox} ${classes.update_img}`}
        >
          <div className={classes.box_header}>
            <div className="small_circle" onClick={() => setImage("")}>
              <i className="exit_icon"></i>
            </div>
            <span>Update profile picture</span>
          </div>

          <div className={classes.update_center}>
            <div className={classes.cropper}>
              <Cropper
                image={prevImage}
                crop={crop}
                zoom={zoom}
                onZoomChange={setZoom}
                onCropChange={setCrop}
                aspect={1 / 1}
                cropShape="round"
                onCropComplete={onCropComplete}
                showGrid={false}
              />
            </div>
            <div className={classes.slider}>
              <div
                className={`${classes.slider_circle} hover1`}
                onClick={() => {
                  sliderRef.current.stepDown();
                  setZoom(sliderRef.current.value);
                }}
              >
                <i className="minus_icon"></i>
              </div>
              <input
                type="range"
                step={0.2}
                min={1}
                max={3}
                value={zoom}
                ref={sliderRef}
                onChange={(e) => setZoom(e.target.value)}
              />
              <div
                className={`${classes.slider_circle} hover1`}
                onClick={() => {
                  sliderRef.current.stepUp();
                  setZoom(sliderRef.current.value);
                }}
              >
                <i className="plus_icon"></i>
              </div>
            </div>
          </div>
          <div className={classes.flex_up}>
            <div
              className="gray_btn"
              onClick={getCroppedImage.bind(null, "show")}
            >
              <i className="crop_icon"></i>Crop photo
            </div>
            <div className="gray_btn">
              <i className="temp_icon"></i>Make Temporary
            </div>
          </div>
          {
            <div className={classes.flex_p_t}>
              <i className="public_icon"></i>
              Your profile picture is public
            </div>
          }
          <div className={classes.update_submit_wrap}>
            <span
              aria-disabled={loading}
              style={{ opacity: `${loading ? ".7" : "1"}` }}
              className={classes.red_link}
              onClick={() =>
                prevImage !== image ? setPrevImage(image) : setImage("")
              }
            >
              Cancel
            </span>
            <button
              disabled={loading}
              style={{ opacity: `${loading ? ".7" : "1"}` }}
              className="blue_btn"
              onClick={getCroppedImage.bind(null, false)}
            >
              {loading ? (
                <PulseLoader size={10} color="#fff" loading={loading} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProfilePicture;
