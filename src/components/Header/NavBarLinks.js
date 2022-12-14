import { useEffect, useState } from "react";
import AuthService from "../../services/authService";
import UserService from "../../services/userService";
import jwt_decode from "jwt-decode";
import Avatar from "@mui/material/Avatar";
import { FaRegFileCode, FaUser } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

import NavBarLink from "./NavBarLink";
import { Navigate, useNavigate } from "react-router-dom";
import userAvatar from "../../assets/pictures/user.png";

const NavBarLinks = () => {
  const [currentUser, setCurrentUser] = useState({});

  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const user = await UserService.getUserInfo();
      setCurrentUser((currentUser) => ({
        ...currentUser,
        ...user,
      }));
    } catch (error) {
      // alert("navbar links", error);
      return <Navigate to={"/"} />;
    }
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowLogin(false);
      setShowLogout(true);
      fetchUserData();
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

      <li className="nav-item dropdown ">
        <a
          className="nav-link  user-dropdown-icon"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUser />
        </a>
        <ul className="dropdown-menu text-center">
          <li>
            <h6 className="dropdown-header">{currentUser.name}</h6>
          </li>
          <li className="dropdown-item">
            <a style={{textDecoration:'none'}}href="/home">Profile</a>
          </li>
          <li className="dropdown-item">
          <NavBarLink linkTitle={"My Costs"} to={"/all-costs"} />

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
    </ul>
  );
};

export default NavBarLinks;
