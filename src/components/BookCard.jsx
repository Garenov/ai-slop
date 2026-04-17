// ============================================================
// BookCard.jsx – Karta jedné knihy
// ============================================================
// Zobrazuje detail jedné knihy jako kartu s názvem, autorem,
// rokem, žánrem, hodnocením hvězdičkami a tlačítky pro akce.

function BookCard({ book, onEdit, onDelete }) {
  // Vytvoříme 5 hvězdiček – vyplněné podle hodnocení
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= (book.rating || 0) ? "filled" : "empty"}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="book-card">
      <div className="book-card-header">
        <h3 className="book-title">{book.title}</h3>
        <span className={`book-badge ${book.read ? "read" : "unread"}`}>
          {book.read ? "Přečteno" : "Ke čtení"}
        </span>
      </div>
      <p className="book-author">✍️ {book.author}</p>
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
      <div className="book-rating">{renderStars()}</div>
      <div className="book-actions">
        <button className="btn-action btn-edit" onClick={() => onEdit(book)} id={`btn-edit-${book.id}`}>
          ✏️ Upravit
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete(book.id)} id={`btn-delete-${book.id}`}>
          🗑️ Smazat
        </button>
      </div>
    </div>
  );
}

export default BookCard;
