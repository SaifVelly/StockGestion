import React, { useState } from 'react';
import loginImg from '../../assets/Stock.png';
import { loginUser } from '../../api/authAPI';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN, SET_NAME, SET_EMAIL, SET_PHOTO } from '../../redux/features/auth/authSlice';
import Loader from '../../component/loader/Loader';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/emailValidation';
import Authorization from '../../customHook/authorization';

const dummy = {
    email: "",
    password: ""
}

const Login = () => {
    Authorization('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(dummy);
    const {email, password} = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const login = async () => {
        if(!email || !password) {
            return toast.error("All fields are required")
        }

        if(!validateEmail(email)){
            return toast.error("Please enter a valid email")
        }

        const userData = {
            email, password
        };

        setIsLoading(true);

        try {
            const data = await loginUser(userData);
            console.log(data);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            await dispatch(SET_EMAIL(data.email));
            await dispatch(SET_PHOTO(data.photo));
            navigate("/dashboard")
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
            toast.error();
        }
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            {isLoading && <Loader/>}
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt=''/>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Sign In</h2>
                    <div className='form-group'>
                        <label>Email</label>
                        <input className='form-control' type="text" name="email" value={email} onChange={handleInputChange} required/>
                    </div>
                    <div className='form-group'>
                        <label>Mot de pass</label>
                        <input className='form-control' type="password" name="password" value={password} onChange={handleInputChange} required/>
                    </div>
                    
                    <button type="button" className='btn-primary' onClick={login}>Se connecter</button>
                </form>
            </div>   
        </div>
    )
}

export default Login;