// src/components/CustomerComponents/CustomerSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const CustomerSidebar = () => {
  return (
    <aside className="customer-sidebar">
      <ul>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/orders">My Orders</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </aside>
  );
};

export default CustomerSidebar;
