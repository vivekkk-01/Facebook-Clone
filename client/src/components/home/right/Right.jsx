import React from "react";
import classes from "./right.module.css";
import { Dots, NewRoom, Search } from "../../../svg";
import Contacts from "./Contacts";

const Right = ({ user }) => {
  const color = "#65676b";
  return (
    <div className={classes.right_home}>
      <h2 className={classes.heading}>Sponsored</h2>
      <div className={classes.splitter1}></div>
      <div className={classes.contacts_wrap}>
        <div className={classes.contacts_header}>
          <h3 className={classes.contacts_header_left}>Contacts</h3>
          <div className={classes.contacts_header_right}>
            <div className={classes.contact_circle}>
              <NewRoom color={color} />
            </div>
            <div className={classes.contact_circle}>
              <Search color={color} />
            </div>
            <div className={classes.contact_circle}>
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className={classes.contacts_list}>
          <Contacts user={user} classes={classes} />
        </div>
      </div>
    </div>
  );
};

export default Right;
