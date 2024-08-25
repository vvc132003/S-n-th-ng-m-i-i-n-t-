// src/components/CustomerComponents/CustomerLayout.js
import React, { useState, useEffect } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerFooter from './CustomerFooter';
import CustomerSidebar from './CustomerSidebar';
import '../../CustomerHeader.scss';
import { quantity } from '../../Service/CartService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CustomerLayout = ({ children, handleCartUpdate  }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const fetchCartQuantity = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('users'));
        if (user) {
          const response = await quantity(user.id);
          setCartQuantity(response.quantity);
        }
      } catch (error) {
        console.error('Error fetching cart quantity:', error);
      }
    };
    fetchCartQuantity();
  }, [handleCartUpdate]);
  
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={800} hideProgressBar={true} newestOnTop={false} closeOnClick pauseOnHover />
      <div className="customer-layout">
        <CustomerHeader cartQuantity={cartQuantity} />
        <div className="customer-content">
          <main className="customer-main">{children}</main>
        </div>
        <CustomerFooter />
      </div>
    </>
  );
};

export default CustomerLayout;
