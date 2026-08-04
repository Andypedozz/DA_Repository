import express from "express";
import UserController from "../controllers/UserController.js";
import { AuthMiddleware } from "../lib/auth.js";

const router  = express.Router();

// Solo gli admin possono gestire gli utenti
router.get("/", AuthMiddleware.authenticate, UserController.getAllUsers);
router.get("/:id", AuthMiddleware.authenticate, UserController.getUserById);
router.post("/", AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin"]), UserController.createUser);
router.put("/:id", AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin"]), UserController.updateUser);
router.delete("/:id", AuthMiddleware.authenticate, AuthMiddleware.authorize(["admin"]), UserController.deleteUser);

export default router;
