import { useEffect, useReducer, useRef, useState } from "react";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import GeneralAlert from "../../components/Alerts/GeneralAlert";
import CategoriesService from "../../services/CategoriesService";
import "../Costs/NewCostsForm.css";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import AuthService from "../../services/authService";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import authHeader from "../../services/auth-header";
import { useNavigate, useParams } from "react-router-dom";
import ToastAlert from "../../components/Alerts/Toast";
import { useDispatch, useSelector } from "react-redux";
import { postCost } from "../../store/costsSlice";
import CostsService from "../../services/CostsService";

const sumReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 0 };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.length > 0 && state.value.length > 0,
    };
  }

  return { value: "", isValid: false };
};
const descriptionReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 0 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 0 };
  }

  return { value: "", isValid: false };
};
function NewCostForm() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sumState, dispatchSum] = useReducer(sumReducer, {
    value: "",
    isValid: null,
  });
  const [descriptionState, dispatchDescription] = useReducer(
    descriptionReducer,
    {
      value: "",
      isValid: null,
    }
  );
  const sumRef = useRef();
  const descriptionRef = useRef();
  const { costId } = useParams();

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();

  const [costToUpdate, setCostToUpdate] = useState({});

  const { loading: postCostLoadingStatus } = useSelector(
    (state) => state.costs
  );

  const { isValid: isSumValid } = sumState;

  const { isValid: isDescriptionValid } = descriptionState;

  function fetchCategories() {
    setIsLoading(true);
    CategoriesService.getCategories()
      .then((response) => {
        if (response) {
          setCategories(response);
          setIsLoading(false);
        }
      })
      .catch((error) => setError(error.message));
  }
  const fetchCost = async () => {
    try {
      setIsLoading(true);
      const fetchCostResponse = await CostsService.fetchCost(costId);
      console.log(fetchCostResponse.expense);
      setCostToUpdate(fetchCostResponse.expense);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("fetch-categories");
    if (window.location.pathname.endsWith("/edit")) {
      setUpdateMode(true);
      fetchCost();
    }
    if (updateMode) setIsFormValid(true)
    fetchCategories();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsFormValid(isDescriptionValid && isSumValid || updateMode);
    }, 500);

    return () => {
      console.log("cleanup ");
      clearTimeout(timerId);
    };
  }, [isDescriptionValid, isSumValid]);

  const categorySelectHandler = (event) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
  };

  const addCostHandler = async (event) => {
    event.preventDefault();
    const sum = sumRef.current.value;
    const description = descriptionRef.current.value;
    let response = {};
    if (updateMode) {
      response = await CostsService.updateCost({
        costId: costId,
        sum: sum,
        description: description,
      });
    } else {
      response = await CostsService.addCost({
        category: selectedCategory,
        sum: sum,
        description: description,
      });
    }

    if (response === 201 || response === 200) {
      navigate("/all-costs");
    } else {
      console.log(response);
      setError(response);
    }

    /*  try {
      const response = await axios.post(`${URL}/${selectedCategory}/${userId}`,
      {sum: sum, description: description}, {headers:authHeader()});
  
      if (response.status === 201) {
        
        navigate("/all-costs");
      }
    }
    catch (error)
    {
      console.log(error);
      alert(error.message);
    } */
  };

  function sumChangeHandler(event) {
    dispatchSum({ type: "USER_INPUT", val: event.target.value });
  }

  function descriptionChangeHandler(event) {
    dispatchDescription({ type: "USER_INPUT", val: event.target.value });
  }
  function validateDescription() {
    dispatchDescription({ type: "INPUT_BLUR" });
  }

  function validateSumHandler() {
    dispatchSum({ type: "INPUT_BLUR" });
  }

  return (
    <div className="container">
      {error && <GeneralAlert error={error} />}

      <form className="new-cost-form">
        {loading && <LoadingSpinner />}

        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Sum">
              <Form.Control
                type="number"
                step={0.01}
                min={0}
                onChange={sumChangeHandler}
                onBlur={validateSumHandler}
                ref={sumRef}
                defaultValue={updateMode ? costToUpdate.sum : ""}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingSelectGrid" label="Categories">
              <Form.Select
                onChange={categorySelectHandler}
                aria-label="Floating label select example"
              >
                <option>{updateMode ? costToUpdate.category : null}</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Row className="g-2">
            <Col>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  ref={descriptionRef}
                  onBlur={validateDescription}
                  onChange={descriptionChangeHandler}
                  defaultValue={updateMode ? costToUpdate.description : ""}

                />
              </FloatingLabel>
            </Col>
          </Row>
        </Row>
        <Row>
          <button
            className="btn-grad "
            onClick={updateMode ? addCostHandler : addCostHandler}
            disabled={!isFormValid}
          >
            {updateMode ? "Update" : "Add"}
          </button>
        </Row>
      </form>
    </div>
  );
}

export default NewCostForm;
