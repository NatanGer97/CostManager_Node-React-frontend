import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import NavBarLinks from './NavBarLinks';

export const NavBar = (props) =>
{
  
    return (
        
        <nav className='navbar container-fluid fixed-top shadow-sm '>
            <div className='container pin-top d-flex justify-content-between'>
                <a className='navbar-brand' href='/'>
                    <span>Cost Manager</span>
                </a>
                <NavBarLinks />
            </div>
        </nav>
    );
}

