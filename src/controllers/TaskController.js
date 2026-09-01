import TaskService from "../services/TaskService.js";

async function getTaskById(req, res) {
    const id = req.params.id;
    const task = await TaskService.getTaskById(id);
    res.json({ data: task });
}

async function getAllTasks(req, res) {
    const tasks = await TaskService.getAllTasks();
    res.json({ data: tasks });
}

async function getTasksByProjectId(req, res) {
    const id = req.params.id;
    const tasks = await TaskService.getTaskByProject(id);
    res.json({ data: tasks });
}

async function createTask(req, res) {
    const data = req.body;
    await TaskService.createTask(data);
    res.json({ message: "Utente creato con successo" });
}

async function updateTask(req, res) {
    const id = req.params.id;
    const data = req.body;
    await TaskService.updateTask(id, data);
    res.json({ message: "Utente aggiornato con successo" });
}

async function deleteTask(req, res) {
    const id = req.params.id;
    await TaskService.deleteTask(id);
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
