import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { getUsers } from '../../../Service/UserService';
import { addShop } from '../../../Service/ShopService';
import { FaPlus, FaSpinner  } from 'react-icons/fa'; 

const AddUser = () => {
    const [shopName, setShopName] = useState('');
    const [description, setDescription] = useState('');
    const [addResses, setAddresses] = useState('');
    const [avatar, setAvatar] = useState('');
    const [phoneNumber, setPhonenumber] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Could not fetch users.');
            }
        };
        fetchUsers();
    }, []);



    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('ShopName', shopName);
            formData.append('Description', description);
            formData.append('Addresses', addResses);
            formData.append('Phonenumber', phoneNumber);
            formData.append('UserId', userId);
            if (avatar) {
                formData.append('avatarFile', avatar);
            }
            const response = await addShop(formData);
            console.log('Response from server:', response);
            navigate('/admin/listshop');
        } catch (error) {
            setError('Error adding user.');
        } finally {
            setLoading(false);
        }
    };
    const handleFileChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    return (
        <Layout>
            <header className="header">
                <h1> > Shop > Add Shop</h1>
            </header>
            <main className="main-content container mt-4">
                <div className="container mt-4">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="shopName" className="form-label">Shop Name</label>
                            <input
                                type="text"
                                id="shopName"
                                className="form-control"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                id="description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">UserId</label>
                            <select
                                id="userId"
                                className="form-select"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            >
                                <option value="">Select a user</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.userName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addResses" className="form-label">AddResses</label>
                            <input
                                type="text"
                                id="addResses"
                                className="form-control"
                                value={addResses}
                                onChange={(e) => setAddresses(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">PhoneNumber</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="avatar" className="form-label">Avatar</label>
                            <input
                                type="file"
                                id="avatar"
                                className="form-control"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? <FaSpinner className="spinner" /> : <FaPlus style={{ marginRight: '0px' }} />}
                            {loading ? ' Add' : ' Add'}
                        </button>
                    </form>
                </div>
            </main>
        </Layout>
    );
};

export default AddUser;
