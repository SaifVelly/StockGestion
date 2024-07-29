import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassoword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Layout from './component/layout/Layout';
import Dashboard from './component/dashboard/Dashboard';
import axios from 'axios';
import { ToastContainer  } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './api/authAPI';
import { SET_LOGIN } from './redux/features/auth/authSlice';
import AddProduct from './pages/product/AddProduct';
import ProductDetails from './pages/product/ProductDetails';
import EditProduct from './pages/product/EditProduct';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import ChangePassword from './pages/user/ChangePassword';
import ContactUs from './pages/user/ContactUs';

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus(){
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  },[dispatch])
  
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={
          <Layout>
            <Dashboard/>
          </Layout>
          } />
          <Route path='/add-product' element={
            <Layout>
              <AddProduct/>
            </Layout> 
          } />
          <Route path='/product-details/:id' element={
            <Layout>
              <ProductDetails/>
            </Layout> 
          } />
          <Route path='/edit-product/:id' element={
            <Layout>
              <EditProduct/>
            </Layout> 
          } />
          <Route path='/user-profile' element={
            <Layout>
              <Profile/>
            </Layout> 
          } />
          <Route path='/edit-profile' element={
            <Layout>
              <EditProfile/>
            </Layout> 
          } />
          <Route path='/change-password' element={
            <Layout>
              <ChangePassword/>
            </Layout> 
          } />
          <Route path='/send-report' element={
            <Layout>
              <ContactUs/>
            </Layout> 
          } />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-pass' element={<ForgotPassoword/>}/>
        <Route path='/reset-pass/:resetToken' element={<ResetPassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
