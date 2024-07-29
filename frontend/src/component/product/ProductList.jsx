import React, { useEffect, useState } from 'react'
import {VscEye, VscEdit, VscTrash}from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../redux/features/product/filterSlice';
import Search from '../search/Search';
import ReactPaginate from 'react-paginate';
import { deleteProduct, getProducts } from '../../redux/features/product/productSlice';
import { confirmAlert } from 'react-confirm-alert'; 
import { Link } from 'react-router-dom';


const ProductList = ({products, isLoading}) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const filteredProducts = useSelector(selectFilteredProducts);

    const shortenText = (text, n) => {
        if(text.length) {
            const shortenedText = text.substring(0, n).concat("...")
            return shortenedText;
        }
        return text;
    }

    useEffect(() => {
      dispatch(FILTER_PRODUCTS({products, search}))
    }, [products, search, dispatch])



    // Begin Pagination
    const [itemOffset, setItemOffset] = useState(0);
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
    }, [itemOffset, itemsPerPage])

    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };

    //End Pagination

    const delProduct = async (id) => {
        await dispatch(deleteProduct(id));
        await dispatch(getProducts());
    }


    const confirmDelete = (id) => {
        confirmAlert({
            title: 'Delete Product',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Delete',
                onClick: () => delProduct(id)
              },
              {
                label: 'Cancel',
              }
            ]
          });
    }



  return (
    <div className='bg-gray-800 text-gray-300 overflow-hidden w-11/12 ml-3'>
        <span className="float-left text-4xl mt-3">Invetory Items</span>
        <span className="float-right mt-3 mb-3">
            <Search value={search} onChange={(e) => setSearch(e.target.value)}/>
        </span>
        <table className="table-fixed w-full border-seperate">
            <thead className="bg-gray-900 rounded-lg">
                <tr className="rounded-lg">
                <th className="border border-gray-600">S/N</th>
                <th className="border border-gray-600">Name</th>
                <th className="border border-gray-600">Category</th>
                <th className="border border-gray-600">Price</th>
                <th className="border border-gray-600">Quantity</th>
                <th className="border border-gray-600">Value</th>
                <th className="border border-gray-600">Action</th>
                </tr>
            </thead>
            <tbody>
            {!isLoading && filteredProducts.length === 0 ? (
            <tr className='border-2 border-teal-600 bold'><td>-- No Product found -- </td></tr>
        ) : (
                filteredProducts.map((product, index) => {
                    const { _id, name, category, price, quantity } = product;
                    return (
                        <tr key={_id}>
                            <td className="border-2 border-teal-600 bold">{index+1}</td>
                            <td className="border-2 border-teal-600 bold">{shortenText(name, 16)}</td>
                            <td className="border-2 border-teal-600 bold">{category}</td>
                            <td className="border-2 border-teal-600 bold">{(price*1).toLocaleString('en-US')}{" dh"}</td>
                            <td className="border-2 border-teal-600 bold">{quantity}</td>
                            <td className="border-2 border-teal-600 bold">{(price*quantity).toLocaleString('en-US')}{" dh"}</td>
                            <td className="flex flex-row justify-center items-center gap-4 border-2 border-teal-600 bold">
                                <span className="m-1">
                                    <Link to={`/product-details/${_id}`}>
                                        <VscEye size={20}/>
                                    </Link>
                                </span>
                                <span>
                                    <Link to={`/edit-product/${_id}`}>
                                        <VscEdit size={20}/>
                                    </Link>
                                </span>
                                <span onClick={() =>confirmDelete(_id)}><VscTrash size={20}/></span>
                            </td>
                        </tr>
                    )
                })
            )}
            </tbody>
        </table>
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            containerClassName="flex flex-row justify-center items-center p-5 gap-x-5"
            pageLinkClassName='border-2 px-1 border-teal-600 hover:bg-teal-700'
            previousClassName='border-2 px-1 border-teal-600 hover:bg-teal-700'
            nextLinkClassName='border-2 px-1 border-teal-600 hover:bg-teal-700'
        />
    </div>
  )
}

export default ProductList