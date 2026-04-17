// ============================================================
// BookCard.jsx – Karta jedné knihy
// ============================================================
// Tato komponenta zobrazuje detail jedné knihy jako kartu.
// Obsahuje název, autora, rok, žánr, hodnocení hvězdičkami
// a tlačítka pro úpravu a smazání.
// Props:
//   - book: objekt knihy { id, title, author, year, genre, rating, read }
//   - onEdit: funkce volaná po kliknutí na "Upravit"
//   - onDelete: funkce volaná po kliknutí na "Smazat"

function BookCard({ book, onEdit, onDelete }) {
  // Vytvoříme pole 5 hvězdiček pro zobrazení hodnocení
  // Pokud je hodnocení 3, prvních 3 hvězdičky budou "filled" a zbylé 2 "empty"
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (book.rating || 0) ? "filled" : "empty"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="book-card">
      {/* Záhlaví karty – název knihy a badge přečteno/nepřečteno */}
      <div className="book-card-header">
        <h3 className="book-title">{book.title}</h3>
        <span className={`book-badge ${book.read ? "read" : "unread"}`}>
          {book.read ? "Přečteno" : "Ke čtení"}
        </span>
      </div>

      {/* Autor knihy */}
      <p className="book-author">✍️ {book.author}</p>

      {/* Metadata – rok vydání a žánr (zobrazí se jen pokud existují) */}
      <div className="book-meta">
        {book.year && (
          <span className="book-meta-item">
            <span className="meta-icon">📅</span> {book.year}
          </span>
        )}
        {book.genre && (
          <span className="book-meta-item">
            <span className="meta-icon">🏷️</span> {book.genre}
          </span>
        )}
      </div>

      {/* Hodnocení hvězdičkami – zobrazí se vždy */}
      <div className="book-rating">{renderStars()}</div>

      {/* Akční tlačítka – upravit a smazat */}
      <div className="book-actions">
        <button
          className="btn-action btn-edit"
          onClick={() => onEdit(book)}
          id={`btn-edit-${book.id}`}
        >
          ✏️ Upravit
        </button>
        <button
          className="btn-action btn-delete"
          onClick={() => onDelete(book.id)}
          id={`btn-delete-${book.id}`}
        >
          🗑️ Smazat
        </button>
      </div>
    </div>
  );
}

export default BookCard;
