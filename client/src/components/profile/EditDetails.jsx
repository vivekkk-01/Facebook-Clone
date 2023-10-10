import { useRef } from "react";
import Detail from "./Detail";
import useClickOutside from "../../hooks/useClickOutside";

export default function EditDetails({
  details,
  classes,
  handleChange,
  updateDetail,
  infos,
  setVisible,
}) {
  const editRef = useRef();
  useClickOutside(editRef, () => setVisible(false));
  return (
    <div className="blur_fixed">
      <div className={`${classes.postBox} ${classes.infosBox}`} ref={editRef}>
        <div className={classes.box_header}>
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className={`${classes.details_wrapper} scrollbar`}>
          <div className={classes.details_col}>
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>
          <h2 className={classes.details_header}>Other Name</h2>
          <Detail
            text="Other Name"
            value={details?.otherName}
            img="studies"
            placeholder="Add other name"
            name="otherName"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <h2 className={classes.details_header}>Work</h2>
          <Detail
            text="Job"
            value={details?.job}
            img="job"
            placeholder="Add Job Title"
            name="job"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <Detail
            text="Workplace"
            value={details?.workplace}
            img="job"
            placeholder="Add Workplace"
            name="workplace"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <h2 className={classes.details_header}>Education</h2>
          <Detail
            text="High School"
            value={details?.highSchool}
            img="studies"
            placeholder="Add High School Name"
            name="highSchool"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <Detail
            text="College"
            value={details?.college}
            img="studies"
            placeholder="Add College Name"
            name="college"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <h2 className={classes.details_header}>Current City</h2>
          <Detail
            text="Current City"
            value={details?.currentCity}
            img="home"
            placeholder="Add City Name"
            name="currentCity"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <h2 className={classes.details_header}>Home Town</h2>
          <Detail
            text="Home Town"
            value={details?.homeTown}
            img="from"
            placeholder="Add Town/City Name"
            name="homeTown"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
          <h2 className={classes.details_header}>Relationship</h2>
          <Detail
            text="Relationship"
            value={details?.relationship}
            img="friends"
            name="relationship"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
            rel
          />
          <h2 className={classes.details_header}>Instagram</h2>
          <Detail
            text="Instagram"
            value={details?.instagram}
            img="instagram"
            placeholder="Add Instagram Link"
            name="instagram"
            classes={classes}
            handleChange={handleChange}
            updateDetail={updateDetail}
            infos={infos}
          />
        </div>
      </div>
    </div>
  );
}
