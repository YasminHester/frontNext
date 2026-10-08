"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  function alterarTema() {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark");
  }

  return (
    <header className="header">
      <div>
        <Link href="/" className="logo">
          🚗 FleetCheck
        </Link>
      </div>

      <nav>
        <Link href="/">Garagem</Link>
        <Link href="/relatorios">Relatórios</Link>

        <button onClick={alterarTema} className="botao-tema">
          {darkMode ? "Claro" : "Escuro"}
        </button>
      </nav>
    </header>
  );
}