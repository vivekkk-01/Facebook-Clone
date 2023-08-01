const GridPosts = ({ classes }) => {
  return (
    <div className={classes.createPost}>
      <div
        className={classes.createPost_header}
        style={{ justifyContent: "space-between" }}
      >
        <div className={classes.left_header_grid}>Posts</div>
        <div className={classes.flex}>
          <div className="gray_btn">
            <i className="equalize_icon"></i>
          </div>
          <div className="gray_btn">
            <i className="manage_icon"></i>
            Manage Posts
          </div>
        </div>
      </div>
      <div className={classes.create_splitter}></div>
      <div className={`${classes.createPost_body} ${classes.grid2}`}>
        <div className={`${classes.view_type} ${classes.active}`}>
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        <div className={classes.view_type}>
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  );
};

export default GridPosts;
