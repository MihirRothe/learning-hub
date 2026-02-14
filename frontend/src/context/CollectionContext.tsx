import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

export interface Collection {
    _id: string;
    name: string;
    description?: string;
    is_public: boolean;
    resource_ids: any[]; // Could be strings or populated objects
    created_at: string;
    contributor_count?: number;
}

interface CollectionContextType {
    collections: Collection[];
    loading: boolean;
    fetchCollections: () => Promise<void>;
    createCollection: (data: Partial<Collection>) => Promise<void>;
    addResourceToCollection: (collectionId: string, resourceId: string) => Promise<void>;
    removeResourceFromCollection: (collectionId: string, resourceId: string) => Promise<void>;
    deleteCollection: (id: string) => Promise<void>;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchCollections = useCallback(async () => {
        if (!user) return;
        try {
            const { data } = await axios.get('/api/collections', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCollections(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching collections:', error);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchCollections();
    }, [fetchCollections]);

    const createCollection = async (collectionData: Partial<Collection>) => {
        if (!user) return;
        try {
            const { data } = await axios.post('/api/collections', collectionData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCollections([data, ...collections]);
        } catch (error) {
            console.error('Error creating collection:', error);
            throw error;
        }
    };

    const addResourceToCollection = async (collectionId: string, resourceId: string) => {
        if (!user) return;
        try {
            await axios.post(`/api/collections/${collectionId}/resources`, { resourceId }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            // Optionally refetch or update local state
            fetchCollections();
        } catch (error) {
            console.error('Error adding resource to collection:', error);
            throw error;
        }
    };

    const removeResourceFromCollection = async (collectionId: string, resourceId: string) => {
        if (!user) return;
        try {
            await axios.delete(`/api/collections/${collectionId}/resources/${resourceId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchCollections();
        } catch (error) {
            console.error('Error removing resource from collection:', error);
            throw error;
        }
    };

    const deleteCollection = async (id: string) => {
        if (!user) return;
        try {
            await axios.delete(`/api/collections/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCollections(collections.filter(c => c._id !== id));
        } catch (error) {
            console.error('Error deleting collection:', error);
            throw error;
        }
    };

    return (
        <CollectionContext.Provider value={{ collections, loading, fetchCollections, createCollection, addResourceToCollection, removeResourceFromCollection, deleteCollection }}>
            {children}
        </CollectionContext.Provider>
    );
};

export const useCollections = () => {
    const context = useContext(CollectionContext);
    if (!context) {
        throw new Error('useCollections must be used within a CollectionProvider');
    }
    return context;
};
