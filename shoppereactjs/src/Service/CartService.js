import axios from "./customize-axios";


const addCart = async (UserId, ProductId, Quantity) => {
    try {
        const response = await axios.get(`/api/Cart/addccart`, {
            params: {
                UserId,
                ProductId,
                Quantity
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};


const quantity = async (UserId) => {
    try {
        const response = await axios.get(`/api/Cart/quantity`, {
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


const cartbyiduser = async (UserId) => {
    try {
        const response = await axios.get(`/api/Cart/listCart`, {
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


const deleteQuantityccart = async (UserId, ProductId) => {
    try {
        const response = await axios.get(`/api/Cart/deleteQuantityccart`, {
            params: {
                UserId,
                ProductId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

const AddQuantityccart = async (UserId, ProductId) => {
    try {
        const response = await axios.get(`/api/Cart/AddQuantityccart`, {
            params: {
                UserId,
                ProductId,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};



const Deletecarrtdeltal = async (UserId, ProductId) => {
    try {
        const response = await axios.get(`/api/Cart/Deletecarrtdeltal`, {
            params: {
                UserId,
                ProductId
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

export { addCart, quantity, cartbyiduser, deleteQuantityccart, AddQuantityccart, Deletecarrtdeltal };
