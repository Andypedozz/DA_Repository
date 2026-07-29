
import Task from "../models/Task.js";

async function getTaskById(req, res) {
    const id = req.params.id;
    const user = await Task.findById(id);
    res.json(user);
}

async function getAllTasks(req, res) {
    const users = await Task.findAll();
    res.json(users);
}

async function getTasksByProject(req, res) {
    const id = req.params.id;
    const tasks = await Task.findByProject(id);
    res.json(tasks);
}

async function createTask(req, res) {
    const data = req.body;
    await Task.create(data);
    res.json({ message: "Utente creato con successo" });
}

async function updateTask(req, res) {
    const id = req.params.id;
    const data = req.body;
    await Task.update(id, data);
    res.json({ message: "Utente aggiornato con successo" });
}

async function deleteTask(req, res) {
    const id = req.params.id;
    await Task.destroy(id);
    res.json({ message: "Utente eliminato con successo" });
}

const TaskController = {
    getTaskById,
    getAllTasks,
    getTasksByProject,
    createTask,
    updateTask,
    deleteTask
}

export default TaskController;