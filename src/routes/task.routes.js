import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskId,
  updateTask,
} from "../controllers/task.controller.js";
import { authRequiered } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", authRequiered, createTask);
router.get("/tasks", authRequiered, getTask);
router.get("/tasks/:id", authRequiered, getTaskId);
router.delete('/delete-task/:id',authRequiered,deleteTask)
router.put('/update/:id',authRequiered,updateTask)

export default router;
