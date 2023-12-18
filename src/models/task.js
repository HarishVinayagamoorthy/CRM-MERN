import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId },
    status: { type: String, default: 'Pending' },
    frontendUrl: { type: String },
    backendUrl: { type: String },
    createdAt: { type: Date, default: Date.now() },
});


const Task = mongoose.model('Tasks', taskSchema);

export default Task;
