import React, { useState } from "react";
import store from "../../redux/store";
import classes from "./login.module.css";
import { redirect } from "react-router-dom";

import LoginForm from "../../components/login/LoginForm";
import LoginFooter from "../../components/login/LoginFooter";
import RegisterForm from "../../components/login/RegisterForm";

const Login = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={classes.login}>
      <div className={classes.login_wrapper}>
        <LoginForm classes={classes} setVisible={setVisible} />
        {visible && <RegisterForm classes={classes} setVisible={setVisible} />}
        <LoginFooter classes={classes} />
      </div>
    </div>
  );
};

export default Login;

export const loader = () => {
  const userInfo = store.getState().user.userInfo;
  if (userInfo) return redirect("/");
  return null;
};
