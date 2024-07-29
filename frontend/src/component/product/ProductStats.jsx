import React from 'react'
import { MdOutlineInventory2 } from "react-icons/md"
import { BsCartX } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, selectOutOfStock, selectTotalStoreValue, selectCategory, CALC_CATEGORY } from '../../redux/features/product/productSlice';
import { useEffect } from 'react';


const ProductStats = ({products}) => {
    const dispatch = useDispatch();
    const totalStoreValue = useSelector(selectTotalStoreValue);
    const outOfStock = useSelector(selectOutOfStock);
    const categories = useSelector(selectCategory);

    useEffect(() => {
        dispatch(CALC_STORE_VALUE(products))
        dispatch(CALC_OUT_OF_STOCK(products));
        dispatch(CALC_CATEGORY(products));
    }, [dispatch, products])
  return (
    <div className="w-11/12">
        <span className="text-4xl m-3 text-gray-300">Inventory Stats</span>
        <div className="flex flex-row text-gray-100 font-bold text-lg gap-4 p-4">
            <div className='w-1/5 h-auto bg-teal-400 rounded-lg'>
                <div className="flex flex-row m-2 items-center gap-x-5">
                    <MdOutlineInventory2 size="60"/>
                    <div className="flex flex-col">
                        <span className="mx-3">Total Products</span>
                        <span className="flex justify-center items-center">{products.length}</span>
                    </div>
                </div>
            </div>
           {/* <div className='w-1/5 h-auto bg-teal-400 rounded-lg'>
                <div className="flex flex-row m-2 items-center gap-x-5"><AiOutlineDollarCircle size="60"/>
                    <div className="flex flex-col">
                        <span className="mx-3">Store Value</span>
                        <span className="flex justify-center items-center">${(totalStoreValue.toLocaleString('en-US'))}</span>
                    </div>
                </div>
            </div> */}
            <div className='w-1/5 h-auto bg-teal-400 rounded-lg'>
                <div className="flex flex-row m-2 items-center gap-x-5"><BsCartX size="60"/>
                    <div className="flex flex-col">
                        <span className="mx-3">Out of Stock</span>
                        <span className="flex justify-center items-center">{outOfStock}</span>
                    </div>
                </div>
            </div>
            <div className='w-1/5 h-auto bg-teal-400 rounded-lg'>
                <div className="flex flex-row m-2 items-center gap-x-5"><BiCategoryAlt size="60"/>
                    <div className="flex flex-col">
                        <span className="mx-3">All Categories</span>
                        <span className="flex justify-center items-center">{categories.length}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductStats