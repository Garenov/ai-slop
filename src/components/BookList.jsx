// ============================================================
// BookList.jsx – Seznam (mřížka) všech knih
// ============================================================
// Vykresluje mřížku karet knih, loading spinner nebo prázdný stav.

import BookCard from "./BookCard";

function BookList({ books, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Načítám knihy...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">📭</span>
        <h3>Žádné knihy nenalezeny</h3>
        <p>Přidej svou první knihu kliknutím na tlačítko výše!</p>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;
