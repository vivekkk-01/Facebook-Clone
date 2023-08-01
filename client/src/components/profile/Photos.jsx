import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allImagesAction } from "../../redux/actions/profileActions";
import ClipLoader from "react-spinners/ClipLoader";

const Photos = ({ classes, username }) => {
  const { allImages, imagesLoading, imagesError } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();
  const path = `${username} Images`;
  const max = 30;
  useEffect(() => {
    dispatch(allImagesAction({ path, max }));
  }, []);

  return (
    <>
      {imagesLoading ? (
        <div style={{ margin: ".5rem 0" }}>
          <ClipLoader loading={imagesLoading} size={50} color="#1876f2" />
        </div>
      ) : imagesError ? (
        <div style={{ margin: ".5rem 0" }}>
          <h1 className="error_text" style={{ fontSize: "2rem" }}>
            {imagesError}
          </h1>
        </div>
      ) : (
        <div className={classes.profile_card}>
          <div className={classes.profile_card_header}>
            Photos
            <p className={classes.profile_header_link}>See all photos</p>
          </div>
          <div className={classes.profile_card_count}>
            {allImages?.resources?.length === 0 ||
            !allImages ||
            !allImages?.resources
              ? ""
              : allImages?.resources?.length === 1
              ? "1 Photo"
              : `${allImages?.resources?.length} Photos`}
          </div>
          <div className={classes.profile_card_grid}>
            {allImages?.resources &&
              allImages?.resources.slice(0, 9).map((img) => (
                <div className={classes.profile_photo_card} key={img.public_id}>
                  <img src={img.secure_url} alt="" />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;
