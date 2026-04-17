// ============================================================
// App.jsx – Hlavní komponenta aplikace Seznam knih
// ============================================================
// Tato komponenta je "mozek" celé aplikace. Řídí:
//   1. Načítání knih z API (GET /api/books)
//   2. Přidávání nových knih (POST /api/books)
//   3. Úpravu existujících knih (PUT /api/books/:id)
//   4. Mazání knih (DELETE /api/books/:id)
//   5. Filtrování knih podle vyhledávacího textu
//   6. Zobrazení formuláře (modálu) a notifikací (toastů)

import { useState, useEffect, useCallback } from "react";

// Importujeme všechny dílčí komponenty
import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import BookList from "./components/BookList";
import BookForm from "./components/BookForm";

// URL našeho backendu – Express server běží na portu 3001
const API_URL = "http://localhost:3001/api/books";

function App() {
  // ─── Stavové proměnné (state) ─────────────
  // useState je React hook – ukládá data, která se mohou měnit
  // Když se stav změní, React automaticky překreslí komponentu

  // Pole všech knih načtených z API
  const [books, setBooks] = useState([]);

  // Text pro vyhledávání/filtrování
  const [searchTerm, setSearchTerm] = useState("");

  // Zda se právě načítají data (true = zobrazíme spinner)
  const [loading, setLoading] = useState(true);

  // Řízení modálního okna s formulářem (null = zavřený)
  const [showForm, setShowForm] = useState(false);

  // Kniha k úpravě (null = přidáváme novou, objekt = upravujeme existující)
  const [editingBook, setEditingBook] = useState(null);

  // Pole notifikací (toastů) zobrazených v pravém dolním rohu
  const [toasts, setToasts] = useState([]);

  // ─── Funkce pro zobrazení notifikace (toast) ──
  // Vytvoří toast zprávu, která zmizí po 3 sekundách
  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Po 3 sekundách toast automaticky odstraníme
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // ─── Načtení knih z API ───────────────────
  // Funkce zavolá GET endpoint a uloží knihy do stavu
  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);

      // Sestavíme URL – pokud existuje hledaný text, přidáme query parametr
      const url = searchTerm
        ? `${API_URL}?search=${encodeURIComponent(searchTerm)}`
        : API_URL;

      // Zavoláme API pomocí fetch (vestavěná funkce prohlížeče)
      const response = await fetch(url);

      // Pokud odpověď není OK (200), vyhodíme chybu
      if (!response.ok) throw new Error("Chyba při načítání");

      // Převedeme JSON odpověď na JavaScript pole objektů
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Chyba:", error);
      showToast("Nepodařilo se načíst knihy", "error");
    } finally {
      // finally se spustí vždy – ať se data načetla nebo ne
      setLoading(false);
    }
  }, [searchTerm, showToast]);

  // ─── useEffect – spuštění při změně závislostí ──
  // Tento efekt se spustí:
  //   1. Při prvním vykreslení komponenty (načtení knih)
  //   2. Při každé změně searchTerm (přefiltrování)
  useEffect(() => {
    // Debounce – počkáme 300ms po posledním znaku před voláním API
    // To zabrání zbytečnému volání API při každém stisknutí klávesy
    const debounceTimer = setTimeout(() => {
      fetchBooks();
    }, 300);

    // Cleanup – zrušíme předchozí timer pokud uživatel stále píše
    return () => clearTimeout(debounceTimer);
  }, [fetchBooks]);

  // ─── Přidání nové knihy ───────────────────
  // Zavolá POST endpoint s daty z formuláře
  const handleAddBook = async (bookData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Chyba při přidávání");
      }

      // Po úspěšném přidání načteme aktualizovaný seznam knih
      // a zavřeme formulář
      showToast("📖 Kniha byla přidána!");
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // ─── Úprava existující knihy ──────────────
  // Zavolá PUT endpoint s aktualizovanými daty
  const handleEditBook = async (bookData) => {
    try {
      const response = await fetch(`${API_URL}/${editingBook.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Chyba při úpravě");
      }

      showToast("✏️ Kniha byla upravena!");
      setEditingBook(null);
      setShowForm(false);
      fetchBooks();
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  // ─── Smazání knihy ────────────────────────
  // Zavolá DELETE endpoint – před smazáním se zeptáme uživatele
  const handleDeleteBook = async (bookId) => {
    // Potvrzovací dialog – ochrana proti nechtěnému smazání
    if (!window.confirm("Opravdu chceš tuto knihu smazat?")) return;

    try {
      const response = await fetch(`${API_URL}/${bookId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Chyba při mazání");

      showToast("🗑️ Kniha byla smazána!");
      fetchBooks();
    } catch (error) {
      showToast("Nepodařilo se smazat knihu", "error");
    }
  };

  // ─── Otevření formuláře pro úpravu ────────
  // Nastaví knihu k editaci a otevře modal
  const handleStartEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  // ─── Zavření formuláře ────────────────────
  // Resetuje stav editace a zavře modal
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  // ─── Render (vykreslení) ──────────────────
  return (
    <div className="app-container">
      {/* Záhlaví se statistikami */}
      <Header books={books} />

      {/* Vyhledávací lišta + tlačítko přidání */}
      <SearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={() => setShowForm(true)}
      />

      {/* Mřížka knih nebo prázdný/loading stav */}
      <BookList
        books={books}
        onEdit={handleStartEdit}
        onDelete={handleDeleteBook}
        loading={loading}
      />

      {/* Modální formulář – zobrazí se pouze pokud je showForm true */}
      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={editingBook ? handleEditBook : handleAddBook}
          onClose={handleCloseForm}
        />
      )}

      {/* Toast notifikace v pravém dolním rohu */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div key={toast.id} className={`toast ${toast.type}`}>
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
