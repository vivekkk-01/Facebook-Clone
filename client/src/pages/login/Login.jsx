import React, { useState } from "react";

import classes from "./login.module.css";

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
