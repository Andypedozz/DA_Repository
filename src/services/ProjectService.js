import Project from "../models/Project.js";

async function getAllProjects() {
    const projects = await Project.findAll();
    return projects;
}

async function getProjectById(id) {
    const project = await Project.findById(id);
    return project;
}

async function createProject(data) {
    await Project.create(data);
    return { message: "Progetto creato con successo" };
}

async function updateProject(id, data) {
    await Project.update(id, data);
    return { message: "Progetto aggiornato con successo" };
}

async function deleteProject(id) {
    await Project.destroy(id);
    return { message: "Progetto eliminato con successo" };
}

const ProjectService = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};

export default ProjectService;