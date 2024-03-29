import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import subTaskRouter from "./routes/subTask.js";
import {config} from 'dotenv'
import cookieParser from "cookie-parser";

export const app = express();

config({
    path: "./data/config.env"
})

// using middleware
app.use(express.json());
app.use(cookieParser());

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/task", subTaskRouter)

// Home page 
app.get("/", (req, res) => {
    res.send("Working");
})

