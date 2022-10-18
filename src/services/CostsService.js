import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./authService";

const URL = "http://localhost:3000/expenses";
const userId = AuthService.getIdFromToken();



const addCost = async ({category, sum, description}) =>
{
    try {
        const response = await axios.post(`${URL}/${category}/${userId}`,
        {sum: sum, description: description}, {headers:authHeader()});
    
        if (response.status === 201) {
          
          return response.status;
        }
      }
      catch (error)
      {
        console.log(error.response.data.message);
        alert(error.message);
        return error.response.data.message;
      }
};

const CostsService = {
    addCost,
};

 export default CostsService;

