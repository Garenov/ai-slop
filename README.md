# 📚 Seznam knih – Fullstack webová aplikace

Webová aplikace pro správu vlastní knižní sbírky. Umožňuje přidávat, upravovat, mazat a filtrovat knihy.

## 🛠️ Technologie

| Vrstva | Technologie |
|--------|------------|
| **Frontend** | React 19 (Vite), Vanilla CSS |
| **Backend** | Node.js, Express |
| **Databáze** | [Turso](https://turso.tech) (libSQL) |

## 📁 Struktura projektu

```
ai-slop/
├── server/             # Backend (API)
│   ├── server.js       # Hlavní soubor Express serveru
│   ├── db/database.js  # Připojení k Turso databázi
│   ├── routes/books.js # REST API endpointy (CRUD)
│   ├── .env            # Proměnné prostředí (URL + token)
│   └── package.json
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── App.jsx              # Hlavní komponenta
│   │   ├── index.css            # Globální styly
│   │   └── components/
│   │       ├── Header.jsx       # Záhlaví + statistiky
│   │       ├── SearchFilter.jsx # Vyhledávání + tlačítko přidání
│   │       ├── BookList.jsx     # Mřížka knih
│   │       ├── BookCard.jsx     # Karta jedné knihy
│   │       └── BookForm.jsx     # Formulář (přidání/úprava)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🚀 Spuštění

### 1. Předpoklady

- [Node.js](https://nodejs.org) (verze 18+)
- Účet na [Turso](https://turso.tech) (zdarma)

### 2. Vytvoření Turso databáze

```bash
# Nainstaluj Turso CLI
# Windows (PowerShell):
irm https://get.tur.so/install.ps1 | iex

# Přihlas se
turso auth login

# Vytvoř databázi
turso db create seznam-knih

# Získej URL a token
turso db show --url seznam-knih
turso db tokens create seznam-knih
```

### 3. Nastavení backendu

```bash
cd server

# Nainstaluj závislosti
npm install

# Uprav .env soubor – doplň TURSO_DATABASE_URL a TURSO_AUTH_TOKEN
# (hodnoty z předchozího kroku)

# Spusť server
npm run dev
```

Server poběží na **http://localhost:3001**

### 4. Nastavení frontendu

```bash
cd client

# Nainstaluj závislosti
npm install

# Spusť vývojový server
npm run dev
```

Aplikace poběží na **http://localhost:5173**

## 📡 API Endpointy

| Metoda | Endpoint | Popis |
|--------|----------|-------|
| `GET` | `/api/books` | Načte všechny knihy |
| `GET` | `/api/books?search=text` | Filtruje knihy podle názvu/autora |
| `POST` | `/api/books` | Přidá novou knihu |
| `PUT` | `/api/books/:id` | Upraví existující knihu |
| `DELETE` | `/api/books/:id` | Smaže knihu |

## ✨ Funkce

- ✅ CRUD operace (Create, Read, Update, Delete)
- ✅ Vyhledávání a filtrování knih
- ✅ Validace formuláře (klient i server)
- ✅ Hodnocení hvězdičkami (1-5)
- ✅ Stav přečtení (přečteno / ke čtení)
- ✅ Moderní tmavý design s animacemi
- ✅ Responsivní (mobil, tablet, desktop)
- ✅ Toast notifikace
- ✅ České komentáře v kódu
