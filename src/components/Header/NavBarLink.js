import { NavLink } from "react-router-dom";

const NavBarLink = (props) => 
{
    let activeStyle = {
        textDecoration: "underline",
      };
    return (
      <li className="nav-item">
        <NavLink
        className={"nav-link"}
          to={props.to}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          {props.linkTitle}
        </NavLink>
      </li>
    );
}

export default NavBarLink;


