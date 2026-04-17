// ============================================================
// Header.jsx – Záhlaví aplikace se statistikami
// ============================================================
// Tato komponenta zobrazuje název aplikace, ikonu a statistiky
// (celkový počet knih, přečtené, nepřečtené).

function Header({ books }) {
  const total = books.length;
  const readCount = books.filter((book) => book.read === 1).length;
  const unreadCount = total - readCount;

  return (
    <header className="header">
      <span className="header-icon">📚</span>
      <h1>Seznam knih</h1>
      <p>Tvoje osobní knižní sbírka</p>
      {total > 0 && (
        <div className="stats-bar">
          <div className="stat-item">
            📖 Celkem: <span className="stat-number">{total}</span>
          </div>
          <div className="stat-item">
            ✅ Přečteno: <span className="stat-number">{readCount}</span>
          </div>
          <div className="stat-item">
            📑 Ke čtení: <span className="stat-number">{unreadCount}</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
