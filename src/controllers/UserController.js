import User from "../models/User.js";

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  res.json({ data: user });
}

async function getAllUsers(req, res) {
  const users = await User.findAll();
  res.json({ data: users });
}

async function createUser(req, res) {
  const data = req.body;
  await User.create(data);
  res.json({ message: "Utente creato con successo" });
}

async function updateUser(req, res) {
  const id = req.params.id;
  const data = req.body;
  await User.update(id, data);
  res.json({ message: "Utente aggiornato con successo" });
}

async function deleteUser(req, res) {
  const id = req.params.id;
  await User.destroy(id);
  res.json({ message: "Utente eliminato con successo" });
}

const UserController = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default UserController;
