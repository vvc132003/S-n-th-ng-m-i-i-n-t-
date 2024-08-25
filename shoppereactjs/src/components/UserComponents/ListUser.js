import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { addUser, getUsers, deleteUser } from '../../Service/UserService';
import { Link } from 'react-router-dom';
import { FaPlus, FaFileExcel, FaEdit, FaTrash } from 'react-icons/fa';

const ListUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 8;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error('Expected an array, but got:', data);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // phân trang
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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
                        <h1> > User > List User</h1>
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
                            <Link to="/admin/adduser" className="btn btn-primary d-flex align-items-center">
                                <FaPlus size={16} color="white" className="mr-2" />
                                <span className="ml-1">Add User</span>
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
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Avatar</th>
                                        <th>Phonenumber</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.length > 0 ? (
                                        (() => {
                                            let count = indexOfFirstUser + 1;
                                            return currentUsers.map(user => (
                                                <tr key={user.id}>
                                                    <td style={{ width: '50px' }}>{count++}</td>
                                                    <td>{user.userName}</td>
                                                    <td>{user.email}</td>
                                                    <td style={{ padding: '15px' }}>
                                                        {user.role === 'Quản lý' && (
                                                            <span
                                                                style={{
                                                                    backgroundColor: '#d4edda',
                                                                    color: '#155724',
                                                                    padding: '8px',
                                                                    borderRadius: '4px',
                                                                }}
                                                            >
                                                                {user.role}
                                                            </span>
                                                        )}
                                                        {user.role !== 'Quản lý' && (
                                                            <span
                                                                style={{
                                                                    backgroundColor: '#f8d7da',
                                                                    color: '#155724',
                                                                    padding: '8px',
                                                                    borderRadius: '4px',
                                                                }}
                                                            >
                                                                {user.role}
                                                            </span>)}
                                                    </td>
                                                    <td>
                                                        {user.avatar ? (
                                                            <img
                                                                src={user.avatar}
                                                                alt={`${user.userName}'s avatar`}
                                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                            />
                                                        ) : (
                                                            'No Avatar'
                                                        )}
                                                    </td>
                                                    <td>{user.phonenumber}</td>
                                                    <td>
                                                        <Link to={`/admin/edituser?iduser=${user.id}`} className="icon-link mr-3" style={{ color: 'yellowgreen' }}>
                                                            <FaEdit className="icon" />
                                                        </Link>
                                                        <button className="icon-link" onClick={() => handleDelete(user.id)} style={{ color: 'red' }}>
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

export default ListUser;
