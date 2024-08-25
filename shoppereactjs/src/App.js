import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminComponents/AdminDashboard';
import ListCustomer from './components/CustomerComponents/ListCustomer';
import ListUser from './components/UserComponents/ListUser';

import Login from './components/UserComponents/Login';
import PrivateRoute from './components/hooks/PrivateRoute';
import DashboardHome from './components/AdminComponents/DashboardHome';
import AddUser from './components/UserComponents/AddUser';
import EditUser from './components/UserComponents/EditUser';
import ListShop from './components/ShopComponents/ListShop';
import AddShop from './components/ShopComponents/AddShop';
import EditShop from './components/ShopComponents/EditShop';
import ListCategory from './components/CategoryComponents/ListCategory';
import AddCategory from './components/CategoryComponents/AddCategory';
import EditCategory from './components/CategoryComponents/EditCategory';
import ListProduct from './components/ProductComponents/ListProduct';
import AddProduct from './components/ProductComponents/AddProduct';
import CustomerHome from './components/CustomerComponents/CustomerHome ';
import ProductDetail from './components/ProductComponents/ProductDetail';
import ListCart from './components/CartComponents/ListCart';
import Salesman from './components/SalesmanComponents/Salesman';
import Shopsettings from './components/SalesmanComponents/Shopsettings';
import ListProductByIdShop from './components/SalesmanComponents/ListProductByIdShop';
import AddProducts from './components/SalesmanComponents/AddProduct';


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} requiredRole="Quản lý" />} />
      <Route path="/admin/dashboard" element={<PrivateRoute element={<DashboardHome />} requiredRole="Quản lý" />} />
      <Route path="/admin/listuser" element={<PrivateRoute element={<ListUser />} requiredRole="Quản lý" />} />
      <Route path="/admin/AddUser" element={<PrivateRoute element={<AddUser />} requiredRole="Quản lý" />} />
      <Route path="/admin/edituser" element={<EditUser />} requiredRole="Quản lý" />


      {/* shop */}
      <Route path="/admin/listshop" element={<PrivateRoute element={<ListShop />} requiredRole="Quản lý" />} />
      <Route path="/admin/addShop" element={<PrivateRoute element={<AddShop />} requiredRole="Quản lý" />} />
      <Route path="/admin/editshop" element={<EditShop />} requiredRole="Quản lý" />

      {/* category */}
      <Route path="/admin/listcategory" element={<PrivateRoute element={<ListCategory />} requiredRole="Quản lý" />} />
      <Route path="/admin/addcategory" element={<PrivateRoute element={<AddCategory />} requiredRole="Quản lý" />} />
      <Route path="/admin/editcategory" element={<EditCategory />} requiredRole="Quản lý" />

      {/* product */}
      <Route path="/admin/listproduct" element={<PrivateRoute element={<ListProduct />} requiredRole="Quản lý" />} />
      <Route path="/admin/addProduct" element={<PrivateRoute element={<AddProduct />} requiredRole="Quản lý" />} />
      <Route path="/product/product" element={<ProductDetail />} requiredRole="" />



      {/* khách hàng */}
      <Route path="/" element={<PrivateRoute element={<CustomerHome />} requiredRole="" />} />
      <Route path="/ListCustomer" element={<PrivateRoute element={<ListCustomer />} requiredRole="" />} />

      {/* cart */}

      <Route path="/cart/listCart" element={<PrivateRoute element={<ListCart />} requiredRole="" />} />



      {/* shop của tôi */}
      <Route path="/salesman" element={<PrivateRoute element={<Salesman />} requiredRole="" />} />
      <Route path="/salesman/shop-settings" element={<PrivateRoute element={<Shopsettings />} requiredRole="" />} />
      <Route path="/salesman/shop-listproduct" element={<PrivateRoute element={<ListProductByIdShop />} requiredRole="" />} />
      <Route path="/salesman/shop-addproduct" element={<PrivateRoute element={<AddProducts />} requiredRole="" />} />



    </Routes>
  );
};

export default App;
