import axios from "axios";
import authHeader from "./auth-header";
const URL = "http://localhost:3000/categories/";

const getCategories = async () => {
  try {
    const categoriesResponse = await axios.get(URL, { headers: authHeader() });
    const parsedCategoriesResponse = await categoriesResponse.data.categories;
    return parsedCategoriesResponse;
  }
  catch (err)
  {
    throw err;
  }
};




const CategoriesService = {
    getCategories,
};

export default CategoriesService
