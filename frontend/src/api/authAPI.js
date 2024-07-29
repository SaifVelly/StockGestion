import axios from "axios";
import { toast } from 'react-toastify';

const BACKEND_URL= process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post (`${BACKEND_URL}/api/users/register`, userData);
        if(response.statusText === "OK") {
            toast.success("User registered successfully");
        }
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post (`${BACKEND_URL}/api/users/login`, userData);
        if(response.statusText === "OK") {
            toast.success("Login Authorized");
        }
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);

    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgot-password`, userData);
        toast.success(response.data.message);
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/reset-password/${resetToken}`, userData);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

export const getLoginStatus = async (userData, resetToken) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/logged-in`);
        return response.data;
    } catch (error) {
        const message = (
            error.response && error.response.data && error.response.data.message
        ) || error.message || error.toString();

        toast.error(message);
    }
}

