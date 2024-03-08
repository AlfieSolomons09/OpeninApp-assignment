import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
    try {
        const { title, description, due_date } = req.body;

        const current_date = Date.now();
        const due_date_ms = new Date(due_date).getTime();

        const date_diff = due_date_ms - current_date;

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const date_diff_days = Math.ceil(date_diff / millisecondsPerDay);

        let priority_of_task;

        if (date_diff_days == 0) {
            priority_of_task = 0;
        }
        else if (date_diff_days <= 2 && date_diff_days >= 1) {
            priority_of_task = 1;
        }
        else if (date_diff_days <= 4 && date_diff_days >= 3) {
            priority_of_task = 2;
        }
        else if (date_diff_days >= 5) {
            priority_of_task = 3;
        }

        await Task.create({
            title,
            description,
            due_date,
            user: req.user,
            subtask: [],
            isCompleted: false,
            isProcessing: false,
            priority: priority_of_task
        });

        res.status(201).json({
            success: true,
            message: "Task added Successfully",
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({ user: userid });

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        let count = 0;

        task.subtask.map(item => {
            if (item.isCompleted === true) {
                count++;
            }
        })

        if (count == task.subtask.length) {
            task.isCompleted = true;
        }
        else {
            task.isCompleted = false;
        }

        if (count >= 1) {
            task.isProcessing = true;
        }
        else {
            task.isProcessing = false;
        }

        task.save();

        res.status(200).json({
            success: true,
            isCompleted: task.isCompleted,
            isProcessing: task.isProcessing,
        })
    } catch (error) {
        throw new Error(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        const task = await Task.find({ _id: id });

        if (!task) {
            res.status(401).json({
                success: true,
                message: "Task does not exist"
            })
        }

        await Task.deleteOne({
            _id: id
        })

        res.status(200).json({
            success: true,
        })
    } catch (error) {
        throw new Error(error);
    }
}