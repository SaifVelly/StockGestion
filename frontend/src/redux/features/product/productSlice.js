import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productAPI from '../../../api/productAPI';

const initialState = {
   product: null,
   products: [],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: "",
   totalStoreValue: 0,
   outOfStock: 0,
   category: []
}

export const createProduct = createAsyncThunk(
    "products/create",
    async (formData, thunkAPI) => {
        try {
            return await productAPI.createProduct(formData);
        } catch(error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();

            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }   
    }
)

export const getProducts = createAsyncThunk(
    "products/getAll",
    async (_, thunkAPI) => {
        try {
            return await productAPI.getProducts();
        } catch(error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();

            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }   
    }
)

export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id, thunkAPI) => {
        try {
            return await productAPI.getProduct(id);
        } catch(error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();

            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }   
    }
)

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async (productData, thunkAPI) => {
        const {id, formData} = productData;
        try {
            return await productAPI.updateProduct(id, formData);
        } catch(error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();

            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }   
    }
)

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id, thunkAPI) => {
        try {
            return await productAPI.deleteProduct(id);
        } catch(error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();

            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }   
    }
)

const authSlice  = createSlice({
    name: "auth",
    initialState,
    reducers: {
        CALC_STORE_VALUE(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const {price, quantity} = item;
                const productValue = price*quantity;
                return array.push(productValue);
            })
            const totalValue = array.reduce((a,b) => {
                return a+b;
            }, 0)
            state.totalStoreValue = totalValue;
        },
        CALC_OUT_OF_STOCK(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const {quantity} = item;
                return array.push(quantity);
            })
            let count = 0;
            array.forEach((number) => {
                if (number === 0 || number === "0") {
                    count += 1;
                }
            })
            state.outOfStock = count;
        },
        CALC_CATEGORY(state, action) {
            const products = action.payload;
            const array = [];
            products.map((item) => {
                const { category } = item;
                return array.push(category);
            })
            const uniqueCategory = [...new Set(array)];
            state.category = uniqueCategory;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            console.log(action.payload);
            state.products.push(action.payload);
            toast.success("Product added successfully");
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload;
            toast.error(action.payload);
        });
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            console.log(action.payload);
            state.products = action.payload;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload;
            toast.error(action.payload);
        });
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            state.product = action.payload;
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload;
            toast.error(action.payload);
        });
        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            console.log(action.payload);
            toast.success("Product Updated Successfully")
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload;
            toast.error(action.payload);
        });
        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError=false;
            toast.success("Product has been deleted")
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.message = action.payload;
            toast.error(action.payload);
        });
    }
})

export const {CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORY} = authSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;

export const selectProduct = (state) => state.product.product;

export const selectTotalStoreValue = (state) => state.product.totalStoreValue;

export const selectOutOfStock = (state) => state.product.outOfStock;

export const selectCategory = (state) => state.product.category;



export default authSlice.reducer;