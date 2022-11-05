import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Login from "./components/Login";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import ImagesGallery from "./components/ImagesGallery";

const App = () => {
  const { user: currentUser } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (["/login","/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Login
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Registration
            </Link>
          </li>
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            {/* <li className="nav-item">
              <Link to={""} className="nav-link">
                {currentUser.email}
              </Link>
            </li> */}
            <li className="nav-item">
              <a href="/images_gallery" className="nav-link">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/images_gallery" element={<ImagesGallery />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
