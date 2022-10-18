import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import NavBarLink from "./NavBarLink";
import NavBarLinks from "./NavBarLinks";

export const NavBar = (props) => {
  return (

    <nav className="navbar container-fluid fixed-top shadow-sm nav-bar">
      <div className="container pin-top d-flex justify-content-evenly ">
        <a className="navbar-brand" href="/home">
          <span>Cost Manager</span>
        </a>
        <div className=" d-flex">
          {/* <ul className="nav">
            <NavBarLink linkTitle={"Costs"} to={"/all-costs"} />
         
          </ul> */}
        </div>
        <NavBarLinks />

    
      </div>
    </nav>
  );
};
