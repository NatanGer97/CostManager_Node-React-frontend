import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import AuthService from "../services/authService";
import AuthErrorAlert from "./Alerts/AuthErrorAlert";

const usernameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value.length > 0 && state.value.includes("@"),
    };
  }

  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 3 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.length > 3 };
  }

  return { value: "", isValid: false };
};

function LoginForm() {
  const BASE_URL = "http://localhost:3000";

  const navigate = useNavigate();
  const [usernameState, dispatchUsername] = useReducer(usernameReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  const location = useLocation();

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isValid: isUsernameValid } = usernameState;
  const { isValid: isPasswordValid } = passwordState;
  const usernameRef = useRef();
  const passwordRef = useRef();

  const userContext = useContext(UserContext);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsFormValid(isUsernameValid && isPasswordValid);
    }, 500);

    return () => {
      console.log("cleanup ");
      clearTimeout(timerId);
    };
  }, [isPasswordValid, isUsernameValid]);

  function usernameChangeHandler(event) {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value });
  }

  function passwordChangeHandler(event) {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  }
  function validatePasswordHandler() {
    dispatchPassword({ type: "INPUT_BLUR" });
  }

  function validateUsernameHandler() {
    dispatchUsername({ type: "INPUT_BLUR" });
  }

  const onCloseAlert = () =>
  {
      setError(null);
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null)
    const email = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const loginResponse = await AuthService.login(email, password);
      if (loginResponse.status === 200) {
        userContext.decodeToken(loginResponse.data.token);
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error.message;
      const { data, status: statusCode, statusText } = error.response;
      const jsonAlert = {
        title: errorMessage,
        message: data,
        "error-code": statusCode,
        "status-text": statusText,
      };
      console.log(jsonAlert);
      setError(jsonAlert);
      // alert(jsonAlert);
    } finally {
      setIsLoading(false);
    
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();

    formData.append("email", usernameRef.current.value);
    formData.append("password", passwordRef.current.value);
    const sendObj = {
      user: {
        email: usernameRef.current.value,
        password: passwordRef.current.value,
      },
    };

    const reqOptions = {
      method: "post",
      body: JSON.stringify(sendObj),
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(`${BASE_URL}/login`, reqOptions);
      console.log(await response.json());
      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <main>
      <form className="login-form  shadow   ">
        <section>
          {loading && (
            <span className="spinner-border spinner-border-sm m-3"></span>
          )}
          {error && <AuthErrorAlert alert={error} onClose={onCloseAlert} />}

        </section>
        <h1 className=" mb-4 text-center">Login</h1>

        <small className="text-muted alert-section">
          <ul>
            <li>
              <FiAlertTriangle /> Email format - somthing@domail.com
            </li>
            <li>
              <FiAlertTriangle /> Password should be minimum 4 chars length{" "}
            </li>
          </ul>
        </small>

        <div className="container-fluid w-50">
          <div className="form-floating mb-2  ">
            <input
              ref={usernameRef}
              onBlur={validateUsernameHandler}
              onChange={usernameChangeHandler}
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />

            <label htmlFor="floatingInput">Email address</label>
          </div>

          <div className="form-floating mb-2">
            <input
              ref={passwordRef}
              onBlur={validatePasswordHandler}
              onChange={passwordChangeHandler}
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button
            className="btn w-100 login-btn btn-primary"
            onClick={handleLogin}
            disabled={!isFormValid}
          >
            Button
          </button>
        </div>

        <a className="text-muted back-link" href="/register">
          Register
        </a>
      </form>
    </main>
  );
}

export default LoginForm;
