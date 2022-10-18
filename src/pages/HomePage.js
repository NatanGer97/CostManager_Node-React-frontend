import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/authService";
import UserService from "../services/userService";

import "./HomePage.css";

const HomePage = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
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
      <h4>{currentUser.name}</h4>
      </div>
      
    </div>
  );
};

export default HomePage;
