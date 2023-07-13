import classes from "./post.module.css";

const MenuItem = ({ icon, title, subtitle, img }) => {
  return (
    <li className="hover1">
      {img ? <img src={img} alt="" /> : <i className={icon}></i>}
      <div className={classes.post_menu_text}>
        <span>{title}</span>
        {subtitle && <span className={classes.menu_post_col}>{subtitle}</span>}
      </div>
    </li>
  );
};

export default MenuItem;
