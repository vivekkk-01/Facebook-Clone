import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useMediaQuery } from "react-responsive";

const EmojiPicker = ({
  classes,
  text,
  setText,
  type2,
  user,
  background,
  setBackground,
}) => {
  const [currentPosition, setcurrentPosition] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [showBgs, setShowBgs] = useState(false);
  const bgRef = useRef();
  const textRef = useRef();
  const sm = useMediaQuery({
    query: "(max-width:550px)",
  });

  useEffect(() => {
    textRef.current.selectionEnd = currentPosition;
  }, [currentPosition]);

  const handleEmojiClick = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setcurrentPosition(start.length + emoji.length);
  };

  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];

  const backgroundHandler = (i) => {
    setBackground(postBackgrounds[i]);
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    bgRef.current.classList.add(classes.bgHandler);
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove(classes.bgHandler);
  };

  return (
    <div className={type2 ? classes.images_input : ""}>
      <div className={!type2 ? classes.flex_center : ""} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user.firstName}`}
          className={`${classes.post_input} ${type2 ? "input2" : ""} ${
            sm && !background && classes.l0
          }`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? classes.post_emojis_wrap : ""}>
        {showPicker && (
          <div
            className={`${classes.comment_emoji_picker} ${
              type2 ? classes.movepicker2 : classes.rlmove
            }`}
          >
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => setShowBgs((prev) => !prev)}
          />
        )}
        {!type2 && showBgs && (
          <div className={classes.post_backgrounds}>
            <div
              className={classes.no_bg}
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon ${type2 ? classes.moveleft : ""}`}
          onClick={() => setShowPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
};

export default EmojiPicker;
