import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
    task_id: string; // generated UUID usually
    description: string;
    completed: boolean;
    completed_at?: Date;
}

export interface IGoal extends Document {
    user_id: mongoose.Types.ObjectId;
    week_start_date: Date;
    week_end_date: Date;
    study_hours_goal: number;
    study_hours_completed: number;
    tasks: ITask[];
    created_at: Date;
}

const TaskSchema = new Schema({
    task_id: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completed_at: { type: Date }
});

const GoalSchema: Schema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    week_start_date: { type: Date, required: true },
    week_end_date: { type: Date, required: true },
    study_hours_goal: { type: Number, default: 7 },
    study_hours_completed: { type: Number, default: 0 },
    tasks: [TaskSchema],
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model<IGoal>('Goal', GoalSchema);
