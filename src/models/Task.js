import { db } from "../lib/db.js";

async function findAll() {
    return (await db.execute("SELECT * FROM Task")).rows;
}

async function findById(id) {
    return (await db.execute("SELECT * FROM Task WHERE id = ?", [id])).rows[0];
}

async function findByProjectId(id) {
    return (await db.execute("SELECT * FROM Task WHERE project_id = ?", [id]))
        .rows;
}

async function create(data) {
    const result = await db.execute(
        "INSERT INTO Task (titolo, descrizione, project_id, user_id, stato, priorita, scadenza) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            data.titolo,
            data.descrizione,
            data.project_id,
            data.user_id,
            data.stato,
            data.priorita,
            data.scadenza,
        ],
    );
    return result;
}

async function update(id, data) {
    const result = await db.execute(
        "UPDATE Task SET titolo = ?, descrizione = ?, project_id = ?, user_id = ?, stato = ?, priorita = ?, scadenza = ? WHERE id = ?",
        [
            data.titolo,
            data.descrizione,
            data.project_id,
            data.user_id,
            data.stato,
            data.priorita,
            data.scadenza,
            id,
        ],
    );
    return result;
}

async function destroy(id) {
    const result = await db.execute("DELETE FROM Task WHERE id = ?", [id]);
    return result;
}

const Task = {
    findAll,
    findById,
    create,
    findByProjectId,
    destroy,
    update,
};

export default Task;
