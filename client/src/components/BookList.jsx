// ============================================================
// BookList.jsx – Seznam (mřížka) všech knih
// ============================================================
// Tato komponenta vykresluje mřížku karet knih.
// Pokud nejsou žádné knihy, zobrazí prázdný stav s ikonou.
// Props:
//   - books: pole knih k zobrazení (už vyfiltrované)
//   - onEdit: funkce volaná při kliknutí na "Upravit"
//   - onDelete: funkce volaná při kliknutí na "Smazat"
//   - loading: boolean – zda se data právě načítají

import BookCard from "./BookCard";

function BookList({ books, onEdit, onDelete, loading }) {
  // Stav načítání – zobrazíme animovaný spinner
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Načítám knihy...</p>
      </div>
    );
  }

  // Prázdný stav – žádné knihy v databázi nebo nevyhovují filtru
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">📭</span>
        <h3>Žádné knihy nenalezeny</h3>
        <p>Přidej svou první knihu kliknutím na tlačítko výše!</p>
      </div>
    );
  }

  // Zobrazíme mřížku karet – pro každou knihu vytvoříme komponentu BookCard
  // Klíč (key) musí být unikátní – používáme ID knihy z databáze
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BookList;
