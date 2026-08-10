import express from "express";
import TaskController from "../controllers/TaskController.js";
import { AuthMiddleware } from "../lib/auth.js";
import { canManageTask } from "../lib/authorization.js";

const router  = express.Router();

// I task sono consultabili da qualsiasi utente autenticato
router.get("/", AuthMiddleware.authenticate, TaskController.getAllTasks);
router.get("/:id", AuthMiddleware.authenticate, TaskController.getTaskById);
router.get("/project/:id", AuthMiddleware.authenticate, TaskController.getTasksByProjectId);
// La creazione è consentita ad admin e member
router.post("/", AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin", "member"]), TaskController.createTask);
// Modifica ed eliminazione per admin, utente assegnato o proprietario del progetto
router.put("/:id", AuthMiddleware.authenticate, canManageTask, TaskController.updateTask);
router.delete("/:id", AuthMiddleware.authenticate, canManageTask, TaskController.deleteTask);

export default router;
