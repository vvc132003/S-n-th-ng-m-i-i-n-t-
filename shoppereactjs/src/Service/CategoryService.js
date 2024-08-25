import axios from "./customize-axios";



const getCategory = async () => {
    try {
        const response = await axios.get('/api/Category/listCategory');
        return response.data; 
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};



const addCategory= async (formData) => {
    try {
        const response = await axios.post('/api/Category/addcategory', formData, {
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

const getCategorybyid = async (id) => {
    try {
        const response = await axios.get(`/api/Category/getbyid/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

const updateCategory = async (formData) => {
    try {
        const response = await axios.put('/api/Category/updateCategory', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error.response?.data || error.message);
        throw error;
    }
};


export { getCategory, addCategory, getCategorybyid,updateCategory };
