import Project from "../models/Project.js";
import Task from "../models/Task.js";

/**
 * Middleware che consente la modifica/eliminazione di un progetto
 * solo al proprietario o a un admin.
 */
async function isProjectOwnerOrAdmin(req, res, next) {
    try {
        if (req.user.role === "admin") {
            return next();
        }

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Progetto non trovato"
            });
        }

        if (project.user_id === req.user.id) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Permessi insufficienti"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

/**
 * Middleware che consente la gestione di un task
 * solo a un admin, all'utente assegnato o al proprietario del progetto.
 */
async function canManageTask(req, res, next) {
    try {
        if (req.user.role === "admin") {
            return next();
        }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task non trovato"
            });
        }

        if (task.utente_assegnato === req.user.id) {
            return next();
        }

        const project = await Project.findById(task.project_id);
        if (project && project.user_id === req.user.id) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Permessi insufficienti"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {
    isProjectOwnerOrAdmin,
    canManageTask
};
