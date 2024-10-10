import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { getShop, deleteShopr } from '../../../Service/ShopService';
import { Link } from 'react-router-dom';
import { FaPlus, FaFileExcel, FaEdit, FaTrash } from 'react-icons/fa';
import { HubConnectionBuilder } from '@microsoft/signalr'; 

const ListShop = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const data = await getShop();
                if (Array.isArray(data)) {
                    setShops(data);
                } else {
                    console.error('Expected an array, but got:', data);
                    setShops([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setShops([]);
            } finally {
                setLoading(false);
            }
        };

        fetchShop();
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:7033/shophub') 
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(() => {
                console.log('Connected to SignalR hub.');

                connection.on('ReceiveShopAdded', (shopName) => {
                    alert(`Shop mới: ${shopName}`);
                    fetchShop();
                });
            })
            .catch(error => console.error('SignalR connection error:', error));

        return () => {
            connection.stop();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteShopr(id);
            setShops(shops.filter(shops => shops.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredshops = shops.filter(shops =>
        shops.shopName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // phân trang
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredshops.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredshops.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>

            <Layout>
                <header className="header">
                    <h1> > Shop > List Shop</h1>
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
                        <Link to="/admin/shop/addshop" className="btn btn-primary d-flex align-items-center">
                            <FaPlus size={16} color="white" className="mr-2" />
                            <span className="ml-1">Add Shop</span>
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
                                    <th>ShopName</th>
                                    <th>Description</th>
                                    <th>Adresses</th>
                                    <th>Avatar</th>
                                    <th>Phonenumber</th>
                                    <th>UserName</th>
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
                                            return currentUsers.map(shop => (
                                                <tr key={shop.id}>
                                                    <td style={{ width: '50px' }}>{count++}</td>
                                                    <td>{shop.shopName}</td>
                                                    <td>{shop.description}</td>
                                                    <td>{shop.addresses}</td>
                                                    <td>
                                                        {shop.avatar ? (
                                                            <img
                                                                src={shop.avatar}
                                                                alt={`${shop.userName}'s avatar`}
                                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            'No Avatar'
                                                        )}
                                                    </td>
                                                    <td>{shop.phonenumber}</td>
                                                    <td>{shop.user.userName}</td>
                                                    <td>
                                                        <Link to={`/admin/shop/editshop?idshop=${shop.id}`} className="icon-link mr-3" style={{ color: 'yellowgreen' }}>
                                                            <FaEdit className="icon" />
                                                        </Link>
                                                        <button className="icon-link" onClick={() => handleDelete(shop.id)} style={{ color: 'red' }}>
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

export default ListShop;
