import React from 'react';
import { useResources } from '../../context/ResourceContext';
import { Clock, Play, FileText, Video, Book, Monitor } from 'lucide-react';

const ContinueLearning: React.FC = () => {
    const { resources } = useResources();
    const inProgress = resources
        .filter(r => r.status === 'in_progress' || (r.status === 'not_started' && r.progress_percentage > 0))
        .slice(0, 3); // Show top 3

    if (inProgress.length === 0) return null;

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video size={24} className="text-primary" />;
            case 'article': return <FileText size={24} className="text-purple-500" />;
            case 'book': return <Book size={24} className="text-yellow-500" />;
            default: return <Monitor size={24} className="text-green-500" />;
        }
    };

    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Clock size={20} className="text-primary" />
                    Continue Learning
                </h2>
                <button className="text-primary font-semibold text-sm hover:underline">View History</button>
            </div>
            <div className="space-y-4">
                {inProgress.map(resource => (
                    <div key={resource._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                {resource.thumbnail_url ? (
                                    <img src={resource.thumbnail_url} alt="" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                    getIcon(resource.type)
                                )}
                            </div>
                            <div>
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">{resource.category}</span>
                                <h3 className="font-bold text-gray-800 text-lg">{resource.title}</h3>
                                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                                    <span className="flex items-center gap-1"><Clock size={14} /> {resource.estimated_time_hours ? `${resource.estimated_time_hours}h` : '20m'} remaining</span>
                                    {resource.lessons_total && (
                                        <span className="flex items-center gap-1"><FileText size={14} /> {resource.lessons_completed || 0}/{resource.lessons_total} Lessons</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="w-32">
                                <div className="text-right text-xs font-bold text-gray-400 mb-1">{resource.progress_percentage}%</div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: `${resource.progress_percentage}%` }}></div>
                                </div>
                            </div>
                            <button className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                                <Play size={20} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContinueLearning;
