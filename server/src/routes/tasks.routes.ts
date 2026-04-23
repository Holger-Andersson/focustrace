import { Router } from "express";
import { getTasks, createTask, toggleTaskCompleted, deleteTask } from "../controllers/tasks.controller"


const router = Router();

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", toggleTaskCompleted);

router.delete("/:id", deleteTask);

export default router;