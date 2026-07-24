import { db } from "../lib/db.js";

async function findAll() {
    const result = (await db.execute("SELECT * FROM Project")).rows;
    return result;
}

async function findById(id) {
    return (await db.execute("SELECT * FROM Project WHERE id = ?", [id])).rows[0];
}

async function create(data) {
    const result = await db.execute("INSERT INTO Project (nome, descrizione, user_id, stato, data_creazione) VALUES (?, ?, ?, ?, ?)", [data.nome, data.descrizione, data.user_id, data.stato, data.data_creazione]);
    return result;
}

async function update(id, data) {
    const result = await db.execute("UPDATE Project SET nome = ?, descrizione = ?, user_id = ?, stato = ?, data_creazione = ? WHERE id = ?", [data.nome, data.descrizione, data.user_id, data.stato, data.data_creazione, id]);
    return result;
}

async function destroy(id) {
    const result = await db.execute("DELETE FROM Project WHERE id = ?", [id]);
    return result;
}

const Project = {
    findAll,
    findById,
    create,
    destroy,
    update,
};

export default Project;