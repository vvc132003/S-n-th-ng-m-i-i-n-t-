import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { addUser } from '../../../Service/UserService';
import { FaPlus, FaSpinner  } from 'react-icons/fa'; 

const AddUser = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null); 
    const [phonenumber, setPhonenumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        
        const formData = new FormData();
        formData.append('UserName', userName);
        formData.append('Email', email);
        formData.append('Password', password);
        formData.append('Role', role);
        formData.append('Phonenumber', phonenumber);
        if (avatar) {
            formData.append('avatarFile', avatar);
        }
        
        try {
            const response = await addUser(formData); 
            console.log('Response from server:', response);
            navigate('/admin/listUser'); 
        } catch (error) {
            setError('Error adding user.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <header className="header">
                <h1> > User > Add User</h1>
            </header>
            <main className="main-content container mt-4">
                <div className="container mt-4">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Name</label>
                            <input
                                type="text"
                                id="userName"
                                className="form-control"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                id="role"
                                className="form-select"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="Quản lý">Quản lý</option>
                                <option value="Customer">Customer</option>
                                <option value="Staff">Staff</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <div className="mb-3">
                            <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                id="phonenumber"
                                className="form-control"
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
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
