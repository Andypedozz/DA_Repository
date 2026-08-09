CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    ruolo TEXT NOT NULL
)

CREATE TABLE IF NOT EXISTS Project (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descrizione TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    stato TEXT NOT NULL CHECK (stato IN ('active', 'archived', 'deleted')),
    data_creazione TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id)
)

CREATE TABLE IF NOT EXISTS Task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titolo TEXT NOT NULL DEFAULT '',
    descrizione TEXT NOT NULL,
    project_id INTEGER NOT NULL,
    utente_assegnato INTEGER NOT NULL,
    stato TEXT NOT NULL CHECK (stato IN ('todo', 'doing', 'done')),
    priorita TEXT NOT NULL CHECK (priorita IN ('low', 'medium', 'high')),
    scadenza TEXT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Project(id)
)
