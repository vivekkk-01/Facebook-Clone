import React from "react";
import Moment from "react-moment";

const Comment = ({ comment, classes }) => {
  return (
    <div className={classes.comment}>
      <img
        src={comment?.commentBy?.picture}
        className={classes.comment_img}
        alt=""
      />
      <div className={classes.comment_col}>
        <div className={classes.comment_wrap}>
          <div className={classes.comment_name}>
            {comment?.commentBy?.first_name} {comment?.commentBy?.last_name}
          </div>
          <div className={classes.comment_text}>{comment.comment}</div>
        </div>

        {comment.image && (
          <img src={comment.image} className={classes.comment_image} />
        )}

        <div className={classes.comment_actions}>
          <span>Like</span>
          <span>Reply</span>
          <span>
            <Moment fromNow interval={30}>
              {comment.commentedAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
