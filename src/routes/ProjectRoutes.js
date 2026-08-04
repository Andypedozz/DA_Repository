import express from "express";
import ProjectController from "../controllers/ProjectController.js";
import { AuthMiddleware } from "../lib/auth.js";
import { isProjectOwnerOrAdmin } from "../lib/authorization.js";

const router  = express.Router();

// I progetti sono consultabili da qualsiasi utente autenticato
router.get("/", AuthMiddleware.authenticate, ProjectController.getAllProjects);
router.get("/:id", AuthMiddleware.authenticate, ProjectController.getProjectById);
// La creazione è consentita ad admin e member
router.post("/", AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin", "member"]), ProjectController.createProject);
// Modifica ed eliminazione solo per proprietario o admin
router.put("/:id", AuthMiddleware.authenticate, isProjectOwnerOrAdmin, ProjectController.updateProject);
router.delete("/:id", AuthMiddleware.authenticate, isProjectOwnerOrAdmin, ProjectController.deleteProject);

export default router;
