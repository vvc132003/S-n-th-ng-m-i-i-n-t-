import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCog, FaWallet, FaShippingFast, FaKey } from 'react-icons/fa';

const Sidebarpurchase = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path ? 'active' : '';
    const handleClick = () => {
        navigate('/user/purchase');
    };
    return (
        <div className="p-3" style={{ background: 'white' }}>
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
                <li className={`mb-3 ${isActive('/salesman/shop-settings/payments')}`}>
                    <Link to="/salesman/shop-settings/payments" className="d-flex align-items-center text-decoration-none text-dark">
                        <FaWallet size={20} className="me-2" />
                        Cài đặt
                    </Link>
                </li>
                <li className={`mb-3 ${isActive('/user/purchase')}`}>
                    <Link to="/user/purchase" className="d-flex align-items-center text-decoration-none text-dark"
                        onClick={handleClick}
                    >
                        <FaShippingFast size={20} className="me-2" />
                        Đơn Mua
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

export default Sidebarpurchase;
