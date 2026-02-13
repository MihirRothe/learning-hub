import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { User, Mail, Lock, Save, Loader2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

const SettingsPage: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user?.token}` }
            };

            const payload: any = { name, email, avatar_url: avatarUrl };
            if (password) payload.password = password;

            const { data } = await axios.put('/api/auth/profile', payload, config);

            updateUser(data);
            toast.success('Profile updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex items-center space-x-6 mb-8">
                        <div className="relative">
                            <img
                                src={avatarUrl || `https://ui-avatars.com/api/?name=${name}&background=random`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
                            />
                            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors shadow-sm">
                                <Camera size={16} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
                            <p className="text-gray-500">{user?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wide">
                                {user?.account_type} Plan
                            </span>
                        </div>
                    </div>



                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                    <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                    <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar URL</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={avatarUrl}
                                    onChange={(e) => setAvatarUrl(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                                <Camera className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Paste a direct link to an image for your profile picture.</p>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Change Password</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Leave blank to keep current"
                                        />
                                        <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Confirm new password"
                                        />
                                        <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center space-x-2 bg-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                            >
                                {loading && <Loader2 className="animate-spin" size={18} />}
                                <span>Save Changes</span>
                                {!loading && <Save size={18} />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
