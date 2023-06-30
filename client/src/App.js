import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { loader as homeLoader } from "./pages/home/Home";
import Login, { loader as loginLoader } from "./pages/login/Login";
import Profile, { loader as profileLoader } from "./pages/profile/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Home />, loader: homeLoader },
  { path: "/login", element: <Login />, loader: loginLoader },
  { path: "/profile", element: <Profile />, loader: profileLoader },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
