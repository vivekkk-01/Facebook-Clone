import React from "react";

const Story = ({ story, classes }) => {
  return (
    <div className={classes.story}>
      <img src={story.image} alt="" className={classes.story_img} />
      <div className={classes.story_profile_pic}>
        <img src={story.profile_picture} alt="" />
      </div>
      <p className={classes.story_profile_name}>{story.profile_name}</p>
    </div>
  );
};

export default Story;
