import ProjectService from "../services/ProjectService.js";

async function getAllProjects(req, res) {
  const projects = await ProjectService.getAllProjects();
  res.json({ data: projects });
}

async function getProjectById(req, res) {
  const id = req.params.id;
  const project = await ProjectService.getProjectById(id);
  res.json({ data: project });
}

async function createProject(req, res) {
  const data = req.body;
  await ProjectService.createProject(data);
  res.json({ message: "Progetto creato con successo" });
}

async function updateProject(req, res) {
  const id = req.params.id;
  const data = req.body;
  await ProjectService.updateProject(id, data);
  res.json({ message: "Progetto aggiornato con successo" });
}

async function deleteProject(req, res) {
  const id = req.params.id;
  await ProjectService.deleteProject(id);
  res.json({ message: "Progetto eliminato con successo" });
}

const ProjectController = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

export default ProjectController;
