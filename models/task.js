import mongoose from "mongoose"


// This is the schema for the task added in the todo
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isProcessing: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subtask: {
        type: [],
    },
    priority: {
        type: Number,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

export const Task = mongoose.model("Task", schema);