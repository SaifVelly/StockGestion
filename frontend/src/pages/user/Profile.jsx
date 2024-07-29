import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../api/userAPI';
import Loader from '../../component/loader/Loader';
import Authorization from '../../customHook/authorization'
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';

const Profile = () => {
    Authorization('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function getUserData() {
            const data = await getUser();
            console.log(data);
            setProfile(data);
            setIsLoading(false);
            await dispatch(SET_USER(data));
            await dispatch(SET_NAME(data.name));
        }
        getUserData();
    }, [dispatch])

    const editClick = () => {
        navigate('/edit-profile')
    }

  return (
    <div className='h-auto w-full'>
        {isLoading && <Loader/>}
        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[1000px] w-full mx-auto bg-gray-900 p-8 m-5 rounded-lg flex flex-col items-center justify-center'>
                <h2 className='text-4xl dark:text-white font-bold text-center'>Profile</h2>
                <div className="form-group">
                    <img className="max-h-[200px] mt-5 rounded-full" src={profile?.photo} alt="Profile"/>
                </div>
                <div className="text-gray-300">
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Name:</span>
                        <span>{profile?.name}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Email:</span>
                        <span>{profile?.email}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Phone:</span>
                        <span>{profile?.phone}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Bio:</span>
                        <span>{profile?.bio}</span>
                    </p>
                </div>
                <button type="button" onClick={editClick}
                className='btn-primary w-1/6 float-right'>Edit Profile</button>
            </form>
        </div>
    </div>
  )
}

export default Profile