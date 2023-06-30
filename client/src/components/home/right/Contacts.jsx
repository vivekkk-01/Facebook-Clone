import React from "react";

const Contacts = ({ classes, user }) => {
  return (
    <div className={classes.contact}>
      <div className={classes.contact_img}>
        <img src={user?.picture} alt="" />
      </div>
      <span>
        {user?.firstName} {user?.lastName}
      </span>
    </div>
  );
};

export default Contacts;
