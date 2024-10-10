import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { getCategory } from '../../../Service/CategoryService';
import { getShop } from '../../../Service/ShopService';
import { addProduct } from '../../../Service/ProductService';
import { FaPlus, FaSpinner } from 'react-icons/fa';

const AddProduct = () => {
    const [ProductName, setProductName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Avatar, setAvatar] = useState('');
    const [Size, setSize] = useState('');
    const [Color, setColor] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [ShopId, setShopId] = useState('');
    const [CategoryId, setCategoryId] = useState('');


    const [Shops, setShop] = useState([]);
    const [Category, setCategory] = useState([]);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    /// getall shop
    useEffect(() => {
        const fetchShop = async () => {
            try {
                const data = await getShop();
                setShop(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Could not fetch users.');
            }
        };
        fetchShop();
    }, []);
    /// getall shop
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategory();
                setCategory(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Could not fetch users.');
            }
        };
        fetchCategory();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const formData = new FormData();
            formData.append('ProductName', ProductName);
            formData.append('Description', Description);
            formData.append('Price', Price);
            if (Avatar) {
                formData.append('avatarFile', Avatar);
            }
            formData.append('Size', Size);
            formData.append('Color', Color);
            formData.append('Quantity', Quantity);
            formData.append('ShopId', ShopId);
            formData.append('CategoryId', CategoryId);
            const response = await addProduct(formData);
            navigate('/admin/listproduct');
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
                <h1> > Product > Add Product</h1>
            </header>
            <main className="main-content container mt-4">
                <div className="container mt-4">
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className='row'>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="ProductName" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        id="ProductName"
                                        className="form-control"
                                        value={ProductName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Description" className="form-label">Description</label>
                                    <input
                                        type="text"
                                        id="Description"
                                        className="form-control"
                                        value={Description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        id="Price"
                                        className="form-control"
                                        value={Price}
                                        onChange={(e) => setPrice(e.target.value)}
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
                                    <label htmlFor="Size" className="form-label">Size</label>
                                    <input
                                        type="text"
                                        id="Size"
                                        className="form-control"
                                        value={Size}
                                        onChange={(e) => setSize(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className='col-6'>

                                <div className="mb-3">
                                    <label htmlFor="Color" className="form-label">Color</label>
                                    <input
                                        type="text"
                                        id="Color"
                                        className="form-control"
                                        value={Color}
                                        onChange={(e) => setColor(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="Quantity" className="form-label">Quantity</label>
                                    <input
                                        type="number"
                                        id="Quantity"
                                        className="form-control"
                                        value={Quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="ShopId" className="form-label">ShopId</label>
                                    <select
                                        id="ShopId"
                                        className="form-select"
                                        value={ShopId}
                                        onChange={(e) => setShopId(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {Shops.map(shops => (
                                            <option key={shops.id} value={shops.id}>
                                                {shops.shopName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="CategoryId" className="form-label">CategoryId</label>
                                    <select
                                        id="CategoryId"
                                        className="form-select"
                                        value={CategoryId}
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a user</option>
                                        {Category.map(Category => (
                                            <option key={Category.id} value={Category.id}>
                                                {Category.categoryName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? <FaSpinner className="spinner" /> : <FaPlus style={{ marginRight: '0px' }} />}
                                {loading ? ' Adding...' : ' Add'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </Layout>
    );
};

export default AddProduct;
