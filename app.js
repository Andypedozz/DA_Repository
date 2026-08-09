import express from "express";
import userRoutes from "./src/routes/UserRoutes.js";
import projectRoutes from "./src/routes/ProjectRoutes.js";
import taskRoutes from "./src/routes/TaskRoutes.js"
import authRoutes from "./src/routes/AuthRoutes.js";
import { createDatabase } from "./src/lib/db.js";
import path from "node:path";

const app = express();
const __dirname = process.cwd();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*********************************************/
/*                 ROUTES                    */
/*********************************************/

// Utenti
app.use("/users", userRoutes);

// Progetti
app.use("/projects", projectRoutes);

// Tasks
app.use("/tasks", taskRoutes);

// Authentication
app.use("/auth", authRoutes);

// Inizializzazione database
createDatabase();

// GUI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

export default app;
