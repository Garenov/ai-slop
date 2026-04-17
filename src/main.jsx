// ============================================================
// main.jsx – Vstupní bod React aplikace
// ============================================================
// Tento soubor propojí naši React aplikaci s HTML stránkou.
// Najde element s id="root" v index.html a vykreslí do něj
// celou React aplikaci (komponentu App).

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Importujeme globální styly – ty ovlivní celou stránku
import "./index.css";

// Vytvoříme "kořen" React aplikace a vykreslíme komponentu App
// StrictMode pomáhá odhalit potenciální problémy během vývoje
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
