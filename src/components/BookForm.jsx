// ============================================================
// BookForm.jsx – Formulář pro přidání a úpravu knihy
// ============================================================
// Modální formulář s VALIDACÍ – slouží jak pro novou knihu,
// tak pro úpravu existující. Obsahuje povinná pole, hodnocení
// hvězdičkami, výběr žánru a checkbox "přečteno".

import { useState, useEffect } from "react";

function BookForm({ book, onSubmit, onClose }) {
  // Stav jednotlivých polí formuláře
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const [read, setRead] = useState(false);
  const [errors, setErrors] = useState({});

  // Předvyplnění formuláře při úpravě existující knihy
  useEffect(() => {
    if (book) {
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setYear(book.year ? String(book.year) : "");
      setGenre(book.genre || "");
      setRating(book.rating || 0);
      setRead(book.read === 1);
    }
  }, [book]);

  // Validace – kontroluje povinná pole a logické hodnoty
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Název knihy je povinný";
    if (!author.trim()) newErrors.author = "Autor je povinný";
    if (year) {
      const yearNum = parseInt(year);
      if (isNaN(yearNum) || yearNum < 0 || yearNum > new Date().getFullYear()) {
        newErrors.year = `Rok musí být mezi 0 a ${new Date().getFullYear()}`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Odeslání formuláře
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      author: author.trim(),
      year: year ? parseInt(year) : null,
      genre: genre.trim() || null,
      rating,
      read,
    });
  };

  const genres = [
    "Román", "Fantasy", "Sci-fi", "Detektivka", "Horror", "Biografie",
    "Historie", "Naučná", "Poezie", "Komiks", "Drama", "Pohádka", "Thriller", "Jiný",
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{book ? "✏️ Upravit knihu" : "📖 Nová kniha"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="book-title">Název knihy <span className="required">*</span></label>
            <input id="book-title" type="text" className={`form-input ${errors.title ? "error" : ""}`}
              placeholder="Např. Harry Potter a Kámen mudrců" value={title}
              onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <div className="form-error">⚠️ {errors.title}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="book-author">Autor <span className="required">*</span></label>
            <input id="book-author" type="text" className={`form-input ${errors.author ? "error" : ""}`}
              placeholder="Např. J.K. Rowling" value={author}
              onChange={(e) => setAuthor(e.target.value)} />
            {errors.author && <div className="form-error">⚠️ {errors.author}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="book-year">Rok vydání</label>
              <input id="book-year" type="number" className={`form-input ${errors.year ? "error" : ""}`}
                placeholder="Např. 1997" value={year}
                onChange={(e) => setYear(e.target.value)} />
              {errors.year && <div className="form-error">⚠️ {errors.year}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="book-genre">Žánr</label>
              <select id="book-genre" className="form-select" value={genre}
                onChange={(e) => setGenre(e.target.value)}>
                <option value="">Vyber žánr...</option>
                {genres.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Hodnocení</label>
            <div className="rating-selector">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button"
                  className={`rating-star ${star <= rating ? "active" : "inactive"}`}
                  onClick={() => setRating(star === rating ? 0 : star)} title={`${star} z 5`}>
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-checkbox" htmlFor="book-read">
              <input id="book-read" type="checkbox" checked={read}
                onChange={(e) => setRead(e.target.checked)} />
              <span className="checkbox-custom"></span>
              <span className="checkbox-label">Knihu jsem již přečetl/a</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" id="btn-submit-book">
              {book ? "💾 Uložit změny" : "➕ Přidat knihu"}
            </button>
            <button type="button" className="btn-cancel" onClick={onClose} id="btn-cancel-form">
              Zrušit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
