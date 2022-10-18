import { Navigate, Outlet, redirect } from "react-router-dom";
import AuthService from "../services/authService"
import UserService from "../services/userService";
import Footer from "./Footer/footer";
import AppBar from "./Header/AppBar";

const ProtectedRoute = (props) =>
{

  /*   let user = '';
     user = UserService.getUserInfo()
    .then((responseFromUserService)=>{
        user = responseFromUserService;
    }).catch(err => {
        // alert(err.response.data.message);
        return <Navigate to={''} replace />;
        }) */

    const user = AuthService.getCurrentUser();
    if (!user) 
    {
        // AuthService.logout();
        return <Navigate to={'/'} replace />;
    }

    // return props.children ? props.children : <Outlet />;

    return (
        <>
        <AppBar />
        {props.children ? props.children : <Outlet />}
        <Footer />
        </>
    );
}


export default ProtectedRoute;