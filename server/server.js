// server/server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const booksRouter = require("./routes/books");
const { initializeDatabase } = require("./db/database");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middlewares ─────────────────────────
app.use(cors());
app.use(express.json());

// ─── API ────────────────────────────────
app.use("/api/books", booksRouter);

app.get("/api", (req, res) => {
  res.json({ message: "API běží 🚀" });
});

// ─── React (Vite build!) ───────────────
const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

// ─── Start ─────────────────────────────
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server běží na portu ${PORT}`);
    });
  } catch (err) {
    console.error("💥 Chyba:", err.message);
    process.exit(1);
  }
}

startServer();