import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { FaUser } from "react-icons/fa";

import NavBarLink from "./NavBarLink";
import { useNavigate } from "react-router-dom";
import userAvatar from "../../assets/pictures/user.png";

const NavBarLinks = () => {
  
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  let currentUser = AuthService.getCurrentUser();
  

  const fetchUserData = async (decodedToken) => {
    const results = await UserService.getUserInfo(decodedToken.id);
   
    // setCurrentUser(results.data.user.name.split(" ")[0]);
    // console.log(results.data.user);
  };
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    

    if (user) {
      const decodedToken = jwt_decode(user.token);

      fetchUserData(decodedToken);
      setShowLogin(false);
      setShowLogout(true);
      
      // console.log(currentUser);
    } else {
      setShowLogin(true);
    }
  }, []);

  const logoutHandler = () => {
    AuthService.logout();
    navigate("/");
    // window.location.reload();
  };

  return (
    <ul className="nav ">
      <li className="nav-item dropdown">
        <button
          className="nav-link  user-dropdown-icon"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUser />
        </button>
        <ul className="dropdown-menu">
          <li>
            <h6 className="dropdown-header">{currentUser['email']}</h6>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>

          {showLogout && (
            <a className=" nav-link" onClick={logoutHandler}>
              Logout
            </a>
          )}
        </ul>
      </li>
      {showLogin && <NavBarLink linkTitle={"Login"} to={"login"} />}
    </ul>
  );
};

export default NavBarLinks;
