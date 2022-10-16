
import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../LoginForm";
import RegisterForm from "../RegisterForm";

const LoginPage = (props) =>
{
    const location = useLocation();
    useEffect(()=>
    {
        window.document.title = props.title;
    })
    return (
        <Fragment>
            {/* <header className="login-page-header"></header> */}
            <div className="login-page container-fluid" >
            {location.pathname.includes('/register') ? 
            <RegisterForm/> : <LoginForm/>}
            
        </div>
        </Fragment>
        
    );
}

export default LoginPage;