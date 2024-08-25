// src/components/hooks/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, requiredRole }) => {
    const user = JSON.parse(sessionStorage.getItem('users'));

    // Nếu không có người dùng (chưa đăng nhập) và requiredRole là chuỗi rỗng
    if (!user && requiredRole !== "") {
        return <Navigate to="/" />; // Chuyển hướng đến CustomerHome
    }

    // Nếu có yêu cầu về vai trò và người dùng không có vai trò phù hợp
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />;
    }

    return <>{element}</>; // Render component nếu người dùng có quyền hợp lệ
};

export default PrivateRoute;
