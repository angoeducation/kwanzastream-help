import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <h1>Olá! Podemos ajudar?</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && navigate(`/pesquisa?q=${query}`)}
        />
        <button onClick={() => navigate(`/pesquisa?q=${query}`)}>
          Procurar
        </button>
      </div>
      <p>Pesquisa na Base de Conhecimentos ou consulta tópicos específicos abaixo.</p>
    </section>
  );
}
