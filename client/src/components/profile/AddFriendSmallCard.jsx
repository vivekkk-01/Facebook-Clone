const AddFriendSmallCard = ({ item, classes }) => {
  return (
    <div className={classes.addfriendCard}>
      <div className={classes.addfriend_imgsmall}>
        <img src={item.profile_picture} alt="" />
        <div className={classes.addfriend_infos}>
          <h2 className={classes.addfriend_name}>
            {item.profile_name.length > 11
              ? `${item.profile_name.substring(0, 11)}...`
              : item.profile_name}
          </h2>
          <div className={`${classes.light_blue} light_blue_btn`}>
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFriendSmallCard;
