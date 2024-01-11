import { Link } from "react-router-dom";

const Friends = ({ friends, classes }) => {
  if (friends?.length <= 0) {
    return null;
  }
  return (
    <div className={classes.profile_card}>
      <div className={classes.profile_card_header}>Friends</div>
      <div className={classes.profile_card_count}>
        {friends?.length === 0 || !friends
          ? ""
          : friends?.length === 1
          ? "1 Friend"
          : `${friends?.length} Friends`}
      </div>
      <div className={classes.profile_card_grid}>
        {friends?.length > 0 &&
          friends?.slice(0, 9).map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              className={classes.profile_photo_card}
              key={friend._id}
            >
              <img style={{ objectFit: "cover" }} src={friend.picture} alt="" />
              <span>
                {friend.first_name} {friend.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Friends;
