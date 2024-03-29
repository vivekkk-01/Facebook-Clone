import React, { useRef, useState } from "react";
import classes from "./post.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Dots, Public } from "../../../svg";
import Moment from "react-moment";
import ReactsPopup from "./ReactsPopup";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import useClickOutside from "../../../hooks/useClickOutside";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentAction,
  reactPostAction,
} from "../../../redux/actions/postActions";
import Comment from "./Comment";

const Post = ({ post, user, profile }) => {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isSavedPost, setIsSavedPost] = useState(false);
  const [reacted, setReacted] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const [reacts, setReacts] = useState([]);
  const [count, setCount] = useState(1);
  const [totalReacts, setTotalReacts] = useState(0);
  const postRef = useRef();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const menu = useRef(null);
  useClickOutside(menu, () => setShowMenu(false));

  const { comments: newComments } = useSelector((state) => state.post);

  useEffect(() => {
    const commentsArr = [];
    for (let i = post?.comments?.length - 1; i >= 0; i--) {
      commentsArr.push(post?.comments[i]);
    }
    setComments(commentsArr);
  }, [post]);

  useEffect(() => {
    if (newComments?.comments?.length > 0 && newComments.postId === post._id) {
      if (count < comments?.length) {
        setCount(2);
        const commentsArr = [];
        for (let i = newComments?.comments?.length - 1; i >= 0; i--) {
          commentsArr.push(newComments.comments[i]);
        }
        setComments(commentsArr);
      } else {
        const commentsArr = [];
        for (let i = newComments?.comments?.length - 1; i >= 0; i--) {
          commentsArr.push(newComments.comments[i]);
        }
        setComments(commentsArr);
      }
    }
  }, [newComments]);

  useEffect(() => {
    if (userInfo) {
      const user = JSON.parse(Cookies.get("user"));
      (async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_ROUTE}/post/get-reacts/${post._id}`,
          {
            headers: {
              id: user.id,
            },
          }
        );
        setReacts(data.reacts);
        setTotalReacts(data.total);
        setIsSavedPost(data.isSavedPost);
        if (data.reacted) {
          setReacted(data.reacted);
        }
      })();
    } else {
      (async () => {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_ROUTE}/post/get-reacts/${post._id}`
        );
        setReacts(data.reacts);
        setTotalReacts(data.total);
      })();
    }
  }, [post]);

  const dispatch = useDispatch();
  const reactHandler = (type) => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
    if (type === "" && reacted === "") {
      return;
    }
    if (type === "" && reacted !== "") {
      dispatch(reactPostAction(reacted, post._id));
      let index = reacts.findIndex((item) => item.react === reacted);
      if (index !== -1) {
        const newReacts = [
          ...reacts,
          (reacts[index].count = --reacts[index].count),
        ];
        const reactsArray = newReacts.sort((a, b) => {
          return b.count - a.count;
        });
        setReacts(reactsArray);
        setTotalReacts((prev) => --prev);
      }
    } else {
      dispatch(reactPostAction(type, post._id));
    }
    if (type.trim() === reacted.trim()) {
      setReacted("");
      let index = reacts.findIndex((item) => item.react === type);
      if (index !== -1) {
        const newReacts = [
          ...reacts,
          (reacts[index].count = --reacts[index].count),
        ];
        const reactsArray = newReacts.sort((a, b) => {
          return b.count - a.count;
        });
        setReacts(reactsArray);
        setTotalReacts((prev) => --prev);
      }
    } else {
      setReacted(type);
      let index = reacts.findIndex((item) => item.react === type);
      let index1 = reacts.findIndex((item) => item.react === reacted);
      if (index !== -1) {
        const newReacts = [
          ...reacts,
          (reacts[index].count = ++reacts[index].count),
        ];
        const reactsArray = newReacts.sort((a, b) => {
          return b.count - a.count;
        });
        setReacts(reactsArray);
      }
      if (index1 !== -1) {
        const newReacts = [
          ...reacts,
          (reacts[index1].count = --reacts[index1].count),
        ];
        const reactsArray = newReacts.sort((a, b) => {
          return b.count - a.count;
        });
        setReacts(reactsArray);
      }
      if (index1 === -1 && index !== -1) {
        setTotalReacts((prev) => ++prev);
      }
    }
  };

  const commentHandler = (data) => {
    dispatch(addCommentAction(data));
  };

  return (
    <div
      className={classes.post}
      style={{ width: `${profile && "100%"}` }}
      ref={postRef}
    >
      <div className={classes.post_header}>
        <Link
          className={classes.post_header_left}
          to={`/profile/${post.user.username}`}
        >
          <img src={post.user.picture} alt="" />
          <div className={classes.header_col}>
            <div className={classes.post_profile_name}>
              {post.user.first_name} {post.user.last_name}
              <p className={classes.updated_p}>
                {post.type === "profilePicture" &&
                  `Updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "coverPicture" &&
                  `Updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </p>
              <p className={classes.post_profile_privacy_date}>
                <Moment fromNow interval={30}>
                  {post.createdAt}
                </Moment>
                <Public color="#828387" />
              </p>
            </div>
          </div>
        </Link>
        {userInfo && (
          <div ref={menu}>
            <div
              className={`${classes.dots} hover2`}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <Dots color="#828387" />
            </div>
            {showMenu && (
              <PostMenu
                userId={userInfo.id}
                postUserId={post.user._id}
                imagesLength={post?.images?.length}
                setShowMenu={setShowMenu}
                classes={classes}
                postId={post._id}
                isSavedPost={isSavedPost}
                setIsSavedPost={setIsSavedPost}
                images={post?.images}
                isProfile={profile}
              />
            )}
          </div>
        )}
      </div>

      {post.background ? (
        <div
          className={classes.post_bg}
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <p className={classes.post_bg_text}>{post.text}</p>
        </div>
      ) : (
        <>
          <p className={classes.post_text}>{post.text}</p>
          {post.images && post.images.length ? (
            <div
              className={
                post.images.length === 1
                  ? classes.grid_1
                  : post.images.length === 2
                  ? classes.grid_2
                  : post.images.length === 3
                  ? classes.grid_3
                  : post.images.length === 4
                  ? classes.grid_4
                  : post.images.length >= 5 && classes.grid_5
              }
            >
              {post.images.slice(0, 5).map((image, i) => (
                <img
                  src={image.secure_url}
                  key={i}
                  alt=""
                  className={`img-${i}`}
                />
              ))}
              {post.images.length > 5 && (
                <div className={classes["more-pics-shadow"]}>
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          ) : null}
        </>
      )}
      <div className={classes.post_infos}>
        <div className={classes.reacts_count}>
          <div className={classes.reacts_count_imgs}>
            {reacts &&
              reacts
                .slice(0, 3)
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .map(
                  (react) =>
                    react.count > 0 && (
                      <img
                        key={react.react}
                        src={`../../../reacts/${react.react}.svg`}
                      />
                    )
                )}
          </div>
          <div className={classes.reacts_count_num}>
            {totalReacts > 0 && totalReacts}
          </div>
        </div>
        <div className={classes.to_right}>
          <div className={classes.comments_count}>
            {comments?.length > 0
              ? `${comments?.length} comments`
              : "0 comments"}
          </div>
          <div className={classes.share_count}>1 share</div>
        </div>
      </div>
      <div className={classes.post_actions}>
        <ReactsPopup
          classes={classes}
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className={`${classes.post_action} hover1`}
          onMouseOver={() => {
            setVisible(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler("")}
        >
          {reacted ? (
            <img
              src={`../../../reacts/${reacted}.svg`}
              style={{ width: "18px" }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `
          
          ${
            reacted === "like"
              ? "#4267b2"
              : reacted === "love"
              ? "#f63459"
              : reacted === "haha"
              ? "#f7b125"
              : reacted === "sad"
              ? "#f7b125"
              : reacted === "wow"
              ? "#f7b125"
              : reacted === "angry"
              ? "#e4605a"
              : ""
          }
          `,
            }}
          >
            {reacted ? reacted : "Like"}
          </span>
        </div>
        <div
          className={`${classes.post_action} hover1`}
          onClick={() => {
            if (!userInfo) {
              navigate("/login");
            }
          }}
        >
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div
          className={`${classes.post_action} hover1`}
          onClick={() => {
            if (!userInfo) {
              navigate("/login");
            }
          }}
        >
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className={classes.comments_wrap}>
        <div className={classes.comments_order}></div>
        {userInfo && (
          <CreateComment
            classes={classes}
            user={user}
            postId={post._id}
            createCommentHandler={commentHandler}
          />
        )}
        {comments &&
          comments
            ?.slice(0, count)
            .sort((a, b) => {
              return new Date(b.commentedAt) - new Date(a.commentedAt);
            })
            .map((comment, index) => (
              <Comment key={index} comment={comment} classes={classes} />
            ))}
        {count < comments?.length && (
          <div
            className={classes.view_comments}
            onClick={() => setCount(comments?.length)}
          >
            View more comments
          </div>
        )}
        {count === comments?.length && count !== 1 && (
          <div className={classes.view_comments} onClick={() => setCount(1)}>
            View less comments
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
