import { BsLinkedin ,BsGithub} from "react-icons/bs";
import {BiCopyright, } from "react-icons/bi"
import {FiSend} from "react-icons/fi"
import {SiGmail} from "react-icons/si"
import { Link } from "react-router-dom";

const FooterBar = () => 
{
    return (
      <footer className=" fixed-bottom d-flex flex-wrap justify-content-center align-items-center py-3 border-top my-3 p-3">
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <span className="mb-3 mb-md-0 text-muted">
              
            &copy; 2022 Natan Gershbein &copy; 
            </span>
          </a>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://www.linkedin.com/in/natangerhsbein/"
            >
              <BsLinkedin />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="https://github.com/NatanGer97">
              <BsGithub />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="mailto: Natanger97@gmail.com" >
              <FiSend />
            </a>
          </li>
        </ul>
      </footer>
    );
};


export default FooterBar;