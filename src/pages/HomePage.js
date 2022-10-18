import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/authService";
import UserService from "../services/userService";

import "./HomePage.css";

const HomePage = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const date = new Date().toLocaleDateString();
  let user = {};

  const fetchUserData = async () => {
    try {
      user = await UserService.fetchUserInfo();
      // user = await UserService.getUserInfo();
      setCurrentUser((currentUser) => ({
        ...currentUser,
        ...user.user,
      }));
    } catch (err) {
      // alert("Homepage",err.response.data.message);
      return navigate("/");
    }
  };

  useEffect(() => {
    window.document.title = props.title;
    fetchUserData();
  }, []);

  return (
    <div className="container ">
      <div className="main-section shadow ">
        <div className="content-div">
          <h2 className="">
            Welcome <span>{currentUser.name}</span>
          </h2>
          <h5 className="mt-2 d-flex">{date}</h5>
          <a
            style={{ textDecoration: "none" }}
            className="btn-grad-index-page  w-50 m-3 rounded-pill"
            href="/login"
          >
            View Costs
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
