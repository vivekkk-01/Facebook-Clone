import { useState } from "react";
import { Link } from "react-router-dom";
import SettingsPrivacy from "./SettingsPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";

const UserMenu = ({ user, classes }) => {
  const [visible, setVisible] = useState(0);
  return (
    <div className={classes.mmenu}>
      {visible === 0 && (
        <div>
          <Link to="/profile" className={`${classes.mmenu_header} hover3`}>
            <img src={user?.picture} alt="" />
            <div className={classes.mmenu_col}>
              <span>
                {user?.firstName} {user?.lastName}
              </span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className={classes.mmenu_splitter}></div>
          <div className={`${classes.mmenu_main} hover3`}>
            <div className={classes.small_circle}>
              <i className="report_filled_icon"></i>
            </div>
            <div className={classes.mmenu_col}>
              <div className={classes.mmenu_span1}>Give feedback</div>
              <div className={classes.mmenu_span2}>
                Help us improve facebook
              </div>
            </div>
          </div>
          <div className={classes.mmenu_splitter}></div>
          <div
            className={`${classes.mmenu_item} hover3`}
            onClick={() => setVisible(1)}
          >
            <div className={classes.small_circle}>
              <i className="settings_filled_icon"></i>
            </div>
            <span>Settings & privacy</span>
            <div className={classes.rArrow}>
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className={`${classes.mmenu_item} hover3`}
            onClick={() => setVisible(2)}
          >
            <div className={classes.small_circle}>
              <i className="help_filled_icon"></i>
            </div>
            <span>Help & support</span>
            <div className={classes.rArrow}>
              <i className="right_icon"></i>
            </div>
          </div>
          <div
            className={`${classes.mmenu_item} hover3`}
            onClick={() => setVisible(3)}
          >
            <div className={classes.small_circle}>
              <i className="dark_filled_icon"></i>
            </div>
            <span>Display & Accessibility</span>
            <div className={classes.rArrow}>
              <i className="right_icon"></i>
            </div>
          </div>
          <div className={`${classes.mmenu_item} hover3`}>
            <div className={classes.small_circle}>
              <i className="logout_filled_icon"></i>
            </div>
            <span>Logout</span>
          </div>
        </div>
      )}
      {visible === 1 && (
        <SettingsPrivacy setVisible={setVisible} classes={classes} />
      )}
      {visible === 2 && (
        <HelpSupport setVisible={setVisible} classes={classes} />
      )}
      {visible === 3 && (
        <DisplayAccessibility setVisible={setVisible} classes={classes} />
      )}
    </div>
  );
};

export default UserMenu;
