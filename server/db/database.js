// ============================================================
// database.js – Připojení k Turso databázi a inicializace tabulky
// ============================================================
// Tento soubor se stará o dvě věci:
//   1. Vytvoří klienta (spojení) s Turso databází pomocí URL a tokenu
//   2. Při prvním spuštění založí tabulku "books", pokud ještě neexistuje
import { createClient } from "@libsql/client";

// Importujeme funkci createClient z knihovny @libsql/client
// Tato knihovna nám umožňuje komunikovat s Turso (libSQL) databází
const { createClient } = require("@libsql/client");

// Načteme proměnné prostředí ze souboru .env (URL databáze a auth token)
require("dotenv").config();

// Vytvoříme klienta pro komunikaci s Turso databází
// - url: adresa naší databáze na Turso (např. libsql://moje-db.turso.io)
// - authToken: bezpečnostní token pro ověření přístupu
const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Funkce pro inicializaci databáze – vytvoří tabulku "books" pokud neexistuje
// Voláme ji jednou při startu serveru, aby byla tabulka vždy připravená

async function initializeDatabase() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year INTEGER,
      genre TEXT,
      rating INTEGER,
      read INTEGER
    )
  `);
}

module.exports = {
  db,
  initializeDatabase,
};

// Exportujeme klienta databáze a inicializační funkci,
// aby je mohly používat ostatní části aplikace (routes, server)
module.exports = { db, initializeDatabase };
