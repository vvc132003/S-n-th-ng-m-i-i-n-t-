import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaFacebookF, FaInstagram, FaBell, FaQuestionCircle, FaSignInAlt } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import { quantity } from '../../Service/CartService';

const CustomerHeader = ({ cartQuantity }) => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user) {
            navigate('/salesman');
        }
        else {
            navigate('/login');
        }

    };

    const user = JSON.parse(sessionStorage.getItem('users'));
    const isLoggedIn = user !== null;
    const userName = isLoggedIn ? user.userName : '';
    return (
        <header className="customer-header ">
            <div className="header-icons header-container d-flex justify-content-between align-items-center py-2 small-text">
                <div className="d-flex  ">
                    <button
                        onClick={handleNavigation}
                        className="icon-links text-white text-decoration-none text-dark small-text"
                        style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                        <i className="fas fa-store me-1"></i> Kênh người bán
                    </button>
                    <span className="separator"></span>
                    <Link to="/notifications" className="icon-links text-white text-decoration-none text-dark small-text">
                        <i className="fas fa-bell me-1"></i> Tải ứng dụng
                    </Link>
                    <span className="separator"></span>
                    <Link to="/support" className="icon-links text-white text-decoration-none text-dark small-text">
                        <i className="fas fa-life-ring me-1"></i> Kết nối
                        <div className="social-icons  d-inline ms-2">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-2">
                                <FaFacebookF size={16} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaInstagram size={16} />
                            </a>
                        </div>
                    </Link>
                </div>
                <div className="user-info d-flex align-items-center">
                    <Link to="/notifications" className="icon-links text-white text-decoration-none text-dark small-text d-flex align-items-center">
                        <FaBell className="me-2" /> Thông báo
                    </Link>
                    <Link to="/support" className="icon-links text-white text-decoration-none text-dark small-text d-flex align-items-center">
                        <FaQuestionCircle className="me-2" /> Hỗ trợ
                    </Link>
                    {isLoggedIn ? (
                        <Link to="/login" className="icon-links text-white text-decoration-none text-dark small-text d-flex align-items-center">
                            <FaSignInAlt className="me-2" /> {userName}
                        </Link>) : (
                        <Link to="/login" className="icon-links text-white text-decoration-none text-dark small-text d-flex align-items-center">
                            <FaSignInAlt className="me-2" /> Login
                        </Link>
                    )}
                </div>
            </div>
            <div className="container-fluid">
                <div className="header-container d-flex justify-content-between align-items-center" style={{ marginBottom: "-25px" }}>
                    <div className="logo">
                        <Link to="/">
                            <img src="https://phuongnamvina.com/img_data/images/design-logo-ban-hang-online.jpg" alt="Logo" className="img-fluid custom-logo" />
                        </Link>
                    </div>
                    <div className="search-bar d-flex flex-grow-1 mx-5">
                        <input type="text" className="form-control me-2" placeholder="Nhập thông tin tìm kiếm" />
                        <button type="submit" className="btn btn-light">Search</button>
                    </div>
                    <nav className="navbar">
                        <ul className="nav d-flex mb-0">
                            <li className="nav-item position-relative">
                                <Link to="/cart/listcart" className="nav-link text-white">
                                    <AiOutlineShoppingCart size={30} />
                                    {cartQuantity > 0 && (
                                        <Badge
                                            bg="danger"
                                            pill
                                            className="position-absolute top-0 start-100 translate-middle rounded-circle"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            {cartQuantity}
                                        </Badge>
                                    )}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="d-flex flex-wrap  justify-content-center py-2">
                    <Link to="/seller-channel" className="icon-links text-white  text-decoration-none small-text mx-2">
                        <i className="fas fa-store me-1"></i> Tai nghe
                    </Link>
                    <Link to="/notifications" className="icon-links text-white text-decoration-none small-text mx-2">
                        <i className="fas fa-bell me-1"></i> Quạt
                    </Link>
                </div>
            </div>
        </header>
    );
};
export default CustomerHeader;