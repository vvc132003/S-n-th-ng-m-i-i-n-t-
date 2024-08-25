import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Container, Form, Button } from 'react-bootstrap';
import SidebarSale from '../Layout/SidebarSale'; // Adjust the path as needed
import SalesmanLayout from '../Layout/SalesmanLayout';
import { FaPlus, FaFileExcel, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllProductByIdUser, deleteProduct } from '../../Service/ProductService';
import { Link } from 'react-router-dom';


const ListProductByIdShop = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;


    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('users'));
            const data = await getAllProductByIdUser(user.id);
            if (Array.isArray(data)) {
                setProduct(data);
            } else {
                console.error('Expected an array, but got:', data);
                setProduct([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setProduct([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProduct(product.filter(product => product.id !== id));
            fetchProduct();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProduct = product.filter(product =>
        product.product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // phân trang
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredProduct.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredProduct.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                <>
                    <SalesmanLayout>
                        <Container fluid className="p-4 header-container">
                            <Row>
                                <Col md={3}>
                                    <SidebarSale />
                                </Col>
                                <Col md={9}>
                                    <Card className="shadow-lg b-light">
                                        <Card.Text style={{ padding: '20px 40px', marginBottom: '10px', borderBottom: '1px solid #d5d6d6' }}>
                                            <h2 className="" style={{ fontSize: '20px' }}>> Sản phẩm > Danh sách sản phẩm</h2>
                                        </Card.Text>
                                        <Card.Body>

                                            <div className="d-flex justify-content-end mb-3">
                                                <div className="d-flex align-items-center">
                                                    <input
                                                        type="text"
                                                        className="form-control mr-2"
                                                        placeholder="Tìm kiếm..."
                                                        value={searchTerm}
                                                        onChange={handleSearch}
                                                    />
                                                </div>
                                                <Link to="/salesman/shop-addproduct" className="btn btn-primary d-flex align-items-center">
                                                    <FaPlus size={16} color="white" className="mr-2" />
                                                    <span className="ml-1">Thêm Sản Phẩm</span>
                                                </Link>
                                                <button className="btn btn-success d-flex align-items-center">
                                                    <FaFileExcel size={16} color="white" className="mr-2" />
                                                    <span className="ml-1">Xuất Excel</span>
                                                </button>
                                            </div>

                                            <div className="table-responsive">
                                                <table className="table table-white">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: '50px' }}>STT</th>
                                                            <th>Ảnh</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Giá</th>
                                                            <th>Loại sản phẩm</th>
                                                            <th>Thao tác</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {currentUsers.length > 0 ? (
                                                            currentUsers.map((product, index) => {
                                                                const { id, productName, price, avatar, category } = product.product;
                                                                const { categoryName } = category;
                                                                return (
                                                                    <tr key={id}>
                                                                        <td style={{ width: '50px' }}>{index + 1}</td>
                                                                        <td>
                                                                            {avatar ? (
                                                                                <img
                                                                                    src={avatar}
                                                                                    alt={`${productName}'s avatar`}
                                                                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                                                />
                                                                            ) : (
                                                                                'No Avatar'
                                                                            )}
                                                                        </td>
                                                                        <td style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                            {productName}
                                                                        </td>
                                                                        <td style={{ color: 'red' }}>đ {price.toLocaleString()}</td>

                                                                        <td>{categoryName}</td>
                                                                        <td>
                                                                            <Link to={`/admin/editcategory?idcategory=${id}`} className="icon-link mr-3" style={{ color: 'yellowgreen' }}>
                                                                                <FaEdit className="icon" />
                                                                            </Link>
                                                                            <button className="icon-link" onClick={() => handleDelete(id)} style={{ color: 'red' }}>
                                                                                <FaTrash className="icon" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="11" className="text-center">Không có dữ liệu</td>
                                                            </tr>
                                                        )}
                                                    </tbody>

                                                </table>
                                            </div>

                                            <nav>
                                                <ul className="pagination justify-content-end">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(currentPage - 1)}
                                                            disabled={currentPage === 1}
                                                        >
                                                            &lt;
                                                        </button>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, index) => (
                                                        <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                                            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                                                                {index + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => handlePageChange(currentPage + 1)}
                                                            disabled={currentPage === totalPages}
                                                        >
                                                            &gt;
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </SalesmanLayout>
                </>
            )}
        </>
    );
};

export default ListProductByIdShop;
