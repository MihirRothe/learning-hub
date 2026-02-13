import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-transparent p-4">
            <div className="bg-blue-50 p-6 rounded-full mb-6 text-primary animate-pulse">
                <FileQuestion size={64} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</h1>
            <p className="text-gray-500 mb-8 text-center max-w-md">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
            </p>
            <Link to="/" className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-200">
                <ArrowLeft size={18} />
                <span>Back to Dashboard</span>
            </Link>
        </div>
    );
};

export default NotFoundPage;
