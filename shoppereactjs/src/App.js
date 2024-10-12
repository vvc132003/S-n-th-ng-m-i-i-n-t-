import React from 'react';
import { Routes, Route } from 'react-router-dom';

///////////// admin ///////////////
// user 
import ListUser from './components/Admin/UserComponents/ListUser';
import Login from './components/Admin/UserComponents/Login';
import AddUser from './components/Admin/UserComponents/AddUser';
import EditUser from './components/Admin/UserComponents/EditUser';
//shop
import ListShop from './components/Admin/ShopComponents/ListShop';
import AddShop from './components/Admin/ShopComponents/AddShop';
import EditShop from './components/Admin/ShopComponents/EditShop';


// category
import ListCategory from './components/Admin/CategoryComponents/ListCategory';
import AddCategory from './components/Admin/CategoryComponents/AddCategory';
import EditCategory from './components/Admin/CategoryComponents/EditCategory';
// product
import ListProduct from './components/Admin/ProductComponents/ListProduct';
import AddProduct from './components/Admin/ProductComponents/AddProduct';
import ProductDetail from './components/Admin/ProductComponents/ProductDetail';

// cart
import ListCart from './components/Home/CartComponents/ListCart';


// ORDER
import ListOrder from './components/Home/OrderComponents/ListOrder';
import Purchase from './components/Home/OrderComponents/Purchase';



///////////// home ///////////////
// product
import CustomerHome from './components/Home/ProductComponents/CustomerHome ';




///////////// Salesman ///////////////
import Salesman from './components/Salesman/SalesmanComponents/Salesman';
import Shopsettings from './components/Salesman/SalesmanComponents/Shopsettings';
import ListProductByIdShop from './components/Salesman/SalesmanComponents/ListProductByIdShop';
import AddProducts from './components/Salesman/SalesmanComponents/AddProduct';
import Statistical from './components/Salesman/SalesmanComponents/Statistical';



import PrivateRoute from './components/hooks/PrivateRoute';
import Chat from './components/Home/Chat/Chat';
import ListPhong from './components/Admin/ProductComponents/ListPhong';
import SearchRoom from './components/Home/ProductComponents/SearchRoom';



const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/phong" element={<ListPhong />} />
      

      {/* <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} requiredRole="Quản lý" />} /> */}
      {/* <Route path="/admin/dashboard" element={<PrivateRoute element={<DashboardHome />} requiredRole="Quản lý" />} /> */}


      {/* admin  */}
      {/* user */}
      <Route path="/admin/user/listuser" element={<PrivateRoute element={<ListUser />} requiredRole="Quản lý" />} />
      <Route path="/admin/user/AddUser" element={<PrivateRoute element={<AddUser />} requiredRole="Quản lý" />} />
      <Route path="/admin/user/edituser" element={<EditUser />} requiredRole="Quản lý" />

      {/* shop */}
      <Route path="/admin/shop/listshop" element={<PrivateRoute element={<ListShop />} requiredRole="Quản lý" />} />
      <Route path="/admin/shop/addShop" element={<PrivateRoute element={<AddShop />} requiredRole="Quản lý" />} />
      <Route path="/admin/shop/editshop" element={<EditShop />} requiredRole="Quản lý" />

      {/* category */}
      <Route path="/admin/category/listcategory" element={<PrivateRoute element={<ListCategory />} requiredRole="Quản lý" />} />
      <Route path="/admin/category/addcategory" element={<PrivateRoute element={<AddCategory />} requiredRole="Quản lý" />} />
      <Route path="/admin/category/editcategory" element={<EditCategory />} requiredRole="Quản lý" />

      {/* product */}
      <Route path="/admin/product/listproduct" element={<PrivateRoute element={<ListProduct />} requiredRole="Quản lý" />} />
      <Route path="/admin/product/addProduct" element={<PrivateRoute element={<AddProduct />} requiredRole="Quản lý" />} />
     










      {/* home HOME */}
      <Route path="/" element={<PrivateRoute element={<CustomerHome />} requiredRole="" />} />

      {/* product */}
      <Route path="/home/product" element={<ProductDetail />} requiredRole="" />
      <Route path="/home/SearchRoom" element={<SearchRoom />} requiredRole="" />


      {/* cart */}
      <Route path="/cart/listCart" element={<PrivateRoute element={<ListCart />} requiredRole="" />} />

      {/* đặt hàng */}
      <Route path="/order/listorder" element={<PrivateRoute element={<ListOrder />} requiredRole="" />} />
      <Route path="/user/purchase" element={<PrivateRoute element={<Purchase />} requiredRole="" />} />


      {/* shop của tôi */}
      <Route path="/salesman" element={<PrivateRoute element={<Salesman />} requiredRole="" />} />
      <Route path="/salesman/shop-settings" element={<PrivateRoute element={<Shopsettings />} requiredRole="" />} />
      <Route path="/salesman/shop-listproduct" element={<PrivateRoute element={<ListProductByIdShop />} requiredRole="" />} />
      <Route path="/salesman/shop-addproduct" element={<PrivateRoute element={<AddProducts />} requiredRole="" />} />
      <Route path="/salesman/shop-statistical" element={<PrivateRoute element={<Statistical />} requiredRole="" />} />


      <Route path="/home/chat/chat" element={<PrivateRoute element={<Chat />} requiredRole="" />} />






    </Routes>
  );
};

export default App;
