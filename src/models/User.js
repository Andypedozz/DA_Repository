
import { db } from "../lib/db";

async function findAll() {
    await db.select("*").from("User");
}

async function findById(id) {
    await db.select("*").from("User").where("id", id);
}

async function create(data) {
    await db.insert(data).into("User");
}

async function update(id, data) {
    await db.update(data).from("User").where("id", id);
}

async function destroy(id) {
    await db.delete().from("User").where("id", id);
}

export const User = {
    findAll,
    findById,
    create,
    destroy,
    update
};