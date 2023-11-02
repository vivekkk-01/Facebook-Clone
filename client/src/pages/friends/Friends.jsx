import React, { useEffect } from "react";
import classes from "./friends.module.css";
import Header from "../../components/header/Header";
import { Friends as FriendsIcon } from "../../svg";
import { useDispatch, useSelector } from "react-redux";
import { friendsInfoAction } from "../../redux/actions/userActions";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "./Card";
import { Link, useParams } from "react-router-dom";

const Friends = () => {
  const { friendsInfoLoading, friendsInfo, friendsInfoError } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(friendsInfoAction());
  }, []);

  const { type } = useParams();
  return (
    <>
      <Header page="friends" />
      {friendsInfoLoading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipLoader loading={friendsInfoLoading} size={80} color="#1876f2" />
        </div>
      ) : friendsInfoError ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="error_text" style={{ fontSize: "3rem" }}>
            {friendsInfoError}
          </h1>
        </div>
      ) : (
        <div className={classes.friends}>
          <div className={classes.friends_left}>
            <div className={classes.friends_left_header}>
              <h3>Friends</h3>
              <div className="small_circle">
                <i className="settings_filled_icon"></i>
              </div>
            </div>
            <div className={classes.friends_left_wrap}>
              <Link
                to="/friends"
                className={`${classes.mmenu_item}  ${
                  type === undefined && classes.active_friends
                } ${type !== undefined && "hover3"}`}
              >
                <div className="small_circle" style={{ background: "#1876f2" }}>
                  <FriendsIcon color="white" />
                </div>
                <span>Home</span>
              </Link>
              <Link
                to={"/friends/requests"}
                className={`${classes.mmenu_item} ${
                  type === "requests" && classes.active_friends
                } hover3`}
              >
                <div className="small_circle">
                  <i className="friends_requests_icon"></i>
                </div>
                <span>Friend Requests</span>
                {type !== "requests" && (
                  <div className={classes.rArrow}>
                    <i className="right_icon"></i>
                  </div>
                )}
              </Link>
              <Link
                to={"/friends/sent"}
                className={`${classes.mmenu_item} ${
                  type === "sent" && classes.active_friends
                } hover3`}
              >
                <div className="small_circle">
                  <i className="friends_requests_icon"></i>
                </div>
                <span>Sent Requests</span>
                {type !== "sent" && (
                  <div className={classes.rArrow}>
                    <i className="right_icon"></i>
                  </div>
                )}
              </Link>
              <Link
                to={"/friends/all"}
                className={`${classes.mmenu_item} ${
                  type === "all" && classes.active_friends
                } hover3`}
              >
                <div className="small_circle">
                  <i className="all_friends_icon"></i>
                </div>
                <span>All Friends</span>
                {type !== "all" && (
                  <div className={classes.rArrow}>
                    <i className="right_icon"></i>
                  </div>
                )}
              </Link>
              <div className={`${classes.mmenu_item} hover3`}>
                <div className="small_circle">
                  <i className="friends_suggestions_icon"></i>
                </div>
                <span>Suggestions</span>
                <div className={classes.rArrow}>
                  <i className="right_icon"></i>
                </div>
              </div>

              <div className={`${classes.mmenu_item} hover3`}>
                <div className="small_circle">
                  <i className="birthdays_icon"></i>
                </div>
                <span>Birthdays</span>
                <div className={classes.rArrow}>
                  <i className="right_icon"></i>
                </div>
              </div>
              <div className={`${classes.mmenu_item} hover3`}>
                <div className="small_circle">
                  <i className="all_friends_icon"></i>
                </div>
                <span>Custom Lists</span>
                <div className={classes.rArrow}>
                  <i className="right_icon"></i>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.friends_right}>
            {(type === undefined || type === "requests") && (
              <div className={classes.friends_right_wrap}>
                <div className={classes.friends_left_header}>
                  <h3>Friend Requests</h3>
                  {friendsInfo?.requestsReceived?.length > 0 &&
                    type === undefined && (
                      <Link
                        to={"/friends/requests"}
                        className={`${classes.see_link} hover3`}
                      >
                        See all
                      </Link>
                    )}
                </div>
                {friendsInfo?.requestsReceived?.length > 0 && (
                  <div className="flex_wrap">
                    {friendsInfo?.requestsReceived &&
                      friendsInfo?.requestsReceived.map((user) => (
                        <Card
                          classes={classes}
                          user={user}
                          key={user._id}
                          type="request"
                        />
                      ))}
                  </div>
                )}
                {friendsInfo?.requestsReceived?.length <= 0 && (
                  <h3 style={{ margin: ".5rem 0", opacity: 0.7 }}>
                    You don't have any pending friend requests!
                  </h3>
                )}
              </div>
            )}
            {(type === undefined || type === "sent") && (
              <div className={classes.friends_right_wrap}>
                <div className={classes.friends_left_header}>
                  <h3>Sent Requests</h3>
                  {friendsInfo?.requestsSent?.length > 0 &&
                    type === undefined && (
                      <Link
                        to={"/friends/sent"}
                        className={`${classes.see_link} hover3`}
                      >
                        See all
                      </Link>
                    )}
                </div>
                {friendsInfo?.requestsSent?.length > 0 && (
                  <div className="flex_wrap">
                    {friendsInfo?.requestsSent &&
                      friendsInfo?.requestsSent.map((user) => (
                        <Card
                          classes={classes}
                          user={user}
                          key={user._id}
                          type="sent"
                        />
                      ))}
                  </div>
                )}
                {friendsInfo?.requestsSent?.length <= 0 && (
                  <h3 style={{ margin: ".5rem 0", opacity: 0.7 }}>
                    You haven't sent any friend request!
                  </h3>
                )}
              </div>
            )}
            {(type === undefined || type === "all") && (
              <div className={classes.friends_right_wrap}>
                <div className={classes.friends_left_header}>
                  <h3>Friends</h3>
                  {friendsInfo?.friends?.length > 0 && type === undefined && (
                    <Link
                      to={"/friends/all"}
                      className={`${classes.see_link} hover3`}
                    >
                      See all
                    </Link>
                  )}
                </div>
                {friendsInfo?.friends?.length > 0 && (
                  <div className="flex_wrap">
                    {friendsInfo?.friends &&
                      friendsInfo?.friends.map((user) => (
                        <Card
                          classes={classes}
                          user={user}
                          key={user._id}
                          type="friends"
                        />
                      ))}
                  </div>
                )}
                {friendsInfo?.friends?.length <= 0 && (
                  <h3 style={{ margin: ".5rem 0", opacity: 0.7 }}>
                    You don't have any friends!
                  </h3>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Friends;
