import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { contactUs } from '../../api/userAPI';
import Loader from '../../component/loader/Loader';
import Authorization from '../../customHook/authorization';

const dummy = {
    subject: "",
    message: ""
}

const ChangePassword = () => {
    Authorization('/login');
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(dummy);

    const { subject, message } = formData;

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const sendReport = async () => {
        const formData = {
            subject,
            message
        }
        try{
            const data = await contactUs(formData);
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
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Contact Us</h2>
                    <div className='form-group'>
                        <label>Subject</label>
                        <input className='form-control' type="text" name="subject" value={subject} onChange={handleInputChange} required/>
                    </div>
                    <div className='form-group'>
                        <label>Message</label>
                        <textarea className='form-control' type="text" name="bio" onChange={handleInputChange} value={message}/>                    
                    </div>
                    <button type="button" onClick={sendReport}  className='btn-primary'>Send Report</button> 
                </form>
            </div>
    </div>
  )
}

export default ChangePassword