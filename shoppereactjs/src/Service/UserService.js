import axios from "./customize-axios";

// Login function
const logins = async (email, password) => {
    try {
        const response = await axios.post('/api/user/login', { email, password });
        return response; // Return the whole response to handle status codes
    } catch (error) {
        throw error; // Rethrow the error to be caught in the component
    }
}

// Fetch all users
const getUsers = async () => {
    try {
        const response = await axios.get('/api/user/listUser');
        return response.data; // Return the data directly
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Add a new user
const addUser = async (formData) => {
    console.log('User data to be sent:', formData);
    try {
        const response = await axios.post('/api/user/addUser', formData, {
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

// Delete a user by ID
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/api/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error response from server:', error.response?.data || error.message);
        throw error;
    }
};

// Get a user by ID
const getUserbyid = async (id) => {
    try {
        const response = await axios.get(`/api/user/getbyid/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


// Update a user
const updateUser = async (formData) => {
    try {
        const response = await axios.put('/api/user/updateUser', formData, {
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


const logout = async () => {
    try {
        const response = await axios.post('/api/user/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Export all functions
export { logins, getUsers, addUser, deleteUser, getUserbyid, updateUser, logout };
