import express from 'express'
import { newSubtask, updateSubtask } from '../controllers/subTask.js';

const router = express.Router();

router.post("/:taskId/createsubtask", newSubtask)

router.put("/:taskId/updateSubTask/:subTaskId", updateSubtask);

export default router;