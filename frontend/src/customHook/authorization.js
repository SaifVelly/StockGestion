import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../api/authAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Authorization = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus();
            dispatch(SET_LOGIN(isLoggedIn));

            if(!isLoggedIn){
                toast.info("Session expired, Please login to continue");
                navigate(path)
                return
            } /*else {
                navigate('/dashboard');
                return 
            }*/
        }
        redirectLoggedOutUser();
    }, [navigate,path,dispatch])
    
}

export default Authorization;