import React from "react";
import classes from "./createPost.module.css";
import { Feeling, LiveVideo, Photo } from "../../../svg";
import { useDispatch } from "react-redux";
import { postPopupActions } from "../../../redux/actions/postPopActions";

const CreatePost = ({ user }) => {
  const dispatch = useDispatch();
  const handlePostPopup = () => {
    dispatch(postPopupActions(true));
  };
  return (
    <div className={classes.createPost}>
      <div className={classes.createPost_header} onClick={handlePostPopup}>
        <img src={user?.picture} alt="" />
        <p className={classes.open_post}>
          What's on your mind, {user?.firstName}?
        </p>
      </div>
      <div className={classes.create_splitter}></div>
      <div className={classes.createPost_body}>
        <div className={`${classes.createPost_icon} hover1`}>
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div className={`${classes.createPost_icon} hover1`}>
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className={`${classes.createPost_icon} hover1`}>
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
