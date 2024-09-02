import axios from "./customize-axios";


const AddOrder = async (UserId) => {
    try {
        const response = await axios.get(`/api/Order/AddOrder`, {
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

const ListOrderUserId = async (UserId, type) => {
    try {
        const response = await axios.get(`/api/Order/ListOrder`, {
            params: {
                UserId,
                type
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};


export { AddOrder, ListOrderUserId };
