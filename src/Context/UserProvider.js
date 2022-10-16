import { useState } from "react";
import UserContext from "./UserContext";
import jwt_decode from 'jwt-decode';
import AuthService from "../services/authService";

const UserProvider = (props) => {
    const [decodedToken, setDecodedToken] = useState("");

  const decodeTokenFunc = (token) => {
    const decoded_token = jwt_decode(token);
    console.log(decoded_token);
    setDecodedToken(decoded_token);
    
  };
  const getDecodedToken = () =>
  {
    const token_not_decoded = AuthService.getCurrentUser();
    decodeTokenFunc(token_not_decoded);
    console.log((decodedToken));
  }

  const userContext = {
    decodedToken: decodedToken,
    decodeToken: decodeTokenFunc,
    getDecodedToken: getDecodedToken,
  }
  
  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
