import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/home/Home";
import Login, { loader as loginLoader } from "./pages/login/Login";
import Profile, { loader as profileLoader } from "./pages/profile/Profile";
import Activate, { loader as activateLoader } from "./pages/home/Activate";
import Reset from "./pages/reset/Reset";
import CreatePostsPopup from "./components/home/createPost/createPostPopup/CreatePostsPopup";
import { useSelector } from "react-redux";
import Friends from "./pages/friends/Friends";

const router = createBrowserRouter([
  { errorElement: <Home />, loader: homeLoader },
  { path: "/", element: <Home />, loader: homeLoader },
  { path: "/login", element: <Login />, loader: loginLoader },
  { path: "/profile/:username", element: <Profile />, loader: profileLoader },
  { path: "/activate/:token", element: <Activate />, loader: activateLoader },
  { path: "/friends", element: <Friends /> },
  { path: "/friends/:type", element: <Friends /> },
  { path: "/reset", element: <Reset /> },
]);

function App() {
  const { isPostPopup, postFromProfile } = useSelector(
    (state) => state.postPopup
  );
  return (
    <>
      {isPostPopup && <CreatePostsPopup profile={postFromProfile} />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
