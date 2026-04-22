// ============================================================
// server.js – Hlavní soubor Express serveru
// ============================================================
// Tento soubor je vstupní bod backendu. Dělá tyto věci:
//   1. Načte proměnné prostředí (.env soubor s Turso URL a tokenem)
//   2. Nastaví Express server s CORS a JSON parserem
//   3. Připojí API routes (endpointy pro knihy)
//   4. Inicializuje databázi a spustí server na portu 3001

// Načtení .env souboru – musí být úplně nahoře, aby byly proměnné
// dostupné všude v aplikaci (TURSO_DATABASE_URL, TURSO_AUTH_TOKEN)
require("dotenv").config();

// Importujeme Express framework – základ našeho serveru
const express = require("express");

// Importujeme CORS middleware – umožní frontendu (port 5173)
// komunikovat s backendem (port 3001) bez blokování prohlížečem
const cors = require("cors");

// Importujeme inicializační funkci databáze
const { initializeDatabase } = require("./db/database");

// Importujeme router s endpointy pro knihy
const booksRouter = require("./routes/books");

// Vytvoříme instanci Express aplikace
const app = express();

// Port, na kterém poběží server (výchozí 3001)
const PORT = process.env.PORT || 3001;

// ─── Middleware ──────────────────────────────
// Middleware jsou funkce, které se spustí před každým požadavkem

// CORS – povolí požadavky z jiné domény (frontend na portu 5173)
// Bez tohoto by prohlížeč blokoval komunikaci mezi frontendem a backendem
app.use(cors());

// JSON parser – automaticky převede tělo požadavku (body) z JSON řetězce
// na JavaScript objekt, abychom s ním mohli snadno pracovat
app.use(express.json());

// ─── Routes (cesty) ─────────────────────────
// Připojíme router s knihami na cestu /api/books
// Tzn. všechny endpointy v books.js budou dostupné pod /api/books/*
app.use("/api/books", booksRouter);

// Jednoduchý kořenový endpoint pro ověření, že server běží
app.get("/", (req, res) => {
  res.json({
    message: "📚 Seznam knih API běží!",
    endpoints: {
      "GET /api/books": "Načíst všechny knihy (+ filtrování: ?search=text)",
      "POST /api/books": "Přidat novou knihu",
      "PUT /api/books/:id": "Upravit knihu",
      "DELETE /api/books/:id": "Smazat knihu",
    },
  });
});

// ─── Spuštění serveru ───────────────────────
// Nejdřív inicializujeme databázi (vytvoříme tabulku),
// pak teprve spustíme server, aby API nefungovalo bez DB
async function startServer() {
  try {
    // Počkáme na inicializaci databáze
    await initializeDatabase();

    // Spustíme server na zvoleném portu
    app.listen(PORT, () => {
      console.log(`🚀 Server běží na http://localhost:${PORT}`);
      console.log(`📖 API knih: http://localhost:${PORT}/api/books`);
    });
  } catch (error) {
    console.error("💥 Server se nepodařilo spustit:", error.message);
    process.exit(1);
  }
}

// Zavoláme funkci pro start serveru
startServer();
