import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { getProduct, deleteProduct } from '../../../Service/ProductService';
import { Link } from 'react-router-dom';
import { FaPlus, FaFileExcel, FaEdit, FaTrash } from 'react-icons/fa';

const ListProduct = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProduct();
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

        fetchProduct();
    }, []);



    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProduct(product.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProduct = product.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
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

            <Layout>
                <header className="header">
                    <h1> > Product > List Product</h1>
                </header>

                <main className="main-content container mt-4">
                    <div className="d-flex justify-content-end mb-3">
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control mr-2"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <Link to="/admin/product/addProduct" className="btn btn-primary d-flex align-items-center">
                            <FaPlus size={16} color="white" className="mr-2" />
                            <span className="ml-1">Add Product</span>
                        </Link>
                        <button className="btn btn-success d-flex align-items-center">
                            <FaFileExcel size={16} color="white" className="mr-2" />
                            <span className="ml-1">Export to Excel</span>
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-white">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>STT</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Avatar</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Quantity</th>
                                    <th>Shop Name</th>
                                    <th>Catefory Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <div className="table-responsive">
                                    <div className="overlay">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <tbody>
                                    {currentUsers.length > 0 ? (
                                        (() => {
                                            let count = indexOfFirstUser + 1;
                                            return currentUsers.map(product => (
                                                <tr key={product.id}>
                                                    <td style={{ width: '50px' }}>{count++}</td>
                                                    <td>{product.productName}</td>
                                                    <td>{product.description}</td>
                                                    <td>{product.price}</td>
                                                    <td>
                                                        {product.avatar ? (
                                                            <img
                                                                src={product.avatar}
                                                                alt={`${product.shop.shopName}'s avatar`}
                                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            'No Avatar'
                                                        )}
                                                    </td>
                                                    <td>{product.size}</td>
                                                    <td>{product.color}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.shop.shopName}</td>
                                                    <td>{product.category.categoryName}</td>

                                                    <td>
                                                        <Link to={`/admin/product/editcategory?idcategory=${product.id}`} className="icon-link mr-3" style={{ color: 'yellowgreen' }}>
                                                            <FaEdit className="icon" />
                                                        </Link>
                                                        <button className="icon-link" onClick={() => handleDelete(product.id)} style={{ color: 'red' }}>
                                                            <FaTrash className="icon" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ));
                                        })()
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">Không có dữ liệu</td>
                                        </tr>
                                    )}
                                </tbody>
                            )}
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
                </main>
            </Layout>

        </>
    );
};

export default ListProduct;
