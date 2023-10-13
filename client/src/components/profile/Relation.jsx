import React, { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import {
  acceptRequestAction,
  addFriendAction,
  cancelRequestAction,
  followAction,
  rejectRequestAction,
  unFollowAction,
  unFriendAction,
} from "../../redux/actions/profileActions";
import { useDispatch, useSelector } from "react-redux";

const Relation = ({ classes, relation, profileId }) => {
  const [relationship, setRelationship] = useState(relation);
  const [relationMenu, setRelationMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const { relationshipLoading } = useSelector((state) => state.profile);
  const menuRef = useRef();
  const menuRef1 = useRef();
  const dispatch = useDispatch();

  useClickOutside(menuRef, () => {
    setRelationMenu(false);
  });

  useClickOutside(menuRef1, () => {
    setRespondMenu(false);
  });

  const addFriendHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        requestSent: true,
        following: true,
      };
    });
    dispatch(addFriendAction(profileId));
  };

  const cancelRequestHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        requestSent: false,
        following: false,
      };
    });
    dispatch(cancelRequestAction(profileId));
  };

  const followHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        following: true,
      };
    });
    setRespondMenu(false);
    setRelationMenu(false);
    dispatch(followAction(profileId));
  };

  const unFollowHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        following: false,
      };
    });
    setRespondMenu(false);
    setRelationMenu(false);
    dispatch(unFollowAction(profileId));
  };

  const acceptRequestHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        friends: true,
        following: true,
        requestSent: false,
        requestReceived: false,
      };
    });
    setRespondMenu(false);
    dispatch(acceptRequestAction(profileId));
  };

  const unFriendHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        friends: false,
        following: false,
        requestSent: false,
        requestReceived: false,
      };
    });
    setRespondMenu(false);
    dispatch(unFriendAction(profileId));
  };

  const requestRejectHandler = () => {
    if (relationshipLoading) return;
    setRelationship((prev) => {
      return {
        ...prev,
        friends: false,
        following: false,
        requestSent: false,
        requestReceived: false,
      };
    });
    setRespondMenu(false);
    dispatch(rejectRequestAction(profileId));
  };

  return (
    <div className={classes.relation}>
      {relationship?.friends ? (
        <div className={classes.friends_menu_wrap}>
          <button
            className="gray_btn"
            onClick={() => setRelationMenu(true)}
            disabled={relationshipLoading}
            style={{
              opacity: `${relationshipLoading ? 0.7 : 1}`,
              cursor: relationshipLoading ? "default" : "pointer",
            }}
          >
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {relationMenu && (
            <div className={classes.open_cover_menu} ref={menuRef}>
              <div className={`${classes.open_cover_menu_item} hover1`}>
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className={`${classes.open_cover_menu_item} hover1`}>
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              {relationship?.following ? (
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={unFollowHandler}
                  style={{
                    opacity: `${relationshipLoading ? 0.7 : 1}`,
                    cursor: relationshipLoading ? "default" : "pointer",
                  }}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Un-Follow
                </div>
              ) : (
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={followHandler}
                  style={{
                    opacity: `${relationshipLoading ? 0.7 : 1}`,
                    cursor: relationshipLoading ? "default" : "pointer",
                  }}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              <div
                className={`${classes.open_cover_menu_item} hover1`}
                onClick={unFriendHandler}
                style={{
                  opacity: `${relationshipLoading ? 0.7 : 1}`,
                  cursor: relationshipLoading ? "default" : "pointer",
                }}
              >
                <i className="unfriend_outlined_icon"></i>
                Un-Friend
              </div>
            </div>
          )}
        </div>
      ) : (
        !relationship?.requestSent &&
        !relationship?.requestReceived && (
          <button
            className="blue_btn"
            onClick={addFriendHandler}
            disabled={relationshipLoading}
            style={{
              opacity: `${relationshipLoading ? 0.7 : 1}`,
              cursor: relationshipLoading ? "default" : "pointer",
            }}
          >
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className={classes.invert}
            />
            <span>Add Friend</span>
          </button>
        )
      )}
      {relationship?.requestSent ? (
        <button
          className="blue_btn"
          onClick={cancelRequestHandler}
          disabled={relationshipLoading}
          style={{
            opacity: `${relationshipLoading ? 0.7 : 1}`,
            cursor: relationshipLoading ? "default" : "pointer",
          }}
        >
          <img
            src="../../../icons/cancelRequest.png"
            className={classes.invert}
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        relationship?.requestReceived && (
          <div className={classes.friends_menu_wrap}>
            <button
              className="gray_btn"
              onClick={() => setRespondMenu(true)}
              disabled={relationshipLoading}
              style={{
                opacity: `${relationshipLoading ? 0.7 : 1}`,
                cursor: relationshipLoading ? "default" : "pointer",
              }}
            >
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className={classes.open_cover_menu} ref={menuRef1}>
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={acceptRequestHandler}
                  style={{
                    opacity: `${relationshipLoading ? 0.7 : 1}`,
                    cursor: relationshipLoading ? "default" : "pointer",
                  }}
                >
                  Confirm
                </div>
                <div
                  className={`${classes.open_cover_menu_item} hover1`}
                  onClick={requestRejectHandler}
                  style={{
                    opacity: `${relationshipLoading ? 0.7 : 1}`,
                    cursor: relationshipLoading ? "default" : "pointer",
                  }}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className={classes.flex}>
        {relationship?.following ? (
          <button
            className="gray_btn"
            onClick={unFollowHandler}
            disabled={relationshipLoading}
            style={{
              opacity: `${relationshipLoading ? 0.7 : 1}`,
              cursor: relationshipLoading ? "default" : "pointer",
            }}
          >
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          !relationship?.following && (
            <button
              className="blue_btn"
              onClick={followHandler}
              disabled={relationshipLoading}
              style={{
                opacity: `${relationshipLoading ? 0.7 : 1}`,
                cursor: relationshipLoading ? "default" : "pointer",
              }}
            >
              <img
                src="../../../icons/follow.png"
                className={classes.invert}
                alt=""
              />
              <span>Follow</span>
            </button>
          )
        )}
        <button className={relationship?.friends ? "blue_btn" : "gray_btn"}>
          <img
            src="../../../icons/message.png"
            className={relationship?.friends ? classes.invert : ""}
            alt=""
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
};

export default Relation;
