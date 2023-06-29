export default function AllMenuItem({ name, description, icon, classes }) {
  return (
    <div className={`${classes.all_menu_item} hover1`}>
      <img src={`../../left/${icon}.png`} alt="" />
      <div className={classes.all_menu_col}>
        <span>{name}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
