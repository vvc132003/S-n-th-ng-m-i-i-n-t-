import axios from "./customize-axios";



const getShop = async () => {
    try {
        const response = await axios.get('/api/shop/listShop');
        return response.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const addShop = async (formData) => {
    try {
        const response = await axios.post('/api/shop/addShop', formData, {
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



const getShopbyid = async (id) => {
    try {
        const response = await axios.get(`/api/shop/getbyid/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};
const updateShop = async (formData) => {
    try {
        const response = await axios.put('/api/shop/updateShop', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error.response?.data || error.message);
        throw error;
    }
};
const deleteShopr = async (id) => {
    try {
        const response = await axios.delete(`/api/shop/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};
export { getShop ,addShop, getShopbyid, updateShop, deleteShopr};
