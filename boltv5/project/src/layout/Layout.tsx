import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import MainPanel from '../components/MainPanel/MainPanel';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-sans text-gray-900">
      <Sidebar />
      <div className="flex-1 ml-64">
        <MainPanel />
      </div>
    </div>
  );
};

export default Layout;