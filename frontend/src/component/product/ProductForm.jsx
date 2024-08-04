import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ product, description, setDescription, handleInputChange, saveProduct, title, buttonText }) => {
  return (
    <form className='max-w-[800px] w-full mx-auto bg-gray-800 p-8 m-5 rounded-lg shadow-lg'>
      <h2 className='text-4xl text-white font-bold text-center mb-6'>{title}</h2>
      <div className='form-group mb-4'>
        <label className='block text-gray-300 mb-2'>Nom du produit</label>
        <input
          className='form-control w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
          type="text"
          name="name"
          onChange={handleInputChange}
          value={product?.name}
          required
        />
      </div>
      <div className='form-group mb-4'>
        <label className='block text-gray-300 mb-2'>Catégorie du produit</label>
        <input
          className='form-control w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
          type="text"
          name="category"
          onChange={handleInputChange}
          value={product?.category}
          required
        />
      </div>
      <div className='form-group mb-4'>
        <label className='block text-gray-300 mb-2'>Prix du produit</label>
        <input
          className='form-control w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
          type="text"
          name="price"
          onChange={handleInputChange}
          value={product?.price}
          required
        />
      </div>
      <div className='form-group mb-4'>
        <label className='block text-gray-300 mb-2'>Quantité du produit</label>
        <input
          className='form-control w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500'
          type="text"
          name="quantity"
          onChange={handleInputChange}
          value={product?.quantity}
          required
        />
      </div>
      <div className='form-group mb-6'>
        <label className='block text-gray-300 mb-2'>Déscription du produit</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          modules={ProductForm.modules}
          formats={ProductForm.formats}
          className='bg-gray-700 text-white rounded'
        />
      </div>
      <button
        type="button"
        onClick={saveProduct}
        className='w-full py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300'
      >
        {buttonText}
      </button>
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
