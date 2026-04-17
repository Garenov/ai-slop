// ============================================================
// books.js – API endpointy pro správu knih (CRUD operace)
// ============================================================
// Tento soubor definuje 4 REST API endpointy:
//   GET    /api/books      – Načte všechny knihy (s možností filtrování)
//   POST   /api/books      – Přidá novou knihu
//   PUT    /api/books/:id   – Upraví existující knihu podle ID
//   DELETE /api/books/:id   – Smaže knihu podle ID

// Importujeme Router z Expressu – umožňuje nám definovat endpointy
// v odděleném souboru (ne přímo v server.js)
const express = require("express");
const router = express.Router();

// Importujeme připojení k databázi z našeho database.js souboru
const { db } = require("../db/database");

// ─────────────────────────────────────────────
// GET /api/books – Načtení všech knih + filtrování
// ─────────────────────────────────────────────
// Query parametr ?search=text umožňuje hledat knihy podle názvu nebo autora
// Příklad: GET /api/books?search=Harry → vrátí knihy obsahující "Harry"
router.get("/", async (req, res) => {
  try {
    // Získáme hodnotu parametru "search" z URL (pokud existuje)
    const { search } = req.query;

    let result;

    if (search) {
      // Pokud uživatel hledá, použijeme LIKE pro "fuzzy" vyhledávání
      // Znak % znamená "cokoliv" – takže %Harry% najde "Harry Potter" i "O Harry"
      result = await db.execute({
        sql: "SELECT * FROM books WHERE title LIKE ? OR author LIKE ? ORDER BY id DESC",
        args: [`%${search}%`, `%${search}%`],
      });
    } else {
      // Bez filtru vrátíme prostě všechny knihy, seřazené od nejnovějších
      result = await db.execute("SELECT * FROM books ORDER BY id DESC");
    }

    // Odešleme nalezené řádky jako JSON odpověď
    res.json(result.rows);
  } catch (error) {
    // Při chybě vrátíme kód 500 (interní chyba serveru) a popis problému
    console.error("Chyba při načítání knih:", error.message);
    res.status(500).json({ error: "Nepodařilo se načíst knihy" });
  }
});

// ─────────────────────────────────────────────
// POST /api/books – Přidání nové knihy
// ─────────────────────────────────────────────
// Očekáváme v těle požadavku (body) JSON s údaji o knize:
//   { title, author, year, genre, rating, read }
router.post("/", async (req, res) => {
  try {
    // Destrukturalizace – vytáhne hodnoty z těla požadavku
    const { title, author, year, genre, rating, read } = req.body;

    // --- VALIDACE FORMULÁŘE (serverová strana) ---
    // Kontrolujeme, že název a autor nejsou prázdné
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Název knihy je povinný" });
    }
    if (!author || !author.trim()) {
      return res.status(400).json({ error: "Autor je povinný" });
    }

    // Kontrola roku – musí být rozumné číslo (ne v budoucnosti)
    if (year && (year < 0 || year > new Date().getFullYear())) {
      return res.status(400).json({ error: "Rok vydání není platný" });
    }

    // Kontrola hodnocení – musí být v rozmezí 1-5
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Hodnocení musí být mezi 1 a 5" });
    }

    // Vložíme nový záznam do tabulky books
    // Parametrizovaný dotaz (?) chrání před SQL injection útoky
    const result = await db.execute({
      sql: "INSERT INTO books (title, author, year, genre, rating, read) VALUES (?, ?, ?, ?, ?, ?)",
      args: [
        title.trim(),
        author.trim(),
        year || null,
        genre || null,
        rating || 0,
        read ? 1 : 0,
      ],
    });

    // Vrátíme nově vytvořenou knihu s jejím přiděleným ID
    // lastInsertRowid nám řekne, jaké ID dostala nová kniha
    res.status(201).json({
      id: Number(result.lastInsertRowid),
      title: title.trim(),
      author: author.trim(),
      year: year || null,
      genre: genre || null,
      rating: rating || 0,
      read: read ? 1 : 0,
    });
  } catch (error) {
    console.error("Chyba při přidávání knihy:", error.message);
    res.status(500).json({ error: "Nepodařilo se přidat knihu" });
  }
});

// ─────────────────────────────────────────────
// PUT /api/books/:id – Úprava existující knihy
// ─────────────────────────────────────────────
// :id v URL je parametr – identifikátor knihy, kterou chceme upravit
// Příklad: PUT /api/books/3 → upraví knihu s ID 3
router.put("/:id", async (req, res) => {
  try {
    // Získáme ID z parametru URL
    const { id } = req.params;
    const { title, author, year, genre, rating, read } = req.body;

    // --- VALIDACE (stejná jako u POST) ---
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "Název knihy je povinný" });
    }
    if (!author || !author.trim()) {
      return res.status(400).json({ error: "Autor je povinný" });
    }
    if (year && (year < 0 || year > new Date().getFullYear())) {
      return res.status(400).json({ error: "Rok vydání není platný" });
    }
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Hodnocení musí být mezi 1 a 5" });
    }

    // Aktualizujeme záznam v databázi pomocí SQL UPDATE
    // SET nastaví nové hodnoty, WHERE id = ? určí který řádek chceme změnit
    const result = await db.execute({
      sql: "UPDATE books SET title = ?, author = ?, year = ?, genre = ?, rating = ?, read = ? WHERE id = ?",
      args: [
        title.trim(),
        author.trim(),
        year || null,
        genre || null,
        rating || 0,
        read ? 1 : 0,
        id,
      ],
    });

    // Pokud se neaktualizoval žádný řádek, kniha s tímto ID neexistuje
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Kniha nebyla nalezena" });
    }

    // Vrátíme upravenou knihu jako potvrzení
    res.json({
      id: Number(id),
      title: title.trim(),
      author: author.trim(),
      year: year || null,
      genre: genre || null,
      rating: rating || 0,
      read: read ? 1 : 0,
    });
  } catch (error) {
    console.error("Chyba při úpravě knihy:", error.message);
    res.status(500).json({ error: "Nepodařilo se upravit knihu" });
  }
});

// ─────────────────────────────────────────────
// DELETE /api/books/:id – Smazání knihy
// ─────────────────────────────────────────────
// Příklad: DELETE /api/books/5 → smaže knihu s ID 5
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Smažeme záznam z tabulky books podle zadaného ID
    const result = await db.execute({
      sql: "DELETE FROM books WHERE id = ?",
      args: [id],
    });

    // Pokud se nesmazal žádný řádek, kniha neexistuje
    if (result.rowsAffected === 0) {
      return res.status(404).json({ error: "Kniha nebyla nalezena" });
    }

    // Potvrdíme úspěšné smazání
    res.json({ message: "Kniha byla úspěšně smazána" });
  } catch (error) {
    console.error("Chyba při mazání knihy:", error.message);
    res.status(500).json({ error: "Nepodařilo se smazat knihu" });
  }
});

// Exportujeme router, aby ho mohl server.js připojit na cestu /api/books
module.exports = router;
