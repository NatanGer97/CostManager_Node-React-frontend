import axios from 'axios';
import authHeader from './auth-header';
import AuthService from './authService';

const URL =  "http://localhost:3000/users/"

const getUserInfo = async () => 
{
  const userId = AuthService.getIdFromToken();
    const response =  await axios.get(URL + userId, {headers:authHeader()});
    const responseParsesData = await response.data['user'];
    return responseParsesData;

}

const UserService = {
    getUserInfo,

  };

export default UserService;