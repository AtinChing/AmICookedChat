import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;