
import { db } from "../lib/db";

async function findAll() {
    await db.select("*").from("Task");
}

async function findById(id) {
    await db.select("*").from("Task").where("id", id);
}

async function create(data) {
    await db.insert(data).into("Task");
}

async function update(id, data) {
    await db.update(data).from("Task").where("id", id);
}

async function destroy(id) {
    await db.delete().from("Task").where("id", id);
}

export const Task = {
    findAll,
    findById,
    create,
    destroy,
    update,
};