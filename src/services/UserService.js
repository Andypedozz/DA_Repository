import User from "../models/User";

async function getAllUsers() {
    const users = await User.findAll();
    return users;
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user;
}

async function createUser(data) {
    await User.create(data);
    return { message: "Utente creato con successo" };
}

async function updateUser(id, data) {
    await User.update(id, data);
    return { message: "Utente aggiornato con successo" };
}

async function deleteUser(id) {
    await User.destroy(id);
    return { message: "Utente eliminato con successo" };
}

const UserService = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}

export default UserService;