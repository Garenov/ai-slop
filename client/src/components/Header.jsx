// ============================================================
// Header.jsx – Záhlaví aplikace se statistikami
// ============================================================
// Tato komponenta zobrazuje název aplikace, ikonu a statistiky
// (celkový počet knih, přečtené, nepřečtené).
// Přijímá prop "books" – pole všech knih z databáze.

// Funkce pro výpočet statistik přímo z pole knih
function Header({ books }) {
  // Spočítáme celkový počet knih
  const total = books.length;

  // Filtrujeme knihy, které mají příznak "read" nastavený na 1 (přečtené)
  const readCount = books.filter((book) => book.read === 1).length;

  // Nepřečtené = celkové mínus přečtené
  const unreadCount = total - readCount;

  return (
    <header className="header">
      {/* Plovoucí ikona knihy s animací */}
      <span className="header-icon">📚</span>

      {/* Hlavní nadpis s gradientovým textem */}
      <h1>Seznam knih</h1>
      <p>Tvoje osobní knižní sbírka</p>

      {/* Lišta se statistikami – zobrazuje se pouze pokud existují knihy */}
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
