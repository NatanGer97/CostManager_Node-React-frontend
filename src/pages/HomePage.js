import {  React, useCallback, useContext, useEffect, useState } from "react";
import UserContext from "../Context/UserContext";
import AuthService from "../services/authService";
import UserService from "../services/userService";


const HomePage = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [decodedToken, setDecodedToken] = useState();
  const userContext = useContext(UserContext);
  let user = {}

const fetchUserData = async() => 
{
  user  = await UserService.getUserInfo();
    setCurrentUser(currentUser => ({
      ...currentUser, ...user
    }));

}

  useEffect(() => {
    window.document.title = props.title;
    const token = AuthService.decodeToken();
    fetchUserData();    
  },[]);

  const fetchData =  () => 
  {
    console.log(user.name);
  };

  return <div className="container ">
    <button onClick={fetchData}>click</button>
    <h4>{currentUser.name}</h4>
  </div>
};

export default HomePage;
