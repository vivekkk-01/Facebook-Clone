import React, { useRef, useState } from "react";
import classes from "./createPostPopup.module.css";
import EmojiPicker from "./EmojiPicker";
import AddToPost from "./AddToPost";
import ImagePreview from "./ImagePreview";
import { useDispatch, useSelector } from "react-redux";
import { postPopupActions } from "../../../../redux/actions/postPopActions";
import useClickOutside from "../../../../hooks/useClickOutside";
import PulseLoader from "react-spinners/PulseLoader";
import { createPost } from "../../../../api/post";
import PostError from "./PostError";
import { createdPostFromProfileAction } from "../../../../redux/actions/profileActions";
import { postFromHomeAction } from "../../../../redux/actions/postActions";

const CreatePostsPopup = ({ profile }) => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [background, setBackground] = useState("");
  const [showPrev, setShowPrev] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userInfo: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handlePostPopup = () => {
    dispatch(postPopupActions(false));
  };
  const popupRef = useRef();
  useClickOutside(popupRef, handlePostPopup);

  const handlePostSubmit = async () => {
    if (text.trim() === "" && imageFiles.length <= 0) {
      setError("Your post doesn't contain anything!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("background", background);
    imageFiles.map((file) => {
      formData.append("images", file);
    });
    formData.append("user", user.id);
    formData.append("path", `${user.username} Images`);
    const response = await createPost(formData, user.accessToken);
    setLoading(false);
    if (response.status === "ok") {
      setText("");
      setImages([]);
      setImageFiles([]);
      setBackground(null);
      dispatch(postPopupActions(false));
      if (profile) {
        dispatch(createdPostFromProfileAction(response.data));
      } else {
        dispatch(postFromHomeAction(response.data));
      }
    } else {
      setLoading(false);
      setError(response);
    }
  };

  return (
    <div className="blur_fixed">
      <div className={classes.postBox} ref={popupRef}>
        {error && (
          <PostError error={error} setError={setError} classes={classes} />
        )}
        <div className={classes.box_header}>
          <div
            className={classes.small_circle}
            style={{ cursor: "pointer" }}
            onClick={handlePostPopup}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className={classes.box_profile}>
          <img src={user.picture} alt="" className={classes.box_profile_img} />
          <div className={classes.box_col}>
            <div className={classes.box_profile_name}>
              {user.firstName} {user.lastName}
            </div>
            <div className={classes.box_privacy}>
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <EmojiPicker
            classes={classes}
            text={text}
            setText={setText}
            user={user}
            setBackground={setBackground}
            background={background}
          />
        ) : (
          <ImagePreview
            classes={classes}
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            setImages={setImages}
            images={images}
            setShowPrev={setShowPrev}
            setImageFiles={setImageFiles}
            setError={setError}
          />
        )}
        <AddToPost classes={classes} setShowPrev={setShowPrev} />
        <button
          className={classes.post_submit}
          style={{
            cursor: `${loading ? "default" : "pointer"}`,
            opacity: `${loading ? ".6" : "1"}`,
          }}
          onClick={handlePostSubmit}
          disabled={loading}
        >
          {loading ? <PulseLoader size={7} color="#fff" /> : "Post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePostsPopup;
