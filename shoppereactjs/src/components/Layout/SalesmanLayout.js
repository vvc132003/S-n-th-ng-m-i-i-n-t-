// src/components/CustomerComponents/CustomerLayout.js
import React, { useState, useEffect } from 'react';
import CustomerHeader from './CustomerHeader';
import CustomerFooter from './CustomerFooter';
import CustomerSidebar from './CustomerSidebar';
import '../../CustomerHeader.scss';
import { quantity } from '../../Service/CartService';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Salesmanheader from './SalesmanHeader';
const SalesmanLayout = ({ children }) => {


  
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick pauseOnHover />
      <div className="customer-layout">
        <Salesmanheader  />
        <div className="customer-content">
          <main className="customer-main">{children}</main>
        </div>
        <CustomerFooter />
      </div>
    </>
  );
};

export default SalesmanLayout;
