import { useEffect } from "react"
import { json, Navigate, useLocation } from "react-router-dom";
import AuthService from "../services/authService";

const AuthVerify = (props) => 
{
    let location = useLocation();
    useEffect(()=>
    {
        const user = AuthService.getCurrentUser();
        if (user)
        {
            const decodedJwt = AuthService.decodeToken();
            if (decodedJwt.exp * 1000 < Date.now())
            {
                AuthService.logout();
                alert("expires");
                <Navigate to={"/"} />
            }
        }
    },[location, props]);

    return;
}

export default AuthVerify;