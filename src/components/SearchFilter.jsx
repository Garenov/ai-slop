// ============================================================
// SearchFilter.jsx – Vyhledávací lišta s tlačítkem pro přidání
// ============================================================

function SearchFilter({ searchTerm, onSearchChange, onAddClick }) {
  return (
    <div className="search-filter-bar">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Hledat podle názvu nebo autora..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          id="search-books"
        />
      </div>
      <button className="btn-add" onClick={onAddClick} id="btn-add-book">
        <span>＋</span> Přidat knihu
      </button>
    </div>
  );
}

export default SearchFilter;
