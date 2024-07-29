import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({product, productImage, imagePreview, description, setDescription, handleInputChange,
handleImageChange, saveProduct, title, buttonText}) => {
  return (
    <form className='max-w-[1000px] w-full mx-auto bg-gray-900 p-8 m-5 rounded-lg'>
        <h2 className='text-4xl dark:text-white font-bold text-center'>{title}</h2>
        <div className="form-group">
        <label>Product Image</label>
            <label
                draggable
                onDragStart={(e) => handleImageChange(e)}
           onDrag={(e) => handleImageChange(e)}
           onDragEnd={(e) => handleImageChange(e)}
                className="form-file-label">
                <span className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="font-medium text-gray-400">
                        Drop files to Attach, or
                        <span className="text-blue-600 underline">browse</span>
                    </span>
                </span>
                <input type="file" name="photo" className="hidden" onChange={(e) => handleImageChange(e)}/>
            </label>
            {imagePreview != null ? (
                <div>
                    <img className="max-wdith: 400px max-w-screen-sm mt-5" src={imagePreview} alt="Product"/>
                </div>
            ) : (<p>No Image set for this product</p>)}
        </div>
        <div className='form-group'>
            <label>Product Name</label>
            <input className='form-control' type="text" name="name" onChange={handleInputChange} value={product?.name} required/>
        </div>
        <div className='form-group'>
            <label>Product Category</label>
            <input className='form-control' type="text" name="category" onChange={handleInputChange} value={product?.category} required/>
        </div>
        <div className='form-group'>
            <label>Product Price</label>
            <input className='form-control' type="text" name="price" onChange={handleInputChange} value={product?.price} required/>
        </div>
        <div className='form-group'>
            <label>Product Quantity</label>
            <input className='form-control' type="text" name="quantity" onChange={handleInputChange} value={product?.quantity} required/>
        </div>
        <div className='form-group space-y-3'>
            <label>Product Description</label>
            <ReactQuill theme="snow" value={description} onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats}/>
        </div>
        <button type="button" onClick={saveProduct} className='btn-primary'>{buttonText}</button>
    </form>
  )
}

ProductForm.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  ProductForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];

export default ProductForm;