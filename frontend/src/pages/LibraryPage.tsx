import React, { useState, useEffect } from 'react';
import { useResources } from '../context/ResourceContext';
import { useCollections } from '../context/CollectionContext';
import { Search, MoreVertical, ExternalLink, Trash2, FolderPlus } from 'lucide-react';
import ProgressModal from '../components/Resources/ProgressModal';
import CollectionModal from '../components/Collections/CollectionModal';

const LibraryPage: React.FC = () => {
    const { resources, fetchResources, deleteResource, loading } = useResources();
    const { collections, addResourceToCollection } = useCollections();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [selectedResource, setSelectedResource] = useState<{ id: string, progress: number, title: string } | null>(null);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Debounce search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchResources(searchTerm);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchResources]);

    const filteredResources = resources.filter(r => {
        // Only clientside filter for category now, search is server-side
        const matchesCategory = filterCategory === 'All' || r.category === filterCategory;
        return matchesCategory;
    });

    const categories = ['All', ...new Set(resources.map(r => r.category))];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Library</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none w-64"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                    <button
                        onClick={() => setIsCollectionModalOpen(true)}
                        className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        <FolderPlus size={18} />
                        <span>New Collection</span>
                    </button>
                </div>
            </div>

            <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${filterCategory === cat
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-64 flex flex-col">
                            <div className="flex justify-between mb-4">
                                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-auto"></div>
                            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <div key={resource._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                    {resource.type}
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === resource._id ? null : resource._id)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {activeDropdown === resource._id && (
                                        <div className="absolute right-0 top-6 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10 py-1">
                                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                                                Add to Collection
                                            </div>
                                            {collections.length > 0 ? (
                                                collections.map(col => (
                                                    <button
                                                        key={col._id}
                                                        onClick={() => {
                                                            addResourceToCollection(col._id, resource._id);
                                                            setActiveDropdown(null);
                                                        }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors flex items-center justify-between"
                                                    >
                                                        <span className="truncate">{col.name}</span>
                                                        {col.resource_ids.some((rid: any) => (typeof rid === 'string' ? rid : rid._id) === resource._id) && (
                                                            <span className="text-secondary text-xs">Added</span>
                                                        )}
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-400 italic">No collections</div>
                                            )}
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={() => deleteResource(resource._id)}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                                            >
                                                <Trash2 size={14} />
                                                <span>Delete Resource</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 h-14">{resource.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">{resource.description || 'No description provided.'}</p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                <div className="text-xs font-semibold text-gray-400">
                                    {resource.category}
                                </div>
                                {resource.url && (
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-primary hover:underline text-sm font-medium">
                                        <span>Open</span>
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-500">Progress</span>
                                        <button
                                            onClick={() => {
                                                setSelectedResource({ id: resource._id, progress: resource.progress_percentage, title: resource.title });
                                                setIsProgressModalOpen(true);
                                            }}
                                            className="text-xs text-primary font-semibold hover:underline flex items-center"
                                        >
                                            Update
                                        </button>
                                    </div>
                                    <span className="font-bold text-gray-700">{resource.progress_percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${resource.progress_percentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && filteredResources.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg">No resources found matching your criteria.</p>
                </div>
            )}

            {selectedResource && (
                <ProgressModal
                    isOpen={isProgressModalOpen}
                    onClose={() => setIsProgressModalOpen(false)}
                    resourceId={selectedResource.id}
                    currentProgress={selectedResource.progress}
                    title={selectedResource.title}
                />
            )}

            <CollectionModal
                isOpen={isCollectionModalOpen}
                onClose={() => setIsCollectionModalOpen(false)}
            />
        </div>
    );
};

export default LibraryPage;
