import axios from "axios";
import { toast } from 'react-toastify';

const BACKEND_URL= process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/users/`;

export const getUser = async () => {
    try {
        const response = await axios.get(API_URL + 'get-user');
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const updateUser = async (formData) => {
    try {
        const response = await axios.patch(API_URL + 'update-user', formData);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const changePassword = async (formData) => {
    try {
        const response = await axios.patch(API_URL + 'change-password', formData);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const contactUs = async (formData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/contact-us`, formData);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

