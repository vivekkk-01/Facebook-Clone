import React from "react";
import { Link } from "react-router-dom";

const LoginFooter = ({ classes }) => {
  return (
    <footer className={classes.login_footer}>
      <div className={classes.footer_splitter}></div>
      <div className={classes.login_footer_wrap}>
        <Link>Sign Up</Link>
        <Link>Log in</Link>
        <Link>Messenger</Link>
        <Link>Facebook Lite</Link>
        <Link>Watch</Link>
        <Link>Places</Link>
        <Link>Games</Link>
        <Link>Marketplace</Link>
        <Link>Facebook Pay</Link>
        <Link>Oculus</Link>
        <Link>Portal</Link>
        <Link>Instagram</Link>
        <Link>Bulletin</Link>
        <Link>Local</Link>
        <Link>Fundraisers</Link>
        <Link>Services</Link>
        <Link>Voting Information Centre</Link>
        <Link>Groups</Link>
        <Link>About</Link>
        <Link>Create ad</Link>
        <Link>Create Page</Link>
        <Link>Developers</Link>
        <Link>Careers</Link>
        <Link>Privacy</Link>
        <Link>Cookies</Link>
        <Link>
          AdChoices
          <i className="adChoices_icon"></i>
        </Link>
        <Link>Terms</Link>
        <Link>Help</Link>
      </div>
      <div className={classes.login_footer_wrap}>
        <Link style={{ fontSize: "12px", marginTop: "10px" }}>Meta © 2023</Link>
      </div>
    </footer>
  );
};

export default LoginFooter;
