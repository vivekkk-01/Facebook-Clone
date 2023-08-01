import { Dots } from "../../svg";
import stories from "../../data/stories";
import AddFriendSmallCard from "./AddFriendSmallCard";
const PplYouMayKnow = ({ classes }) => {
  return (
    <div className={classes.pplumayknow}>
      <div className={classes.pplumayknow_header}>
        People You May Know
        <div
          className={`${classes.post_header_right} ${classes.ppl_circle} hover1`}
        >
          <Dots />
        </div>
      </div>
      <div className={classes.pplumayknow_list}>
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={item.image} classes={classes} />
        ))}
      </div>
    </div>
  );
};

export default PplYouMayKnow;
