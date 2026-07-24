import Project from "../models/Project.js";

async function getAllProjects(req, res) {
    const projects = await Project.findAll();
    res.json(projects);
}

async function getProjectById(req, res) {
    const id = req.params.id;
    const project = await Project.findById(id);
    res.json(project);
}

async function createProject(req, res) {
    const data = req.body;
    await Project.create(data);
    res.json({ message: "Progetto creato con successo" });
}

async function updateProject(req, res) {
    const id = req.params.id;
    const data = req.body;
    await Project.update(id, data);
    res.json({ message: "Progetto aggiornato con successo" });
}

async function deleteProject(req, res) {
    const id = req.params.id;
    await Project.destroy(id);
    res.json({ message: "Progetto eliminato con successo" });
}

const ProjectController = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};

export default ProjectController;