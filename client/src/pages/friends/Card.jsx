import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cancelFriendRequestAction, confirmFriendRequestAction, deleteFriendRequestAction } from "../../redux/actions/userActions";

export default function Card({ user, type, classes }) {
  const dispatch = useDispatch();
  const cancelHandler = () => {
    dispatch(cancelFriendRequestAction(user._id));
  };
  
  const confirmHandler = () => {
    dispatch(confirmFriendRequestAction(user));
  };

  const deleteHandler = () => {
    dispatch(deleteFriendRequestAction(user));
  };
  
  return (
    <div className={classes.req_card}>
      <Link to={`/profile/${user.username}`}>
        <img src={user.picture} alt="" />
      </Link>
      <div className={classes.req_name}>
        {user.first_name} {user.last_name}
      </div>
      {type === "sent" ? (
        <button
          onClick={cancelHandler}
          className="blue_btn"
          style={{ backgroundColor: "red" }}
        >
          Cancel Request
        </button>
      ) : type === "request" ? (
        <>
          <button className="blue_btn" onClick={confirmHandler}>Confirm</button>
          <button className="gray_btn" style={{ backgroundColor: "red" }} onClick={deleteHandler}>
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
