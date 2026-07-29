import express from "express";
import userRoutes from "./src/routes/UserRoutes.js";
import projectRoutes from "./src/routes/ProjectRoutes.js";
import taskRoutes from "./src/routes/TaskRoutes.js";
import { createDatabase } from "./src/lib/db.js";
import path from "node:path";

const PORT = process.env.PORT || 3000;
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

// Inizializzazione database
createDatabase();

// GUI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

export default app;