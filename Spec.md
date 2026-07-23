# TaskBoard API — Specifica funzionale backend

## Obiettivo
Creare un backend REST API per la gestione di team, progetti e attività lavorative.
Il sistema deve permettere agli utenti di registrarsi, autenticarsi, creare progetti, gestire attività e collaborare all’interno dei progetti.

# Funzionalità principali

---

## Gestione utenti

Il backend deve permettere di:
* creare nuovi utenti;
* recuperare la lista degli utenti;
* recuperare un utente specifico;
* aggiornare i dati di un utente;
* eliminare un utente;
* autenticare gli utenti tramite credenziali;
* gestire ruoli diversi per gli utenti.

Gli utenti devono avere:
* nome;
* email;
* password;
* ruolo.

Ruoli supportati:
* admin;
* member;
* viewer.

---

# Autenticazione e autorizzazione

Il backend deve supportare:
* login degli utenti;
* generazione di token di autenticazione;
* verifica dell'identità dell'utente nelle operazioni protette;
* controllo dei permessi basato sul ruolo.

Le operazioni disponibili devono dipendere dal ruolo dell'utente.

Esempi:
* un admin può gestire tutti gli utenti;
* un member può lavorare sui progetti a cui appartiene;
* un viewer può solamente consultare informazioni.

---

# Gestione progetti

Il backend deve permettere di:
* creare nuovi progetti;
* visualizzare tutti i progetti disponibili;
* visualizzare un singolo progetto;
* modificare un progetto;
* eliminare un progetto;
* associare utenti a un progetto;
* visualizzare gli utenti appartenenti a un progetto.

Ogni progetto deve contenere:
* nome;
* descrizione;
* proprietario;
* stato;
* data di creazione.

Gli stati disponibili sono:
* active;
* archived;
* deleted.

---

# Gestione task

Il backend deve permettere di:
* creare task all'interno di un progetto;
* visualizzare i task di un progetto;
* visualizzare un singolo task;
* modificare un task;
* eliminare un task;
* assegnare task agli utenti;
* cambiare stato e priorità dei task.

Ogni task deve contenere:
* titolo;
* descrizione;
* progetto associato;
* utente assegnato;
* stato;
* priorità;
* scadenza.

Stati disponibili:
* todo;
* doing;
* done.

Priorità disponibili:
* low;
* medium;
* high.

---

# Ricerca e filtraggio

Il backend deve supportare:
* ricerca utenti;
* filtro progetti per stato;
* filtro task per stato;
* filtro task per priorità;
* recupero task assegnati a uno specifico utente.

---

# Gestione errori

Il sistema deve:
* restituire risposte coerenti in caso di errore;
* gestire risorse non trovate;
* gestire dati non validi;
* gestire errori di autenticazione;
* gestire operazioni non autorizzate.

---

# Validazione dati

Il backend deve verificare:
* campi obbligatori;
* formato email;
* unicità degli utenti;
* correttezza degli stati;
* correttezza dei ruoli;
* correttezza delle relazioni tra entità.

---

# Cancellazione dati

Il sistema deve supportare la cancellazione delle risorse.
La cancellazione deve preservare la consistenza dei dati collegati tra:
* utenti;
* progetti;
* task.

---

# Persistenza dati

Il backend deve:
* salvare utenti, progetti e task;
* mantenere le relazioni tra entità;
* recuperare dati persistenti dopo il riavvio dell'applicazione.

---

# API REST
Devono essere disponibili endpoint per:
* utenti;
* autenticazione;
* progetti;
* task.

Le API devono supportare:
* creazione risorse;
* lettura risorse;
* modifica risorse;
* eliminazione risorse.

---
# Testing

Il progetto deve includere test automatici per verificare:
* creazione utenti;
* autenticazione;
* gestione progetti;
* gestione task;
* autorizzazioni;
* casi di errore.

---

# Documentazione
Il repository deve includere documentazione con:
* descrizione del progetto;
* istruzioni di avvio;
* configurazione necessaria;
* elenco delle API disponibili;
* esempi di utilizzo;
* informazioni sui ruoli utente.