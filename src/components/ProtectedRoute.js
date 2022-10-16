import { Navigate, Outlet, redirect } from "react-router-dom";
import AuthService from "../services/authService"
import AppBar from "./Header/AppBar";

const ProtectedRoute = (props) =>
{
    // const {redirectPath = '/login'} = props.redirectPath;

    const user = AuthService.getCurrentUser();
    if (!user) 
    {
        return <Navigate to={''} replace />;
    }

    // return props.children ? props.children : <Outlet />;

    return (
        <>
        <AppBar />
        {props.children ? props.children : <Outlet />}
        </>
    );
}


export default ProtectedRoute;