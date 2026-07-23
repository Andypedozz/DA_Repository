
import { db } from "../lib/db";

async function findAll() {
    await db.select("*").from("Project");
}

async function findById(id) {
    await db.select("*").from("Project").where("id", id);
}

async function create(data) {
    await db.insert(data).into("Project");
}

async function update(id, data) {
    await db.update(data).from("Project").where("id", id);
}

async function destroy(id) {
    await db.delete().from("Project").where("id", id);
}

export const Project = {
    findAll,
    findById,
    create,
    destroy,
    update,
};