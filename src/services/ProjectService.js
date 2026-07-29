import Project from "../models/Project.js";

async function getAllProjects() {
    try {
        const projects = await Project.findAll();
        return projects;
    } catch (error) {

    } 
}

async function getProjectById(id) {
    try {
        const project = await Project.findById(id);

        return project;
    } catch (error) {
        
    }
}

async function createProject(data) {
    try {
        await Project.create(data);
        return { message: "Progetto creato con successo" };
    } catch (error) {
        return { message: "Errore durante la creazione del progetto" };
    }
}

async function updateProject(id, data) {
    try {
        await Project.update(id, data);
        return { message: "Progetto aggiornato con successo" };
    } catch (error) {
        return { message: "Errore durante l'aggiornamento del progetto" };
    }
}

async function deleteProject(id) {
    try {
        await Project.destroy(id);
        return { message: "Progetto eliminato con successo" };
    } catch (error) {
        return { message: "Errore durante l'eliminazione del progetto" };
    }
}

const ProjectService = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};

export default ProjectService;