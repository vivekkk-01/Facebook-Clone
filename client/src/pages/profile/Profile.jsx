import React from "react";
import store from "../../redux/store";
import { redirect } from "react-router-dom";

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;

export const loader = () => {
  const userInfo = store.getState().user.userInfo;
  if (!userInfo) return redirect("/login");
  return null;
};
