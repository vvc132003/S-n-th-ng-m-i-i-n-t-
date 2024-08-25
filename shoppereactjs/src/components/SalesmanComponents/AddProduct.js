import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getCategory } from '../../Service/CategoryService';
import { getShop } from '../../Service/ShopService';
import { addProducts } from '../../Service/ProductService';
import { Card, Col, Row, Container, Form, Button } from 'react-bootstrap';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import SidebarSale from '../Layout/SidebarSale';
import SalesmanLayout from '../Layout/SalesmanLayout';
import { Helmet } from 'react-helmet-async';

const AddProducts = () => {



    const [ProductName, setProductName] = useState('');
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('');
    const [Avatar, setAvatar] = useState('');
    const [Size, setSize] = useState('');
    const [Color, setColor] = useState('');
    const [Quantity, setQuantity] = useState('');
    const [ShopId, setShopId] = useState('');
    const [CategoryId, setCategoryId] = useState('');

    const [Category, setCategory] = useState([]);


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();



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
            const user = JSON.parse(sessionStorage.getItem('users'));
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
            formData.append('CategoryId', CategoryId);
            formData.append('UserId', user.id);
            await addProducts(formData);
            navigate('/salesman/shop-listproduct');
        } catch (error) {
            console.error('Error adding product:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleFileChange = (event) => {
        setAvatar(event.target.files[0]);
    };

    return (
        <>
            <Helmet>
                <title>Thêm Sản Phẩm</title>
            </Helmet>
            <SalesmanLayout>
                <Container fluid className="p-4 header-container">
                    <Row>
                        <Col md={3}>
                            <SidebarSale />
                        </Col>
                        <Col md={9}>
                            <Card className="shadow-lg b-light">
                                <Card.Text style={{ padding: '20px 40px', marginBottom: '10px', borderBottom: '1px solid #d5d6d6' }}>
                                    <h2 className="" style={{ fontSize: '20px' }}>> Sản phẩm > Thêm sản phẩm</h2>
                                </Card.Text>
                                <Card.Body>
                                    <div className="container">
                                        <form onSubmit={handleSubmit}>
                                            {error && <div className="alert alert-danger">{error}</div>}
                                            <div className='row'>
                                                <div className='col-6'>
                                                    <div className="mb-3">
                                                        <label htmlFor="ProductName" className="form-label">Tên sản phẩm</label>
                                                        <input
                                                            type="text"
                                                            id="ProductName"
                                                            className="form-control"
                                                            value={ProductName}
                                                            onChange={(e) => setProductName(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Description" className="form-label">Mô tả</label>
                                                        <input
                                                            type="text"
                                                            id="Description"
                                                            className="form-control"
                                                            value={Description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Price" className="form-label">Gía</label>
                                                        <input
                                                            type="number"
                                                            id="Price"
                                                            className="form-control"
                                                            value={Price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="avatar" className="form-label">Ảnh</label>
                                                        <input
                                                            type="file"
                                                            id="avatar"
                                                            className="form-control"
                                                            onChange={handleFileChange}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        />
                                                    </div>
                                                </div>
                                                <div className='col-6'>

                                                    <div className="mb-3">
                                                        <label htmlFor="Color" className="form-label">Màu</label>
                                                        <input
                                                            type="text"
                                                            id="Color"
                                                            className="form-control"
                                                            value={Color}
                                                            onChange={(e) => setColor(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Quantity" className="form-label">Số lượng</label>
                                                        <input
                                                            type="number"
                                                            id="Quantity"
                                                            className="form-control"
                                                            value={Quantity}
                                                            onChange={(e) => setQuantity(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="Size" className="form-label">Kích cỡ</label>
                                                        <input
                                                            type="text"
                                                            id="Size"
                                                            className="form-control"
                                                            value={Size}
                                                            onChange={(e) => setSize(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="CategoryId" className="form-label">Loại sản phẩm</label>
                                                        <select
                                                            id="CategoryId"
                                                            className="form-select"
                                                            value={CategoryId}
                                                            onChange={(e) => setCategoryId(e.target.value)}
                                                            required
                                                            style={{ borderRadius: "0" }}

                                                        >
                                                            <option value="">Vui lòng chọn</option>
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
                                                    style={{ borderRadius: "0" }}
                                                >
                                                    {loading ? <FaSpinner className="spinner" /> : <FaPlus style={{ marginRight: '0px' }} />}
                                                    {loading ? ' Thêm...' : ' Thêm'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </SalesmanLayout>
        </>
    );
};

export default AddProducts;
