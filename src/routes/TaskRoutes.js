import express from "express";
import TaskController from "../controllers/TaskController.js";

const router  = express.Router();

router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById)
router.get("/project/:id", TaskController.getTasksByProject);
router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;