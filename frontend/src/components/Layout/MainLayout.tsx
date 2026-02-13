import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 bg-white min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
