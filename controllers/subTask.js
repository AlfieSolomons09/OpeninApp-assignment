import { Task } from "../models/task.js";

export const newSubtask = async (req, res) => {
    try {
        const { subTaskId } = req.body;
        const { taskId } = req.params;

        const task = await Task.findOne({ _id: taskId });

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found",
            })
        }

        const data = { sub_id: subTaskId, isCompleted: false };

        task.subtask.push(data);

        task.save();

        res.status(201).json({
            success: true,
            message: "SubTask added Successfully",
            task,
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const updateSubtask = async (req, res) => {
    try {
        const { taskId, subTaskId } = req.params;

        const task = await Task.findOne({ _id: taskId })

        let change
        task.subtask.map(item => {
            if (item.sub_id === subTaskId) {
                change = item.isCompleted;
                return;
            }
        });

        await Task.updateOne(
            { "_id": taskId, "subtask.sub_id": subTaskId },
            {
                $set: { "subtask.$.isCompleted": !change }
            }
        )

        res.json({
            success: true,
            message: "SubTask Updated Successfully",
            task,
        })
    } catch (error) {
        throw new Error(error);
    }
}

