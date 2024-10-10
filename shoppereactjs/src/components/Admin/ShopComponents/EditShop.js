import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getShopbyid, updateShop } from '../../../Service/ShopService';
import Layout from '../../Layout/Layout';
import { FaCheck, FaSpinner } from 'react-icons/fa';

const EditShop = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('idshop'); // Get the iduser from the query parameters
    const [shopName, setShopName] = useState('');
    const [description, setDescription] = useState('');
    const [addResses, setAddresses] = useState('');
    const [avatar, setAvatar] = useState('');
    const [phoneNumber, setPhonenumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getShopbyid(id);
                setShopName(data.shopName);
                setDescription(data.description);
                setAddresses(data.addresses);
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('Id', id);
        formData.append('ShopName', shopName);
        formData.append('Description', description);
        formData.append('Addresses', addResses);
        formData.append('Phonenumber', phoneNumber);
        formData.append('UserId', 1);
        if (avatar) {
            formData.append('avatarFile', avatar);
        }
        console.log('Sending form data:', [...formData.entries()]);  // Log the form data

        try {
            const response = await updateShop(formData);
            navigate('/admin/listshop');
        } catch (error) {
            setError('Error updating user.');
            console.error('Error updating user:', error);
        }
    };

    const handleChange = (event) => {
        setAvatar(event.target.files[0]);
    };

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
                        <h1>Shop > Edit Shop</h1>
                    </header>
                    <main className="main-content container mt-4">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="shopName" className="form-label">Shop Name</label>
                                <input
                                    type="text"
                                    id="shopName"
                                    name="shopName"
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
                                    name="description"
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="addresses" className="form-label">AddResses</label>
                                <input
                                    type="text"
                                    id="addresses"
                                    name="addresses"
                                    className="form-control"
                                    value={addResses}
                                    onChange={(e) => setAddresses(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                />
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
                            <button
                                type="submit"
                                className="btn btn-warning"
                                disabled={loading}
                            >
                                {loading ? <FaSpinner className="spinner" /> : <FaCheck style={{ marginRight: '0px' }} />}
                                {loading ? ' Edit' : ' Edit'}
                            </button>
                        </form>
                    </main>
                </Layout>
            )}
        </>
    );
};

export default EditShop;