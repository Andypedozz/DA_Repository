import express from "express";
import userRoutes from "./src/routes/UserRoutes.js";
import projectRoutes from "./src/routes/ProjectRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

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

// Autenticazione e autorizzazione
app.use("/auth", authRoutes);

export default app;