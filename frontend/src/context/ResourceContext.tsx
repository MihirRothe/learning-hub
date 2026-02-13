import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export interface Resource {
    _id: string;
    title: string;
    type: string;
    category: string;
    url?: string;
    description?: string;
    progress_percentage: number;
    lessons_total?: number;
    lessons_completed?: number;
    status: string;
    thumbnail_url?: string;
    estimated_time_hours?: number;
}

interface ResourceContextType {
    resources: Resource[];
    loading: boolean;
    fetchResources: (search?: string) => Promise<void>;
    addResource: (data: Partial<Resource>) => Promise<void>;
    updateResource: (id: string, data: Partial<Resource>) => Promise<void>;
    updateResourceProgress: (id: string, progress: number) => Promise<void>;
    deleteResource: (id: string) => Promise<void>;
}

const ResourceContext = createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchResources = async (search: string = '') => {
        if (!user) return;
        try {
            const { data } = await axios.get(`/api/resources${search ? `?search=${search}` : ''}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setResources(data);
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResources();
    }, [user]);

    const addResource = async (resourceData: Partial<Resource>) => {
        if (!user) return;
        try {
            const { data } = await axios.post('/api/resources', resourceData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setResources([data, ...resources]);
        } catch (error) {
            console.error('Error adding resource:', error);
            throw error;
        }
    };

    const updateResource = async (id: string, resourceData: Partial<Resource>) => {
        if (!user) return;
        try {
            const { data } = await axios.put(`/api/resources/${id}`, resourceData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setResources(resources.map(r => r._id === id ? data : r));
        } catch (error) {
            console.error('Error updating resource:', error);
            throw error;
        }
    };

    const updateResourceProgress = async (id: string, progress: number) => {
        if (!user) return;
        try {
            const { data } = await axios.patch(`/api/resources/${id}/progress`, { progress }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setResources(resources.map(r => r._id === id ? data : r));
        } catch (error) {
            console.error('Error updating resource progress:', error);
            throw error;
        }
    };

    const deleteResource = async (id: string) => {
        if (!user) return;
        try {
            await axios.delete(`/api/resources/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setResources(resources.filter(r => r._id !== id));
        } catch (error) {
            console.error('Error deleting resource:', error);
            throw error;
        }
    };

    return (
        <ResourceContext.Provider value={{ resources, loading, fetchResources, addResource, updateResource, updateResourceProgress, deleteResource }}>
            {children}
        </ResourceContext.Provider>
    );
};

export const useResources = () => {
    const context = useContext(ResourceContext);
    if (!context) {
        throw new Error('useResources must be used within a ResourceProvider');
    }
    return context;
};
