import MenuItem from "./MenuItem";
const PostMenu = ({ postUserId, userId, imagesLength, classes }) => {
  const test = postUserId === userId ? true : false;
  return (
    <ul className={classes.post_menu}>
      {test ? <MenuItem icon="pin_icon" title="Pin Post" /> : null}
      <MenuItem
        icon="save_icon"
        title="Save Post"
        subtitle="Add this to your saved items."
      />
      <div className={classes.line}></div>
      {test ? <MenuItem icon="edit_icon" title="Edit Post" /> : null}
      {!test ? (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      ) : null}
      {imagesLength ? <MenuItem icon="download_icon" title="Download" /> : null}
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
      {test ? (
        <MenuItem
          icon="trash_icon"
          title="Move to trash"
          subtitle="items in your trash are deleted after 30 days"
        />
      ) : null}
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
