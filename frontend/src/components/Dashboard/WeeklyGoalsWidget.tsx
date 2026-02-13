import React, { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const WeeklyGoalsWidget: React.FC = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Complete 3 quizzes', completed: true },
        { id: 2, text: 'Annotate Research Paper', completed: true },
        { id: 3, text: 'Prepare for Mock Exam', completed: false }
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = Math.round((completedCount / tasks.length) * 100);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800">Weekly Goals</h3>
                <span className="bg-blue-50 text-primary text-xs font-bold px-2 py-1 rounded-md">{progress}% Done</span>
            </div>

            <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32 flex items-center justify-center">
                    {/* Simplified Circular Progress for MVP */}
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="64" cy="64" r="56" stroke="#F3F4F6" strokeWidth="8" fill="none" />
                        <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="#4A90E2"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray="351.86"
                            strokeDashoffset={351.86 - (351.86 * progress) / 100}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute text-center">
                        <span className="block text-2xl font-bold text-gray-800">5/7</span>
                        <span className="text-[10px] uppercase text-gray-400 font-bold">Study Hours</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {tasks.map(task => (
                    <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center w-full space-x-3 text-left group"
                    >
                        {task.completed ? (
                            <CheckCircle2 size={20} className="text-primary" />
                        ) : (
                            <Circle size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
                        )}
                        <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>
                            {task.text}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WeeklyGoalsWidget;
