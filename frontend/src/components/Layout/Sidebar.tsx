import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Folder, Compass, Layers, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="w-64 bg-[#F5F7FA] h-screen fixed left-0 top-0 border-r border-gray-200 flex flex-col justify-between">
            <div>
                <div className="p-6 flex items-center space-x-2">
                    <div className="bg-primary text-white p-2 rounded-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    </div>
                    <span className="text-xl font-bold text-primary">L-Hub</span>
                </div>

                <nav className="px-4 space-y-2 mt-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-blue-50'}`
                        }
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/library"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-blue-50'}`
                        }
                    >
                        <Folder size={20} />
                        <span className="font-medium">My Library</span>
                    </NavLink>
                    <NavLink
                        to="/discover"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-blue-50'}`
                        }
                    >
                        <Compass size={20} />
                        <span className="font-medium">Discover</span>
                    </NavLink>
                    <NavLink
                        to="/collections"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-blue-50'}`
                        }
                    >
                        <Layers size={20} />
                        <span className="font-medium">Collections</span>
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-blue-50'}`
                        }
                    >
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </NavLink>
                </nav>
            </div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                    <img
                        src={user?.avatar_url || "https://ui-avatars.com/api/?name=" + (user?.name || "User") + "&background=random"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                        <p className="text-xs text-primary font-semibold uppercase">{user?.account_type === 'premium' ? 'Premium Student' : 'Free Student'}</p>
                    </div>
                </div>
                <button onClick={logout} className="w-full flex items-center justify-center space-x-2 text-gray-500 hover:text-red-500 py-2 transition-colors">
                    <LogOut size={16} />
                    <span className="text-sm font-medium">Log out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
