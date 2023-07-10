import React, { useRef } from "react";
import EmojiPicker from "./EmojiPicker";

const ImagePreview = ({
  classes,
  text,
  user,
  setText,
  setImages,
  images,
  setShowPrev,
  setImageFiles,
  setError,
}) => {
  const imageRef = useRef();

  const handleImagePick = (e) => {
    setImageFiles((prev) => [...prev, e.target.files[0]]);
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      if (!img.type.startsWith("image")) {
        setError(`${img.name}'s file format is not supported!`);
        files = files.filter((file) => file.name !== img.name);
        return;
      }
      if (img.size > 5000000) {
        setError(`${img.name}'s file size is too large!`);
        files = files.filter((file) => file.name !== img.name);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };

  return (
    <div className={`${classes.overflow_a} scrollbar`}>
      <EmojiPicker
        text={text}
        user={user}
        setText={setText}
        classes={classes}
        type2
      />
      <div className={classes.add_pics_wrap}>
        <input
          ref={imageRef}
          onChange={handleImagePick}
          multiple
          type="file"
          hidden
          accept=".jpg, .jpeg, .png"
        />
        {images && images.length ? (
          <div className={`${classes.add_pics_inside1} ${classes.p0}`}>
            <div className={classes.preview_actions}>
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos
              </button>
            </div>
            <div
              className={classes.small_white_circle}
              onClick={() => {
                setImages([]);
                setImageFiles([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? classes.preview1
                  : images.length === 2
                  ? classes.preview2
                  : images.length === 3
                  ? classes.preview3
                  : images.length === 4
                  ? classes.preview4
                  : images.length === 5
                  ? classes.preview5
                  : images.length % 2 === 0
                  ? classes.preview6
                  : `${classes.preview6} ${classes.singular_grid}`
              }
            >
              {images.map((image, i) => (
                <img src={image} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className={classes.add_pics_inside1}>
            <div
              className={classes.small_white_circle}
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={classes.add_col}
              onClick={() => {
                imageRef.current?.click();
              }}
            >
              <div className={classes.add_circle}>
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className={classes.add_pics_inside2}>
          <div className={classes.add_circle}>
            <i className="phone_icon"></i>
          </div>
          <p className={classes.mobile_text}>
            Add photos from you mobile device.
          </p>
          <button className={classes.addphone_btn}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
