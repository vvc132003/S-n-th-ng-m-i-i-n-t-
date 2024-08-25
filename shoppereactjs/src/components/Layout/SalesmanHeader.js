import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

const Salesmanheader = () => {

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
        <header className="customer-header" style={{ backgroundColor: '#FF4500' }}>
            <div className="header-icons header-container d-flex justify-content-between align-items-center py-2 small-text">
                <div className="d-flex  ">
                    <div className="logo">
                        <Link to="/">
                            <img src="https://phuongnamvina.com/img_data/images/design-logo-ban-hang-online.jpg" alt="Logo" style={{ width: '80px', height: 'auto' }} />
                        </Link>
                    </div>
                    <button
                        onClick={handleNavigation}
                        className="icon-links text-white text-decoration-none text-dark small-text"
                        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                        <i className="fas fa-store me-1"></i> Salesman - Kênh người bán
                    </button>
                </div>
                <div className="user-info d-flex align-items-center">
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
        </header>
    );
};
export default Salesmanheader;