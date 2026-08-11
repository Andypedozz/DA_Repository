import Task from "../models/Task.js";

async function getAllTasks() {
    const tasks = await Task.findAll();
    return tasks;
}

async function getTaskById(id) {
    const task = await Task.findById(id);
    return task;
}

async function getTaskByProject(id) {
    const tasks = await Task.findByProjectId(id);
    return tasks;
}

async function createTask(data) {
    try {
        const task = await Task.create(data);
        return task;
    } catch (error) {
        return { message: "Errore durante la creazione del task" };
    }
}

async function updateTask(id, data) {
    try {
        const task = await Task.update(id, data);
        return task;
    } catch (error) {
        return { message: "Errore durante l'aggiornamento del task" };
    }
}

async function deleteTask(id) {
    try {
        const task = await Task.destroy(id);
        return task;
    } catch (error) {
        return { message: "Errore durante l'eliminazione del task" };
    }
}

const TaskService = {
    getAllTasks,
    getTaskById,
    getTaskByProject,
    createTask,
    updateTask,
    deleteTask,
};

export default TaskService;
