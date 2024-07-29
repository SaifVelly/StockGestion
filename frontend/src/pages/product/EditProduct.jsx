import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../component/loader/Loader';
import ProductForm from '../../component/product/ProductForm';
import Authorization from '../../customHook/authorization';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice';


const EditProduct = () => {
    Authorization('/login');
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading = useSelector(selectIsLoading );
    const productEdit = useSelector(selectProduct);

    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    

    useEffect(() => {
      dispatch(getProduct(id))
    }, [dispatch, id])

    useEffect(() => {
        setProduct(productEdit);

        setImagePreview(
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        )

        setDescription(
            productEdit && productEdit.description ? productEdit.description : null
        )
      }, [productEdit])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    }

    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]))
    };

    const saveProduct = async (e) => {
        const formData = new FormData();
        formData.append("name", product?.name);
        formData.append("category", product?.category);
        formData.append("quantity", product?.quantity);
        formData.append("price", product?.price);
        formData.append("description", description);
        if(productImage) {
            formData.append("image", productImage);
        }

        await dispatch(updateProduct({id, formData}))
        await dispatch(getProducts())

        navigate('/dashboard');

    } 
    
    
  return (
    <div className='h-auto w-full'>
        {isLoading && <Loader/>}
            <div className='bg-gray-800 flex flex-col justify-center'>
                <ProductForm
                product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
                title="Edit Product"
                buttonText="Edit Product"
                />
            </div>
    </div>
  )
}

export default EditProduct