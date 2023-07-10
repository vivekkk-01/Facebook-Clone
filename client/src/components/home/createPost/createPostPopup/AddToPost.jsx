import { Dots, Feeling, Photo } from "../../../../svg";
const AddToPost = ({ classes, setShowPrev }) => {
  return (
    <div className={classes.addtoyourpost}>
      <div className={classes.addto_text}>Add to your post</div>
      <div
        className={`${classes.post_header_right} hover1`}
        onClick={() => {
          setShowPrev(true);
        }}
      >
        <Photo color="#45bd62" />
      </div>
      <div className={`${classes.post_header_right} hover1`}>
        <i className="tag_icon"></i>
      </div>
      <div className={`${classes.post_header_right} hover1`}>
        <Feeling color="#f7b928" />
      </div>
      <div className={`${classes.post_header_right} hover1`}>
        <i className="maps_icon"></i>
      </div>
      <div className={`${classes.post_header_right} hover1`}>
        <i className="microphone_icon"></i>
      </div>
      <div className={`${classes.post_header_right} hover1`}>
        <Dots color="#65676b" />
      </div>
    </div>
  );
};

export default AddToPost;
