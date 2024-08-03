import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUser, updateUser } from '../../api/userAPI';
import Loader from '../../component/loader/Loader';
import Authorization from '../../customHook/authorization';
import { selectUser, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';

const EditProfile = () => {
    Authorization('/login');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const uploadRef = useRef( null );

    const user = useSelector(selectUser);

    const dummy = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo
    }

    const [profile, setProfile] = useState(dummy);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

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
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({...profile, [name]: value});
    }

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }

    const saveProfile = async () => {
        setIsLoading(true);
        console.log("hell1")
        try {
            let imgUrl;
            if(profileImage &&
                (
                    profileImage.type === "image/jpeg" || 
                    profileImage.type === "image/jpg" || 
                    profileImage.type === "image/png"
                )
                ) {
                    const image = new FormData();
                    image.append("file", profileImage);
                    image.append("cloud_name", "djin4hmhc");
                    image.append("upload_preset", "syrsyt0u");

                    console.log("hell2")

                    const response = await fetch("https://api.cloudinary.com/v1_1/djin4hmhc/image/upload",
                    { method: "post", body: image});
                    const imgData = await response.json();
                    imgUrl = imgData.url.toString();
                    toast.success("Profile Image updated");

                } 
                
                const formData = {
                    name: profile.name,
                    phono: profile.phone,
                    bio: profile.bio,
                    photo: profileImage ? imgUrl : profile.photo,
                }

                const data = await updateUser(formData);
                console.log(data);
                toast.success("Profile Updated")
                navigate('/user-profile')
                 
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    const imageOnClick = () => {
        uploadRef.current.click();
    }

  return (
    <div className='h-auto w-full'>
        {isLoading && <Loader/>}
            <div className='bg-gray-800 flex flex-col justify-center'>
                <form className='max-w-[1000px] w-full mx-auto bg-gray-900 p-8 m-5 rounded-lg'>
                    <h2 className='text-4xl dark:text-white font-bold text-center'>Modifier le profile</h2>
                    <div className="form-group">      
                        <img onClick={imageOnClick} className="m-auto max-h-[300px] mt-5 rounded-full" src={previewImage ? previewImage : profile?.photo} alt="Profile"/>
                        <input ref={uploadRef} onChange={handleImageChange} type="file" name="photo" className="hidden"/>
                        <code className="m-auto">Cliquez sur l'image pour la changer.</code>
                    </div>
                    <div className='form-group'>
                        <label>Nom complet</label>
                        <input className='form-control' type="text" name="name" onChange={handleInputChange} value={profile?.name} required/>
                    </div>  
                    <div className='form-group'>
                        <label>Email</label>
                        <input className='form-control' type="text" name="name" value={profile?.email} disabled/>
                    </div>  
                    
                    <div className='form-group'>
                        <label>Que gère ce compte ?</label>
                        <textarea className='form-control' type="password" name="bio" onChange={handleInputChange} value={profile?.bio}/>
                    </div>
                    <button type="button" onClick={saveProfile} className='btn-primary'>Modifier le profile</button> 
                </form>
            </div>
    </div>
  )
}

export default EditProfile