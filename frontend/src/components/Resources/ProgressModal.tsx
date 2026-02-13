import React, { useState, useEffect } from 'react';
import { useResources } from '../../context/ResourceContext';
import { X } from 'lucide-react';

interface ProgressModalProps {
    isOpen: boolean;
    onClose: () => void;
    resourceId: string;
    currentProgress: number;
    title: string;
}

const ProgressModal: React.FC<ProgressModalProps> = ({ isOpen, onClose, resourceId, currentProgress, title }) => {
    const { updateResourceProgress } = useResources();
    const [progress, setProgress] = useState(currentProgress);

    useEffect(() => {
        setProgress(currentProgress);
    }, [currentProgress, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateResourceProgress(resourceId, progress);
            onClose();
        } catch (error) {
            console.error('Failed to update progress', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Update Progress</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-4">Update progress for <span className="font-semibold text-gray-800">{title}</span></p>

                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                            <span>0%</span>
                            <span className="text-primary font-bold">{progress}%</span>
                            <span>100%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            value={progress}
                            onChange={(e) => setProgress(Number(e.target.value))}
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
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
                            Save Progress
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProgressModal;
