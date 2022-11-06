import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import ImagesGallery from "./pages/ImagesGallery";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";
import NewImageGallery from "./pages/NewImageGallery";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (
      [
        "/login",
        "/register",
        "/reset_password",
        "/new_images_gallery",
      ].includes(location.pathname)
    ) {
      dispatch(clearMessage());
    }
  }, [dispatch, location, currentUser]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div className="main__container">
      {currentUser && (
        <nav className="navbar navbar-expand navbar-dark bg-dark nav__container">
          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/new_images_gallery" className="nav-link">
                  New Image Gallery
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/reset_password" className="nav-link">
                  Reset Password
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
      <div className="mt-3">
        <Routes>
          {currentUser ? (
            <>
              <Route path="/" element={<ImagesGallery />} />
              <Route path="/images_gallery" element={<ImagesGallery />} />
              <Route path="/reset_password" element={<ResetPassword />} />
              <Route path="/new_images_gallery" element={<NewImageGallery />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
