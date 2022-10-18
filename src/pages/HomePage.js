import { React, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import AuthService from "../services/authService";
import UserService from "../services/userService";

const HomePage = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  let user = {};

  const fetchUserData = async () => {
    try {
      user = await UserService.fetchUserInfo()
      // user = await UserService.getUserInfo();
      setCurrentUser((currentUser) => ({
        ...currentUser,
        ...user.user,
      }));
    }
    catch(err)
    {
      // alert("Homepage",err.response.data.message);
     return navigate("/");
      
    }
   
  };
  
  function clickHandler()
  {
    UserService.fetchUserInfo();
  }

  useEffect(() => {
    window.document.title = props.title;
    const token = AuthService.decodeToken();
    fetchUserData();
  }, []);

  

  return (
    <div className="container ">
      <h4>{currentUser.name}</h4>
      <button onClick={clickHandler}>click</button>
    </div>
  );
};

export default HomePage;
