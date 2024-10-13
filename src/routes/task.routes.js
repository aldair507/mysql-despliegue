import { Router } from "express";
import { createTask, getTask, getTaskId } from "../controllers/task.controller.js";
import { authRequiered } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", authRequiered, createTask);
router.get("/tasks",authRequiered, getTask);
router.get('/tasks/:id',authRequiered, getTaskId)

export default router;
