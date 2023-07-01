import Header from "../../components/header/Header";
import store from "../../redux/store";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Left from "../../components/home/leftHome/Left";
import { useSelector, useDispatch } from "react-redux";
import Right from "../../components/home/right/Right";
import classes from "./home.module.css";
import Stories from "../../components/home/storiesHome/Stories";
import CreatePost from "../../components/home/createPost/CreatePost";
import { useEffect, useState } from "react";
import ActivateForm from "./ActivateForm";
import axios from "axios";
import Cookies from "js-cookie";
import { userVerificationAction } from "../../redux/actions/userActions";

const Activate = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_ROUTE}/user/activate`,
          {
            token,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        );
        setSuccess(data);
        Cookies.set("user", JSON.stringify({ ...userInfo, verified: true }), {
          secure: true,
          sameSite: "strict",
          expires: 30,
        });
        dispatch(userVerificationAction({ ...userInfo, verified: true }));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setError(
          error.response.data
            ? error.response.data
            : error.response.data.message
            ? error.response.data.message
            : error.message
            ? error.message
            : "Something went wrong, please try again!"
        );
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    })();
  }, []);

  return (
    <div className={classes.home}>
      {success && (
        <ActivateForm
          type="success"
          header="Account Verification Succeeded"
          text={success}
          loading={loading}
          classes={classes}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account Verification Failed"
          text={error}
          loading={loading}
          classes={classes}
        />
      )}
      <Header />
      <Left user={userInfo} />
      <div className={classes.home_middle}>
        <Stories />
        <CreatePost user={userInfo} />
      </div>
      <Right user={userInfo} />
    </div>
  );
};

export default Activate;

export const loader = () => {
  const userInfo = store.getState().user.userInfo;
  if (!userInfo) return redirect("/login");
  return null;
};
