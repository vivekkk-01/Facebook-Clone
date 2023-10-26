import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import useClickOutside from "../../../hooks/useClickOutside";
import ClipLoader from "react-spinners/ClipLoader";
import {
  addCommentAction,
  resetCommentAction,
} from "../../../redux/actions/postActions";

const CreateComment = ({ user, classes, postId, createCommentHandler }) => {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const imgInput = useRef(null);
  const dispatch = useDispatch();
  const { comments, commentLoading, commentError } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  useEffect(() => {
    if (commentError) {
      setText("");
      setCommentImage("");
    }
  }, [commentError]);
  const handleEmoji = ({ emoji }, event) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (!file) return;
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  const setPickerRef = useRef();

  useClickOutside(setPickerRef, () => setPicker(false));

  const commentHandler = async (event) => {
    if (event.key === "Enter") {
      if (commentImage === "" && text === "") return;

      if (commentImage !== "") {
        const formData = new FormData();
        let image = await fetch(commentImage).then((b) => b.blob());
        formData.append("image", image);
        formData.append("comment", text);
        formData.append("postId", postId);
        createCommentHandler(formData);
        setText("");
        setCommentImage("");
      } else {
        createCommentHandler({ comment: text, image: "", postId });
        setText("");
      }
    }
  };

  return (
    <div className={classes.create_comment_wrap}>
      <div className={classes.create_comment}>
        <img src={user?.picture} alt="" />
        <div className={classes.comment_input_wrap}>
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className={`${classes.postError} ${classes.comment_error}`}>
              <div className={classes.postError_error}>{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          {commentError && (
            <div className={`${classes.postError} ${classes.comment_error}`}>
              <div className={classes.postError_error}>{commentError}</div>
              <button
                className="blue_btn"
                onClick={() => {
                  dispatch(resetCommentAction());
                  setText("");
                  setCommentImage("");
                }}
              >
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            onKeyUp={commentHandler}
          />
          {commentLoading && (
            <div
              className={classes.comment_circle}
              style={{ marginTop: "5px" }}
            >
              <ClipLoader color="#1876f2" size={20} />
            </div>
          )}
          <div
            ref={setPickerRef}
            className={`${classes.comment_circle_icon} hover2`}
            onClick={(event) => {
              event.preventDefault();
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
            {picker && (
              <div className={classes.comment_emoji_picker}>
                <Picker onEmojiClick={handleEmoji} autoFocusSearch={false} />
              </div>
            )}
          </div>
          <div
            className={`${classes.comment_circle_icon} hover2`}
            onClick={() => imgInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className={`${classes.comment_circle_icon} hover2`}>
            <i className="gif_icon"></i>
          </div>
          <div className={`${classes.comment_circle_icon} hover2`}>
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className={classes.comment_img_preview}>
          <img src={commentImage} alt="" />
          <div
            className={classes.small_white_circle}
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
