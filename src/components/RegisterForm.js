import { useEffect, useReducer, useRef, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";

import { useLocation, useNavigate } from "react-router-dom";
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
};

const fullNameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.length > 3 };
  }

  if (action.type === "INPUT_BLUR") {
    console.log(state.value);
    console.log(state.value.length > 3);
    return { value: state.value, isValid: state.value.length > 3 };
  }

  return { value: "", isValid: false };
};

function RegisterForm() {
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

  const [fullNameState, dispatchFullName] = useReducer(fullNameReducer, {
    value: "",
    isValid: null,
  });

  const location = useLocation();

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const { isValid: isUsernameValid } = usernameState;
  const { isValid: isPasswordValid } = passwordState;
  const { isValid: isFullNameValid } = fullNameState;
  const usernameRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const [error, setError] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      // console.log("checking for validity!");
      setIsFormValid(isUsernameValid && isPasswordValid && isFullNameValid);
    }, 500);

    return () => {
      console.log("cleanup ");
      clearTimeout(timerId);
    };
  }, [isPasswordValid, isUsernameValid, isFullNameValid]);

  function usernameChangeHandler(event) {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value });
  }
  function validateUsernameHandler() {
    dispatchUsername({ type: "INPUT_BLUR" });
  }

  function fullNameChangeHandler(event) {
    dispatchFullName({ type: "USER_INPUT", val: event.target.value });
  }
  function validateFullNameHandler() {
    dispatchFullName({ type: "INPUT_BLUR" });
  }

  function passwordChangeHandler(event) {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  }
  function validatePasswordHandler() {
    dispatchPassword({ type: "INPUT_BLUR" });
  }

  const registerHandle = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const name = fullNameRef.current.value;
    const email = usernameRef.current.value;
    const password = passwordRef.current.value;
    try {
      const registerResponse = await AuthService.register(
        name,
        email,
        password
      );
      if (registerResponse.status === 201) {
        navigate("/home");
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data
      const jsonAlert = {
        title: errorMessage['error-name'],
        message: errorMessage['message'],
        "error-code": errorMessage['error-code'],
        "status-text": error.response.statusText,
      };
      console.log(jsonAlert);
      setError(jsonAlert);
    }

    finally {
      setIsLoading(false);
    }
  };
  const onCloseAlert = () =>
  {
      setError(null);
  }
  return (
    <main>
      <form className="login-form  shadow   ">
        <h1 className=" mb-4 text-center">Register</h1>
        <section>
          {loading && (
            <span className="spinner-border spinner-border-sm m-3"></span>
          )}
          {error && <AuthErrorAlert alert={error} onClose={onCloseAlert}/>}

        </section>
        <small className="text-muted alert-section">
          <ul>
          <li>
              <FiAlertTriangle /> Full Name is require
            </li>
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
              ref={fullNameRef}
              onBlur={validateFullNameHandler}
              onChange={fullNameChangeHandler}
              type="text"
              className="form-control"
              id="floatingFullName"
            />
            <label htmlFor="floatingFullName">Full Name</label>
          </div>
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
            onClick={registerHandle}
            disabled={!isFormValid}
          >
            Button
          </button>
        </div>
        <a className="text-muted back-link" href="/login">
          Login
        </a>
      </form>
    </main>
  );
}

export default RegisterForm;
