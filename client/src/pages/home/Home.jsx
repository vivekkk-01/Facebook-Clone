import Header from "../../components/header/Header";
import store from "../../redux/store";
import { redirect } from "react-router-dom";
import Left from "../../components/home/leftHome/Left";
import { useSelector } from "react-redux";
import Right from "../../components/home/right/Right";
import classes from "./home.module.css";
import Stories from "../../components/home/storiesHome/Stories";
import CreatePost from "../../components/home/createPost/CreatePost";
import SendVerificationLink from "../../components/home/verification/SendVerificationLink";

const Home = () => {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <div className={classes.home}>
      <Header />
      <Left user={userInfo} />
      <div className={classes.home_middle}>
        <Stories />
        {!userInfo?.verified && (
          <SendVerificationLink accessToken={userInfo?.accessToken} />
        )}
        <CreatePost user={userInfo} />
      </div>
      <Right user={userInfo} />
    </div>
  );
};

export default Home;

export const loader = () => {
  const userInfo = store.getState().user.userInfo;
  if (!userInfo) return redirect("/login");
  return null;
};
