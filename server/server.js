// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");

// 👉 импорт твоих модулей
const booksRouter = require("./routes/books");
const { initializeDatabase } = require("./db/database");

const app = express();

// ✅ ВАЖНО для Render
const PORT = process.env.PORT || 3001;

// ─── Middlewares ─────────────────────────
app.use(cors());
app.use(express.json());

// ─── API Routes ──────────────────────────
app.use("/api/books", booksRouter);

// ─── Проверка сервера ────────────────────
app.get("/api", (req, res) => {
  res.json({
    message: "📚 Seznam knih API běží!",
    endpoints: {
      "GET /api/books": "Načíst všechny knihy (+ ?search=text)",
      "POST /api/books": "Přidat novou knihu",
      "PUT /api/books/:id": "Upravit knihu",
      "DELETE /api/books/:id": "Smazat knihu",
    },
  });
});

// ─── React build (если есть фронт) ───────
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// ─── Запуск сервера ──────────────────────
async function startServer() {
  try {
    // Инициализация БД
    await initializeDatabase();

    // Старт сервера
    app.listen(PORT, () => {
      console.log(`🚀 Server běží na portu ${PORT}`);
      console.log(`📖 API: /api/books`);
    });
  } catch (error) {
    console.error("💥 Chyba při startu serveru:", error.message);
    process.exit(1);
  }
}

// Старт
startServer();