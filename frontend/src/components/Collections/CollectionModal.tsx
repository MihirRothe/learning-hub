import React, { useState } from 'react';
import { useCollections } from '../../context/CollectionContext';
import { X } from 'lucide-react';

interface CollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CollectionModal: React.FC<CollectionModalProps> = ({ isOpen, onClose }) => {
    const { createCollection } = useCollections();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCollection({ name, description, is_public: isPublic });
            setName('');
            setDescription('');
            setIsPublic(false);
            onClose();
        } catch (error) {
            console.error('Failed to create collection', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Create New Collection</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Collection Name *</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Web Development Mastery"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What's this collection about?"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isPublic"
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            checked={isPublic}
                            onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        <label htmlFor="isPublic" className="text-sm text-gray-700">Make this collection public</label>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-colors"
                        >
                            Create Collection
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CollectionModal;
