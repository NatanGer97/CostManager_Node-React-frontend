import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './authService';

const URL =  "http://localhost:3000/users/"

const fetchUserInfo = async () => 
{
  try
  {
    const userId = AuthService.getIdFromToken();
    const response = await fetch(URL + userId, {
      headers: {
        authorization:"Bearer " + AuthService.getCurrentUser().token,
      }
    });
    if (response.ok)
    {
      const userInfo = await response.json();
      console.log(userInfo);
      return userInfo;
    }
  }
  catch (err)
  {
    console.log(err);
    throw err;
    
  }
}

const getUserInfo = async () => 
{
  try {
    const userId = AuthService.getIdFromToken();
    const response =  await axios.get(URL + userId, {headers:authHeader()});
    const responseParsesData = await response.data['user'];
        return responseParsesData;
  }
  catch(err)
  {
    AuthService.logout();
    throw err;
  }

}



const UserService = {
    getUserInfo,
    fetchUserInfo,

  };

export default UserService;