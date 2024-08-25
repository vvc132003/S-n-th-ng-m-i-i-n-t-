import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getUserbyid, updateUser } from '../../Service/UserService';
import Layout from '../Layout/Layout';
import { FaCheck , FaSpinner  } from 'react-icons/fa'; 

const EditUser = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('iduser'); 
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [phonenumber, setPhonenumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserbyid(id);
                setUser(data);
                setUserName(data.userName);
                setEmail(data.email);
                setRole(data.role);
                setPhonenumber(data.phonenumber);
            } catch (error) {
                setError('Error fetching user data.');
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('Id', id);
        formData.append('UserName', userName);
        formData.append('Email', email);
        formData.append('Role', role);
        formData.append('Phonenumber', phonenumber);
        formData.append('Password', password);
        if (avatar) {
            formData.append('avatarFile', avatar);
        }

        try {
            const response = await updateUser(formData);
            console.log('Response from server:', response);
            navigate('/admin/listuser');
        } catch (error) {
            setError('Error updating user.');
            console.error('Error updating user:', error);
        }
    };

    const roles = ['Quản lý', 'Nhân viên', 'Khách hàng', 'Người bán hàng'];
    const availableRoles = roles.filter(r => r !== role);

    return (
        <>
            {loading ? (
                <div className="table-responsive">
                    <div className="overlay">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
                </div>
            ) : (
                <Layout>
                    <header className="header">
                        <h1>User > Edit User</h1>
                    </header>
                    <main className="main-content container mt-4">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">Name</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
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
                                    name="email"
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
                                    name="role"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((r, index) => (
                                        <option key={index} value={r}>
                                            {r}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Avatar</label>
                                <input
                                    type="file"
                                    id="avatar"
                                    name="avatar"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    id="phonenumber"
                                    name="phonenumber"
                                    className="form-control"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-warning"
                                disabled={loading}
                            >
                                {loading ? <FaSpinner className="spinner" /> : <FaCheck  style={{ marginRight: '0px' }} />}
                                {loading ? ' Edit' : ' Edit'}
                            </button>
                        </form>
                    </main>
                </Layout>
            )}
        </>
    );
};

export default EditUser;
