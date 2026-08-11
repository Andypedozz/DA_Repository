import Task from "../models/Task.js";

async function getTaskById(req, res) {
    const id = req.params.id;
    const task = await Task.findById(id);
    res.json({ data: task });
}

async function getAllTasks(req, res) {
    const tasks = await Task.findAll();
    res.json({ data: tasks });
}

async function getTasksByProjectId(req, res) {
    const id = req.params.id;
    const tasks = await Task.findByProjectId(id);
    res.json({ data: tasks });
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
    getTasksByProjectId,
    createTask,
    updateTask,
    deleteTask,
};

export default TaskController;
