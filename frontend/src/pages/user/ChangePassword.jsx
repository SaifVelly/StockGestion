import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { changePassword } from '../../api/userAPI';
import Loader from '../../component/loader/Loader';
import Authorization from '../../customHook/authorization';

const dummy = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
}

const ChangePassword = () => {
    Authorization('login');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(dummy);

    const {oldPassword, password, confirmPassword } = formData;
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const changePass = async () => {
        if(password !== confirmPassword) {
            return toast.error("Password doesn't match.")
        }

        const formData = {
            oldPassword,
            password
        }

        try{
            const data = await changePassword(formData);
            toast.success(data);
        } catch (error) {
            setIsLoading(false);
            console.log(error.message);
            toast.error();
        }
    }

  return (
    <div className='h-screen w-full'>
        {isLoading && <Loader/>}
            <div className='bg-gray-800 flex flex-col justify-center h-full'>
                <form className='max-w-[700px] w-full mx-auto bg-gray-900 p-8 m-5 rounded-lg'>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Password Settings</h2>
                    <div className='form-group'>
                        <label>Old Password</label>
                        <input className='form-control' type="password" name="oldPassword" value={oldPassword} onChange={handleInputChange} required/>
                    </div>
                    <div className='form-group'>
                        <label>New Password</label>
                        <input className='form-control' type="password" name="password" value={password} onChange={handleInputChange} required/>
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password</label>
                        <input className='form-control' type="password" name="confirmPassword" value={confirmPassword} onChange={handleInputChange} required/>
                    </div>
                    <button type="button" onClick={changePass}  className='btn-primary'>Change Password</button> 
                </form>
            </div>
    </div>
  )
}

export default ChangePassword