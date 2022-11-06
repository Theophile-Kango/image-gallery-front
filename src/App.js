import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import ImagesGallery from "./pages/ImagesGallery";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ResetPassword from "./pages/ResetPassword";
import NewImageGallery from "./pages/NewImageGallery";

const App = () => {
  const { user: currentUser } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (["/login","/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location, currentUser]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div>
        {currentUser && (
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/new_image_gallery" className="nav-link">
                  New Image Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/reset_password" className="nav-link">
                  Reset Password
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={logOut}>
                  LogOut
                </Link>
              </li>
            </div>
          </nav>
        )}
      <div className="container mt-3">
        <Routes>
          {currentUser ? 
            <>
              <Route path="/" element={<ImagesGallery />} />
              <Route path="/images_gallery" element={<ImagesGallery />} />    
              <Route path="/reset_password" element={<ResetPassword />} /> 
              <Route path="/new_image_gallery" element={<NewImageGallery />} />
            </>
            : 
            <>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </>
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
