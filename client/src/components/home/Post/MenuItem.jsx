import classes from "./post.module.css";

const MenuItem = ({ icon, title, subtitle, img, isCursorDefault }) => {
  return (
    <li
      className="hover1"
      style={{ cursor: isCursorDefault ? "default" : "pointer" }}
    >
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className={classes.post_menu_text}>
        <span>{title}</span>
        {subtitle && <span className={classes.menu_post_col}>{subtitle}</span>}
      </div>
    </li>
  );
};

export default MenuItem;
