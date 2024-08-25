import axios from "./customize-axios";



const getProduct = async () => {
    try {
        const response = await axios.get('/api/Product/getAllProduct');
        return response.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getProductbyid = async (id) => {
    try {
        const response = await axios.get(`/api/Product/getbyid/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


const addProduct = async (formData) => {
    console.log('User data to be sent:', formData);
    try {
        const response = await axios.post('/api/Product/addProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

const addProducts = async (formData) => {
    try {
        const response = await axios.post('/api/Product/addProducts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`/api/Product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};




const checksoluongproduct = async (ProductId) => {
    try {
        const response = await axios.get(`/api/Product/checksoluongproduct`, {
            params: {
                ProductId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

const getAllProductByIdUser = async (UserId) => {
    try {
        const response = await axios.get(`/api/Product/getAllProductByIdUser`, {
            params: {
                UserId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

export { getProduct,addProduct,deleteProduct,getProductbyid,checksoluongproduct,getAllProductByIdUser,addProducts };
