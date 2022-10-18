import './indexPage.css';
import {BsShieldLock} from 'react-icons/bs'
import { NavLink } from 'react-router-dom';
const IndexPage = (props) =>
{
    return (
          <div className='container-index'>
            <div className='container-login shadow-lg'>
               <div className=''><BsShieldLock size={100} /></div>
             
               <div className='member-options text-center '>

               <h2 className=''>Welcome</h2>
               <a className="btn-grad-index-page  w-50 m-3 rounded-pill" href='/login'>Sign In</a>
               <a className="btn-grad-index-page w-50 m-3 rounded-pill" href='/register'>Register</a>

               </div>
            </div>
          </div>
    );
}

export default IndexPage;