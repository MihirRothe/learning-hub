import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import WelcomeSection from '../components/Dashboard/WelcomeSection';
import ContinueLearning from '../components/Dashboard/ContinueLearning';
import WeeklyGoalsWidget from '../components/Dashboard/WeeklyGoalsWidget';
import { ResourceProvider } from '../context/ResourceContext';
import AddResourceModal from '../components/Resources/AddResourceModal';
import { Loader2 } from 'lucide-react';

const DashboardPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recommendedCollections, setRecommendedCollections] = useState<any[]>([]);
    const [recentResources, setRecentResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // authentication context

    useEffect(() => {
        const fetchDiscovery = async () => {
            if (!user) return;
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };

                const [recRes, recentRes] = await Promise.all([
                    axios.get('/api/discovery/recommended', config),
                    axios.get('/api/discovery/recent', config)
                ]);

                setRecommendedCollections(Array.isArray(recRes.data) ? recRes.data : []);
                setRecentResources(Array.isArray(recentRes.data) ? recentRes.data : []);
            } catch (error) {
                console.error('Error fetching discovery data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscovery();
    }, [user]);

    return (
        <ResourceProvider>
            <div className="flex gap-8">
                <div className="flex-1">
                    <WelcomeSection onAddResource={() => setIsModalOpen(true)} />
                    <ContinueLearning />

                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Explore Collections</h2>
                        </div>
                        {loading ? (
                            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
                        ) : (
                            <div className="grid gap-4">
                                {recommendedCollections.length > 0 ? (
                                    recommendedCollections.map((col, index) => (
                                        <div key={col._id || index} className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-4 last:mb-0">
                                            <h3 className="font-bold text-primary text-lg mb-2">{col.name}</h3>
                                            <p className="text-gray-600 mb-4">{col.description || 'No description'}</p>
                                            <div className="flex -space-x-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                                                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                                                {col.contributor_count > 2 && (
                                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold border-2 border-white">+{col.contributor_count - 2}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-gray-500">
                                        No recommended collections yet.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Recently Added</h2>
                        </div>
                        {loading ? (
                            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-primary" /></div>
                        ) : (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                {recentResources.length > 0 ? (
                                    <ul className="space-y-3">
                                        {recentResources.map(res => (
                                            <li key={res._id} className="flex justify-between items-center border-b border-gray-50 last:border-0 pb-2 last:pb-0">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{res.title}</h4>
                                                    <p className="text-xs text-gray-500">{res.category} • {res.type}</p>
                                                </div>
                                                <span className="text-xs font-semibold text-primary">{res.status.replace('_', ' ')}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No recent resources.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="w-80 flex-shrink-0">
                    <WeeklyGoalsWidget />

                    <div className="bg-primary rounded-xl p-6 text-white shadow-lg shadow-blue-200">
                        <div className="mb-4 bg-white/20 w-10 h-10 rounded-lg flex items-center justify-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                        </div>
                        <h3 className="font-bold text-lg mb-1">Unlock Unlimited Collections</h3>
                        <p className="text-blue-100 text-sm mb-4">Get access to offline mode and advanced analytics.</p>
                        <button className="w-full bg-white text-primary font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                            Get Pro Now
                        </button>
                    </div>
                </div>
            </div>
            <AddResourceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </ResourceProvider>
    );
};

export default DashboardPage;
