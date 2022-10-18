import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import GeneralAlert from "../../components/Alerts/GeneralAlert";
import { SuccessAlert } from "../../components/Alerts/SucessAlert";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import CostsService from "../../services/CostsService";
import "./Cost.css";

function Cost() {
  const { costId } = useParams();
  const [error, setError] = useState();
  const [cost, setCost] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  const deleteHandler = async (props) => {
    try {
      setLoading(true);
      await CostsService.deleteCost(costId);
      setLoading(false);
        setSuccess("Deleted - redirecting, please wait");
        setTimeout(()=>
        {
            navigate("/all-costs");
        },3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCost = async () => {
    try {
      setLoading(true);
      const fetchCostResponse = await CostsService.fetchCost(costId);
      console.log(fetchCostResponse.expense);
      setCost(fetchCostResponse.expense);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
    fetchCost(costId);
  }, []);

  return (
    <div className="cost-container">
        {success && <SuccessAlert message={success}/>}
      {error && <GeneralAlert error={error} />}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Card className="text-center">
          <Card.Header>{cost.category}</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{cost.description}</li>
                <li class="list-group-item">{cost.sum} $</li>
                <li class="list-group-item"></li>
              </ul>
            </Card.Text>
            <div class="card-body">
              <button onClick={deleteHandler} href="#" className="card-link">
                delete
              </button>
              <a href="#" className="card-link">
                edit
              </a>
            </div>
          </Card.Body>
          <Card.Footer className="text-muted">
            <span>Created At: </span>
            <span> {new Date(cost.createdAt).toLocaleString()}</span>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
}

export default Cost;
