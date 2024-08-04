import React, { useState } from 'react';
import { toast } from 'react-toastify';
import loginImg from '../../assets/Stock.png';
import { resetPassword } from '../../api/authAPI';
import { useParams } from 'react-router-dom';
import Authorization from '../../customHook/authorization';


const dummy = {
    password: "",
    confirmPassword: ""
}

const ResetPassword = () => {
    Authorization('');
    const [formData, setFormData] = useState(dummy);
    const { password, confirmPassword } = formData;
    const {resetToken} = useParams();

    const handleInputChange = (e) => {
        const {name, value} = e.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const reset = async () => {
        if(password !== confirmPassword){
            return toast.error("Les mots de passe ne sont pas les memes")
        }

        if(password.legnth < 6){
            return toast.error("Le mot de passe doit comporter au moins 6 caractères")
        }

        const userData = {
            password, confirmPassword
        }
        
        try {
            const data = await resetPassword(userData, resetToken);
            toast.success(data.message);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt=''/>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Changer le mot de pass</h2>
                    <div className='form-group'>
                        <label>Nouveau mot de pass</label>
                        <input className='form-control' type="password" placeholder='New password' name="password" value={password} onChange={handleInputChange} required/>
                    </div>
                    <div className='form-group'>
                        <label>Confirmer le mot de pass</label>
                        <input className='form-control' type="password" placeholder='Confirm new password' name="confirmPassword" value={confirmPassword} onChange={handleInputChange} required/>
                    </div>
                    <button className='btn-primary' onClick={reset}>Mettre à jour</button>
                </form>
            </div>   
        </div>
    )
}

export default ResetPassword;