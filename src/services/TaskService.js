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
    const tasks = await Task.findByProject(id);
    return tasks;
}

async function createTask(data) {
    const task = await Task.create(data);
    return task;
}

async function updateTask(id, data) {
    const task = await Task.update(id, data);
    return task;
}

async function deleteTask(id) {
    const task = await Task.destroy(id);
    return task;
}

const TaskService = {
    getAllTasks,
    getTaskById,
    getTaskByProject,
    createTask,
    updateTask,
    deleteTask
}

export default TaskService;