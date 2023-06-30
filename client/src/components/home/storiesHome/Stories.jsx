import React from "react";
import classes from "./stories.module.css";
import { ArrowRight, Plus } from "../../../svg";
import Story from "./Story";
import stories from "../../../data/stories";
import { useMediaQuery } from "react-responsive";

const Stories = () => {
  const query1175px = useMediaQuery({
    query: "(max-width: 1175px)",
  });
  const query1030px = useMediaQuery({
    query: "(max-width: 1030px)",
  });
  const query960px = useMediaQuery({
    query: "(max-width: 960px)",
  });
  const query885px = useMediaQuery({
    query: "(max-width: 885px)",
  });
  const max = query885px
    ? 5
    : query960px
    ? 4
    : query1030px
    ? 5
    : query1175px
    ? 4
    : stories.length;
  return (
    <div className={classes.stories}>
      <div className={classes.create_story_card}>
        <img
          src="../../../images/default_pic.png"
          alt=""
          className={classes.create_story_img}
        />
        <div className={classes.plus_story}>
          <Plus color="#fff" />
        </div>
        <p className={classes.story_create_text}>Create Story</p>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Story story={story} classes={classes} />
      ))}
      <div className={classes.white_circle}>
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Stories;
