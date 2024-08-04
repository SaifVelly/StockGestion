import React, { useState } from 'react';
import loginImg from '../../assets/Stock.png';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils/emailValidation';
import { registerUser } from '../../api/authAPI';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { SET_EMAIL, SET_LOGIN, SET_NAME, SET_PHOTO } from '../../redux/features/auth/authSlice';
import Loader from '../../component/loader/Loader';
import Authorization from '../../customHook/authorization';

const dummy = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    photo: null,
}

const Register = () => {
    Authorization('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(dummy);
    const { firstName, lastName, email, password, confirmPassword, bio /*, photo*/ } = formData;

    const handleInputChange = (e) => {
        const { name, value /*, files*/ } = e.target;
        setFormData({ ...formData, [name]: value /* files ? files[0] : value */ });
    };

    const register = async (e) => {
        e.preventDefault();
        if(!firstName || !lastName || !email || !password){
            return toast.error("Tous les champs sont obligatoires");
        }

        if(password !== confirmPassword){
            return toast.error("Les mots de passe ne sont pas les memes");
        }

        if(password.length < 6){
            return toast.error("Le mot de passe doit comporter au moins 6 caractères");
        }

        if(!validateEmail(email)){
            return toast.error("Veuillez entrer une adresse e-mail valide");
        }

        const userData = {
            name: `${firstName} ${lastName}`,
            email, password, bio /*, photo */
        }

        setIsLoading(true);
        try {
            const data = await registerUser(userData);
            console.log(data);
            await dispatch(SET_LOGIN(true));
            await dispatch(SET_NAME(data.name));
            await dispatch(SET_EMAIL(data.email));
            await dispatch(SET_PHOTO(data.photo));
            navigate("/dashboard");
            setIsLoading(false);
        } catch(error) {
            setIsLoading(false);
            console.log(error.message);
            toast.error("Inscription a échoué, veuillez réessayer");
        }

        console.log(formData);
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            {isLoading && <Loader/>}
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={loginImg} alt='login'/>
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[700px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' onSubmit={register}>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Créer un compte</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 w-full gap-x-2'>
                        <div className='form-group'>
                            <label>Nom</label>
                            <input className='form-control' type="text" name="firstName" onChange={handleInputChange} value={firstName} required/>
                        </div>
                        <div className='form-group'>
                            <label>Prénom</label>
                            <input className='form-control' type="text" name="lastName" onChange={handleInputChange} value={lastName} required/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Email</label>
                        <input className='form-control' type="text" name="email" onChange={handleInputChange} value={email} required/>
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 w-full gap-x-2'>
                        <div className='form-group'>
                            <label>Mot de pass</label>
                            <input className='form-control' type="password" name="password" onChange={handleInputChange} value={password} required/>
                        </div>
                        <div className='form-group'>
                            <label>Confirmer le mot de pass</label>
                            <input className='form-control' type="password" name="confirmPassword" onChange={handleInputChange} value={confirmPassword} required/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label>Que gère ce compte ?</label>
                        <textarea className='form-control' type="text" name="bio" onChange={handleInputChange} value={bio}/>
                    </div>
                    {/* <div className="form-group">
                        <label className="form-file-label">
                            <span className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="font-medium text-gray-400">
                                    Drop files to Attach, or
                                    <span className="text-blue-600 underline">browse</span>
                                </span>
                            </span>
                            <input type="file" name="photo" className="hidden" onChange={handleInputChange}/>
                        </label>
                    </div> */}
                    <button className='btn-primary' type="submit">Créer le compte</button>
                </form>
            </div>   
        </div>
    )
}

export default Register;
