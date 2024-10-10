import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaStore, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ userName }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('users');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="user-info d-flex align-items-center justify-content-between ">
        <img style={{ width: '50px', height: '50px', }}
          src={'https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg.webp'}
          alt="User Avatar"
          className="user-avatar"
        />
        <span>{userName}</span>
        <button className="menu-btn" onClick={handleLogout}>
          <FaSignOutAlt size={20} />
        </button>
      </div>
      <ul>
        <li className={location.pathname === '/admin/user/listuser' ? 'active' : ''}>
          <Link to="/admin/user/listuser" className="d-flex align-items-center">
            <FaUsers style={{ marginRight: '10px' }} />
            List User
          </Link>
        </li>
        <li className={location.pathname === '/admin/shop/listshop' ? 'active' : ''}>
          <Link to="/admin/shop/listshop" className="d-flex align-items-center">
            <FaStore style={{ marginRight: '10px' }} />
            List Shop
          </Link>
        </li>
        <li className={location.pathname === '/admin/category/listcategory' ? 'active' : ''}>
          <Link to="/admin/category/listcategory" className="d-flex align-items-center">
            <FaStore style={{ marginRight: '10px' }} />
            List Category
          </Link>
        </li>
        <li className={location.pathname === '/admin/product/listproduct' ? 'active' : ''}>
          <Link to="/admin/product/listproduct" className="d-flex align-items-center">
            <FaStore style={{ marginRight: '10px' }} />
            List Product
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
