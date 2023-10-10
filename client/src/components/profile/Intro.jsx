import React, { useState } from "react";
import Bio from "./Bio";
import { useDispatch } from "react-redux";
import { updateDetailsAction } from "../../redux/actions/profileActions";
import EditDetails from "./EditDetails";

const Intro = ({ ownProfile, details, classes }) => {
  const initial = {
    bio: details?.bio ? details?.bio : "",
    otherName: details?.otherName ? details?.otherName : "",
    workplace: details?.workplace ? details?.workplace : "",
    job: details?.job ? details?.job : "",
    highSchool: details?.highSchool ? details?.highSchool : "",
    college: details?.college ? details?.college : "",
    currentCity: details?.currentCity ? details?.currentCity : "",
    homeTown: details?.homeTown ? details?.homeTown : "",
    relationship: details?.relationship ? details?.relationship : "",
    instagram: details?.instagram ? details?.instagram : "",
  };

  const [infos, setInfos] = useState(initial);
  const [maxLength, setMaxLength] = useState(
    infos?.bio ? 100 - infos?.bio?.length : 100
  );
  const [showBio, setShowBio] = useState(false);
  const [visible, setVisible] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfos((prev) => {
      return { ...prev, [name]: value };
    });
    setMaxLength(100 - event.target.value.length);
  };

  const updateDetail = () => {
    dispatch(updateDetailsAction(infos));
    setShowBio(false);
  };

  return (
    <div className={classes.profile_card}>
      <h2 className={classes.profile_header}>Intro</h2>
      {infos?.bio && !showBio && (
        <div className={classes.info_col}>
          <span className={classes.info_text}>{infos?.bio}</span>
        </div>
      )}
      {ownProfile && !showBio && (
        <button
          className={`gray_btn ${classes.w100} hover2`}
          onClick={() => setShowBio(true)}
        >
          {details?.bio ? "Edit Bio" : "Add Bio"}
        </button>
      )}
      {showBio && (
        <Bio
          classes={classes}
          max={maxLength}
          handleChange={handleChange}
          infos={infos}
          setShowBio={setShowBio}
          updateDetail={updateDetail}
          placeholder={"Add Bio"}
          name="bio"
        />
      )}
      {infos?.job && infos?.workplace && (
        <div className={classes.info_profile}>
          <img src="../../../icons/job.png" alt="" />
          <span>
            Works as {infos?.job} at <b>{infos?.workplace}</b>
          </span>
        </div>
      )}
      {infos?.job && !infos?.workplace && (
        <div className={classes.info_profile}>
          <img src="../../../icons/job.png" alt="" />
          <span>
            Works as <b>{infos?.job}</b>
          </span>
        </div>
      )}
      {!infos?.job && infos?.workplace && (
        <div className={classes.info_profile}>
          <img src="../../../icons/job.png" alt="" />
          <span>
            Works at <b>{infos?.workplace}</b>
          </span>
        </div>
      )}
      {infos?.relationship && (
        <div className={classes.info_profile}>
          <img src="../../../icons/friends.png" alt="" />
          <b>{infos?.relationship}</b>
        </div>
      )}
      {infos?.college && (
        <div className={classes.info_profile}>
          <img src="../../../icons/studies.png" alt="" />
          <span>
            Studied in
            <b> {infos?.college}</b>
          </span>
        </div>
      )}
      {infos?.highSchool && (
        <div className={classes.info_profile}>
          <img src="../../../icons/studies.png" alt="" />
          <span>
            Studied in
            <b> {infos?.highSchool}</b>
          </span>
        </div>
      )}
      {infos?.currentCity && (
        <div className={classes.info_profile}>
          <img src="../../../icons/home.png" alt="" />
          <span>
            Lives in
            <b> {infos?.currentCity}</b>
          </span>
        </div>
      )}
      {infos?.homeTown && (
        <div className={classes.info_profile}>
          <img src="../../../icons/from.png" alt="" />
          <span>
            From
            <b> {infos?.homeTown}</b>
          </span>
        </div>
      )}
      {infos?.instagram && (
        <div className={classes.info_profile}>
          <img src="../../../icons/instagram.png" alt="" />
          <a href={`www.instagram.com/${infos?.instagram}`} className="hover1">
            {infos?.instagram}
          </a>
        </div>
      )}
      {ownProfile && (
        <button
          className={`gray_btn ${classes.w100} hover2`}
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {ownProfile && visible ? (
        <EditDetails
          details={details}
          classes={classes}
          handleChange={handleChange}
          updateDetail={updateDetail}
          infos={infos}
          setVisible={setVisible}
        />
      ) : null}
      {ownProfile && (
        <button className={`gray_btn ${classes.w100} hover2`}>
          Add Hobbies
        </button>
      )}
      {ownProfile && (
        <button className={`gray_btn ${classes.w100} hover2`}>
          Add Featured
        </button>
      )}
    </div>
  );
};

export default Intro;
