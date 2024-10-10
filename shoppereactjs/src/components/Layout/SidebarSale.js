import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserCog, FaWallet, FaShippingFast, FaKey } from 'react-icons/fa';

const SidebarSale = () => {
    const location = useLocation();

    // Helper function to check if the current path matches the link path
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <div className="shadow-lg border-end p-3">
            <ul className="list-unstyled">
                <li className={`mb-3 ${isActive('/salesman/shop-settings')}`}>
                    <Link to="/salesman/shop-settings" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaHome size={20} className="me-2" />
                        Hồ sơ shop
                    </Link>
                </li>
                <li className={`mb-3 ${isActive('/salesman/shop-listproduct')}`}>
                    <Link to="/salesman/shop-listproduct" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaHome size={20} className="me-2" />
                        Danh sách sản phẩm
                    </Link>
                </li>
                <li className={`mb-3 ${isActive('/salesman/shop-statistical')}`}>
                    <Link to="/salesman/shop-statistical" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaHome size={20} className="me-2" />
                        Doanh thu
                    </Link>
                </li>
                <li className={`mb-3 ${isActive('/salesman/shop-settings/payments')}`}>
                    <Link to="/salesman/shop-settings/payments" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaWallet size={20} className="me-2" />
                        Cài đặt
                    </Link>
                </li>
                <li className={`mb-3 ${isActive('/salesman/shop-settings/shipping')}`}>
                    <Link to="/salesman/shop-settings/shipping" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaShippingFast size={20} className="me-2" />
                        Thay đổi
                    </Link>
                </li>
                <li className={`mb-3 ${isActive('/salesman/shop-settings/notifications')}`}>
                    <Link to="/salesman/shop-settings/notifications" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaKey size={20} className="me-2" />
                        Thay đổi mật khẩu
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default SidebarSale;
