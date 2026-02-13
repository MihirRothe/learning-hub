import React from 'react';

const CollectionsPage: React.FC = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Collections</h1>
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-secondary transition-colors">
                    Create Collection
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Placeholder Collections */}
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="h-40 bg-gray-200 relative">
                            {/* Placeholder Cover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                                <h3 className="text-white font-bold text-xl group-hover:underline">Machine Learning Paths</h3>
                            </div>
                        </div>
                        <div className="p-5">
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">A comprehensive guide to starting with ML, covering basic math to advanced neural networks.</p>
                            <div className="flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase">12 Resources</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Create New Card */}
                <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 h-full min-h-[300px] hover:border-primary hover:bg-blue-50 transition-colors cursor-pointer text-gray-400 hover:text-primary">
                    <span className="text-4xl mb-2">+</span>
                    <span className="font-bold">Create New Collection</span>
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
