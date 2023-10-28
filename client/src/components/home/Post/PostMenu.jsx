import { useDispatch, useSelector } from "react-redux";
import MenuItem from "./MenuItem";
import {
  deletePostFromHomeAction,
  savePostAction,
} from "../../../redux/actions/postActions";
import { saveAs } from "file-saver";
import { deletePostFromProfileAction } from "../../../redux/actions/profileActions";
const PostMenu = ({
  postUserId,
  userId,
  imagesLength,
  classes,
  postId,
  setIsSavedPost,
  isSavedPost,
  images,
  isProfile,
}) => {
  const test = postUserId === userId ? true : false;
  const { savePostLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const savePostHandler = () => {
    if (savePostLoading) return;
    dispatch(savePostAction(postId));
    setIsSavedPost(!isSavedPost);
  };

  const downloadImagesHandler = async () => {
    if (images.length <= 0) return;
    images.map((image) => {
      saveAs(image.secure_url, "Image-from-Facebook.jpg");
    });
  };

  const deletePostHandler = () => {
    if (isProfile) {
      dispatch(deletePostFromProfileAction(postId));
    } else {
      dispatch(deletePostFromHomeAction(postId));
    }
  };

  return (
    <ul className={classes.post_menu}>
      {test ? <MenuItem icon="pin_icon" title="Pin Post" /> : null}
      <div
        onClick={savePostHandler}
        style={{
          opacity: `${savePostLoading ? 0.7 : 1}`,
        }}
      >
        {isSavedPost ? (
          <MenuItem
            icon="save_icon"
            title="Un-Save Post"
            subtitle="Remove this from your saved items."
            isCursorDefault={savePostLoading ? true : false}
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
            isCursorDefault={savePostLoading ? true : false}
          />
        )}
      </div>
      <div className={classes.line}></div>
      {test ? <MenuItem icon="edit_icon" title="Edit Post" /> : null}
      {!test ? (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      ) : null}
      <div onClick={downloadImagesHandler}>
        {imagesLength ? (
          <MenuItem icon="download_icon" title="Download" />
        ) : null}
      </div>
      {imagesLength ? (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      ) : null}
      {test ? (
        <MenuItem img="../../../icons/lock.png" title="Edit audience" />
      ) : null}
      {test ? (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      ) : null}
      {test ? (
        <MenuItem icon="delete_icon" title="Turn off translations" />
      ) : null}
      {test ? <MenuItem icon="date_icon" title="Edit Date" /> : null}
      {test ? (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      ) : null}
      {test ? <MenuItem icon="archive_icon" title="Move to archive" /> : null}
      <div onClick={() => deletePostHandler()}>
        {test ? (
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        ) : null}
      </div>
      {!test ? <div className={classes.line}></div> : null}
      {!test ? (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      ) : null}
    </ul>
  );
};
export default PostMenu;
