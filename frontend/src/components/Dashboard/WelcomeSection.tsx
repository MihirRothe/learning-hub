import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, Plus } from 'lucide-react';

const WelcomeSection: React.FC<{ onAddResource: () => void }> = ({ onAddResource }) => {
    const { user } = useAuth();

    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name.split(' ')[0]}!</h1>
                <p className="text-gray-500 mt-1">You've completed <span className="font-bold text-primary">0 resources</span> this week. Keep up the momentum!</p>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 bg-white rounded-full shadow-sm border border-gray-100 text-gray-400 hover:text-primary transition-colors">
                    <Bell size={20} />
                </button>
                <button
                    onClick={onAddResource}
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors shadow-md hover:shadow-lg"
                >
                    <Plus size={20} />
                    <span>Add Resource</span>
                </button>
            </div>
        </div>
    );
};

export default WelcomeSection;
