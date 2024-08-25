import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { getCategory } from '../../Service/CategoryService';
import { Link } from 'react-router-dom';
import { FaPlus, FaFileExcel, FaEdit, FaTrash } from 'react-icons/fa';

const ListCategory = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const data = await getCategory();
                if (Array.isArray(data)) {
                    setCategory(data);
                } else {
                    console.error('Expected an array, but got:', data);
                    setCategory([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setCategory([]);
            } finally {
                setLoading(false);
            }
        };

        fetchShop();
    }, []);



    const handleDelete = async (id) => {
        try {
            // await deleteShopr(id);
            setCategory(category.filter(category => category.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = category.filter(category =>
        category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );    
    


    // phân trang
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredCategories.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredCategories.length / usersPerPage);

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
                <Layout>
                    <header className="header">
                        <h1> > Category > List Category</h1>
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
                            <Link to="/admin/addcategory" className="btn btn-primary d-flex align-items-center">
                                <FaPlus size={16} color="white" className="mr-2" />
                                <span className="ml-1">Add Category</span>
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
                                        <th>Category Name</th>                                       
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.length > 0 ? (
                                        (() => {
                                            let count = indexOfFirstUser + 1;
                                            return currentUsers.map(category => (
                                                <tr key={category.id}>
                                                    <td style={{ width: '50px' }}>{count++}</td>
                                                    <td>{category.categoryName}</td>
                                                    <td>
                                                        <Link to={`/admin/editcategory?idcategory=${category.id}`} className="icon-link mr-3" style={{ color: 'yellowgreen' }}>
                                                            <FaEdit className="icon" />
                                                        </Link>
                                                        <button className="icon-link" onClick={() => handleDelete(category.id)} style={{ color: 'red' }}>
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
            )}
        </>
    );
};

export default ListCategory;
