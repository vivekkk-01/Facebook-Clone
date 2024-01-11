import Header from "../../components/header/Header";
import Left from "../../components/home/leftHome/Left";
import { useDispatch, useSelector } from "react-redux";
import Right from "../../components/home/right/Right";
import classes from "./home.module.css";
import Stories from "../../components/home/storiesHome/Stories";
import CreatePost from "../../components/home/createPost/CreatePost";
import SendVerificationLink from "../../components/home/verification/SendVerificationLink";
import { useEffect, useRef, useState } from "react";
import { getPostsActions } from "../../redux/actions/postActions";
import Post from "../../components/home/Post/Post";

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { allPosts, loading } = useSelector((state) => state.post);
  const [height, setHeight] = useState(0);
  const middle = useRef();

  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, [loading]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      dispatch(getPostsActions({ isUserLoggedIn: true }));
    } else {
      dispatch(getPostsActions({ isUserLoggedIn: false }));
    }
  }, []);

  return (
    <div className={classes.home} style={{ height: `${height + 150}px` }}>
      <Header page="home" />
      <Left user={userInfo} />
      <div className={classes.home_middle} ref={middle}>
        <Stories />
        {userInfo && !userInfo?.verified && (
          <SendVerificationLink accessToken={userInfo?.accessToken} />
        )}
        {userInfo && <CreatePost user={userInfo} />}
        <div className={classes.posts}>
          {allPosts.map((post) => (
            <Post key={post._id} post={post} user={userInfo} />
          ))}
        </div>
      </div>
      {userInfo && <Right user={userInfo} />}
    </div>
  );
};

export default Home;
