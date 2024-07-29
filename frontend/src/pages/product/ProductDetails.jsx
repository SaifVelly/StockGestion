import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../component/loader/Loader';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getProduct } from '../../redux/features/product/productSlice';
import DOMPurify from "dompurify";
import Authorization from '../../customHook/authorization';

const ProductDetails = () => {
    Authorization("/login");
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { product, isLoading, isError, message } = useSelector((state) => state.product);
    const { id } = useParams();
    const navigate = useNavigate();

    useSelector((state) => state.product);

    const stockStatus = (quantity) => {
        if(quantity > 0) {
            return <span className='bg-green-600 rounded-lg dark: text-white px-2'>In Stock</span>
        }
        return <span className='bg-red-600 rounded-lg dark: text-white px-2'>Out of Stock</span>
    }

    const onBackClick = () => {
        navigate('/dashboard');
    }

    useEffect(() => {
        if(isLoggedIn) {
          dispatch(getProduct(id));
        }
    
        if(isError){
          console.log(message);
        }
      }, [isLoggedIn,isError, message, dispatch])

  return (
    <div className='h-auto w-full'>
        {isLoading && <Loader/>}
        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[1000px] w-full mx-auto bg-gray-900 p-8 m-5 rounded-lg flex flex-col items-center justify-center'>
                <h2 className='text-4xl dark:text-white font-bold text-center'>Product Details</h2>
                <div className="form-group">
                    <div>
                        {product?.image ? (
                            <img className="max-wdith: 400px max-w-screen-sm mt-5" src={product?.image?.filePath} alt="Product"/>
                        ) : (
                            <p>No Image set for this product</p>
                        )}
                    </div>
                </div>
                <h4 className="text-2xl text-gray-300 font-bold py-5">Product Availability: {stockStatus(product?.quantity)}</h4>
                <div className="text-gray-300">
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Name:</span>
                        <span>{product?.name}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">SKU:</span>
                        <span>{product?.sku}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Category:</span>
                        <span>{product?.category}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Price:</span>
                        <span>{'$'}{(product?.price*1).toLocaleString('en-US')}</span>
                    </p>
                    <p className="text-lg space-x-2 py-3">
                        <span className="bg-teal-600 rounded-lg px-2 dark:text-white">Quantity in stock:</span>
                        <span>{product?.quantity}{' kg'}</span>
                    </p>
                    
                    <hr/>
                    <div className='form-group pb-5 text-lg text-gray-300'>
                        <label className="font-bold">Description:</label>
                        <div dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(product?.description)
                        }}/>
                    </div>
                    <hr/>
                    <code>Created on:  {product?.createdAt.toLocaleString("en-US")}</code>
                    <br/>
                    <code>Last Updated:  {product?.updatedAt.toLocaleString("en-US")}</code>
                </div>
                <button type="button" onClick={onBackClick} className='btn-primary w-1/6 float-right'>Back</button>
            </form>
        </div>
    </div>
  )
}

export default ProductDetails