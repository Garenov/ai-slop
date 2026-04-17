// ============================================================
// SearchFilter.jsx – Vyhledávací lišta s tlačítkem pro přidání
// ============================================================
// Tato komponenta obsahuje:
//   1. Textový input pro vyhledávání knih (filtrování)
//   2. Tlačítko "Přidat knihu" pro otevření formuláře
// Props:
//   - searchTerm: aktuální hledaný text
//   - onSearchChange: funkce volaná při změně textu
//   - onAddClick: funkce volaná při kliknutí na tlačítko přidání

function SearchFilter({ searchTerm, onSearchChange, onAddClick }) {
  return (
    <div className="search-filter-bar">
      {/* Wrapper kolem inputu – obsahuje i ikonu lupy */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>

        {/* Input pro vyhledávání – onChange volá funkci z rodičovské komponenty,
            která aktualizuje stav a tím spouští filtrování */}
        <input
          type="text"
          className="search-input"
          placeholder="Hledat podle názvu nebo autora..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          id="search-books"
        />
      </div>

      {/* Tlačítko pro přidání nové knihy */}
      <button className="btn-add" onClick={onAddClick} id="btn-add-book">
        <span>＋</span> Přidat knihu
      </button>
    </div>
  );
}

export default SearchFilter;
