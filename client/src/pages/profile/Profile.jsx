import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../redux/actions/profileActions";
import Header from "../../components/header/Header";
import Cover from "../../components/profile/Cover";
import classes from "./profile.module.css";
import ProfilePictureInfos from "../../components/profile/ProfilePictureInfos";
import ProfileMenu from "../../components/profile/ProfileMenu";
import PplYouMayKnow from "../../components/profile/PplYouMayKnow";
import GridPosts from "../../components/profile/GridPosts";
import CreatePost from "../../components/home/createPost/CreatePost";
import Post from "../../components/home/Post/Post";
import Photos from "../../components/profile/Photos";
import Friends from "../../components/profile/Friends";
import ClipLoader from "react-spinners/ClipLoader";
import Intro from "../../components/profile/Intro";

const Profile = () => {
  const { username } = useParams();
  const user = useSelector((state) => state.user);
  const userInfo = user?.userInfo;
  const { profileInfo, error, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const ownProfile = username === userInfo?.username;

  useEffect(() => {
    if (userInfo) {
      dispatch(profileAction(true, username));
    } else {
      dispatch(profileAction(false, username));
    }
  }, [username, dispatch, userInfo]);

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipLoader loading={loading} size={80} color="#1876f2" />
        </div>
      ) : error ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="error_text" style={{ fontSize: "3rem" }}>
            {error}
          </h1>
        </div>
      ) : (
        <div className={classes.profile}>
          <Header page="profile" />
          <div className={classes.profile_top}>
            <div className={classes.profile_container}>
              <Cover
                ownProfile={ownProfile}
                cover={profileInfo?.cover || null}
                classes={classes}
              />
              <ProfilePictureInfos
                ownProfile={ownProfile}
                classes={classes}
                profile={profileInfo}
              />
              <ProfileMenu classes={classes} />
            </div>
          </div>

          <div className={classes.profile_bottom}>
            <div className={classes.profile_container}>
              <div className={classes.bottom_container}>
                <PplYouMayKnow classes={classes} />
                <div className={classes.profile_grid}>
                  <div className={classes.profile_left}>
                    <Intro
                      ownProfile={ownProfile}
                      details={profileInfo?.details}
                      classes={classes}
                    />
                    <Photos classes={classes} username={username} />
                    <Friends classes={classes} friends={profileInfo?.friends} />
                  </div>
                  <div className={classes.profile_right}>
                    {ownProfile ? <CreatePost user={userInfo} profile /> : null}
                    <GridPosts classes={classes} />
                    <div className={classes.posts}>
                      {profileInfo?.posts && profileInfo?.posts.length > 0 ? (
                        profileInfo?.posts.map((post) => (
                          <Post
                            post={post}
                            user={profileInfo}
                            profile
                            key={post._id}
                          />
                        ))
                      ) : (
                        <h2 className={classes.no_posts}>No posts available</h2>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
