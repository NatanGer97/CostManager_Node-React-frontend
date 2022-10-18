import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./authService";

const URL = "http://localhost:3000/expenses";

async function addCost({ category, sum, description }) {
    const userId = AuthService.getIdFromToken();

    try {
        const response = await axios.post(
            `${URL}/${category}/${userId}`,
            { sum: sum, description: description },
            { headers: authHeader() }
        );

        if (response.status === 201) {
            return response.status;
        }
    } catch (error) {
        console.log(error.response.data.message);
        alert(error.message);
        return error.response.data.message;
    }
}
async function updateCost({ costId, sum, description }) {
    const userId = AuthService.getIdFromToken();

    try {
        const response = await axios.put(
            `${URL}/${costId}/${userId}`,
            { sum: sum, description: description },
            { headers: authHeader() }
        );

        if (response.status === 200) {
            return response.status;
        }
    } catch (error) {
        console.log(error.response.data.message);
        alert(error.message);
        return error.response.data.message;
    }
}
async function fetchCost(costId) {
    const userId = AuthService.getIdFromToken();
    const fetchCostResponse = await fetch(`${URL}/${costId}/${userId}`, {
        method: "GET",
        headers: { Authorization: authHeader().Authorization },
    });
    if (fetchCostResponse.ok) {
        return await fetchCostResponse.json();
    }

    throw await fetchCostResponse.json();
}

async function deleteCost(costId)
{    const userId = AuthService.getIdFromToken();
    const fetchCostResponse = await fetch(`${URL}/${costId}/${userId}`, {
        method: "Delete",
        headers: { Authorization: authHeader().Authorization },
    });
    if (fetchCostResponse.ok) {
        return await fetchCostResponse.json();
    }

    throw await fetchCostResponse.json();

}

const CostsService = {
  addCost,
  fetchCost,
  deleteCost,
  updateCost,
};

export default CostsService;
