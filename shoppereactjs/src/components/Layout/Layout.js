import React from 'react';
import Sidebar from './Sidebar ';
import '../../App.scss';
const Layout = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('users'));
  const userName = user ? user.userName : 'Guest';

  return (
    <div className="dashboard">
            <Sidebar userName={userName} />
            <div className="dashboard-content">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
