import React, { useState } from 'react';
import { toast } from 'react-toastify';
import loginImg from '../../assets/Stock.png';
import {validateEmail} from '../../utils/emailValidation';
import {forgotPassword} from '../../api/authAPI';
import Authorization from '../../customHook/authorization';

const ForgotPassword = () => {
    Authorization('');
    const [email, setEmail] = useState("");

    const forgot = async () => {
        if(!email) {
            return toast.error("Please enter an email");
        }

        if(!validateEmail(email)){
            return toast.error("Please enter an valid email");
        }

        const userData = {
            email
        };

        await forgotPassword(userData);
        setEmail("");


    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt=''/>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Verification</h2>
                    <div className='form-group'>
                        <label>Email</label>
                        <input onChange={(e) => setEmail(e.target.value) }className='form-control' name="email" value={email} type="text" required/>
                    </div>
                    <button onClick={forgot} className='btn-primary'>Verify</button>
                </form>
            </div>   
        </div>
    )
}

export default ForgotPassword;