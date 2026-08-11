import { db } from "../lib/db.js";

async function findAll() {
  const result = (await db.execute("SELECT * FROM User")).rows;
  return result;
}

async function findById(id) {
  const result = (await db.execute("SELECT * FROM User WHERE id = ?", [id]))
    .rows[0];
  return result;
}

async function findByEmail(email) {
  const result = (
    await db.execute("SELECT * FROM User WHERE email = ?", [email])
  ).rows[0];
  return result;
}

async function create(data) {
  const result = await db.execute(
    "INSERT INTO User (nome, email, password, ruolo) VALUES (?, ?, ?, ?)",
    [data.nome, data.email, data.password, data.ruolo],
  );
  return findById(Number(result.lastInsertRowid));
}

async function update(id, data) {
  const result = await db.execute(
    "UPDATE User SET nome = ?, email = ?, password = ?, ruolo = ? WHERE id = ?",
    [data.nome, data.email, data.password, data.ruolo, id],
  );
  return result;
}

async function destroy(id) {
  const result = await db.execute("DELETE FROM User WHERE id = ?", [id]);
  return result;
}

const User = {
  findAll,
  findById,
  findByEmail,
  create,
  destroy,
  update,
};

export default User;
