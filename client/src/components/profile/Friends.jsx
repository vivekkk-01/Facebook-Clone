const Friends = ({ friends, classes }) => {
  return (
    <div className={classes.profile_card}>
      <div className={classes.profile_card_header}>
        Friends
        <p className={classes.profile_header_link}>See all friends</p>
      </div>
      <div className={classes.profile_card_count}>
        {friends?.length === 0 || !friends
          ? ""
          : friends?.length === 1
          ? "1 Friend"
          : `${friends?.length} Friends`}
      </div>
      <div className={classes.profile_card_grid}>
        {friends?.length > 0 &&
          friends?.slice(0, 9).map((img) => (
            <div className={classes.profile_photo_card} key={img.public_id}>
              <img src={img.secure_url} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
