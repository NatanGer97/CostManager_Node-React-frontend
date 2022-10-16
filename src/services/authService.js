import axios from 'axios';
import jwt_decode  from 'jwt-decode';
import { useContext } from 'react';
import UserService from './userService';

const URL = "http://localhost:3000/";

const register = async (name, email, password) =>
{
    const registerResponse =  await axios.post(URL + 'register', {user:{name:name, email:email,password:password}});
    if (registerResponse.data.token) 
    {
        localStorage.setItem('user', JSON.stringify(registerResponse.data));
    }

    return registerResponse;
    
    
};


const login = async (username, password) => 
{
    const response = await  axios.post(URL + 'login', {user:{email:username,password:password}});
    if (response.data.token){
        localStorage.setItem('user', JSON.stringify(response.data));

    }

    return response;
}

const logout = () =>
{
    localStorage.removeItem('user');

}

const getCurrentUser = () => {
    
    return JSON.parse(localStorage.getItem("user"));
  };

const getIdFromToken = () =>
{
    return decodeToken().id;
};

const decodeToken = () =>
{
    const user = getCurrentUser();
    const token = user.token;
    const decodedToken = jwt_decode(token);
    return decodedToken;
}

  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    decodeToken,
    getIdFromToken,
  };

export default AuthService;