import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

export function Hero() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    setShowDropdown(false);
    navigate({ to: "/pesquisa", search: { q: query.trim() } });
  };

  return (
    <section className="hero-section">
      <h1>Olá! Podemos ajudar?</h1>
      <div ref={containerRef} className="search-container relative z-50">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => { if (query.trim()) setShowDropdown(true); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>
          Procurar
        </button>

        {showDropdown && query.trim() && (
          <div className="search-dropdown">
            <button
              onClick={handleSearch}
              className="search-dropdown-item"
            >
              <Search className="search-dropdown-icon" />
              <span>
                "<strong>{query}</strong>" na Kwanza Stream Ajuda
              </span>
            </button>
          </div>
        )}
      </div>
      <p>Pesquisa na Base de Conhecimentos ou consulta tópicos específicos abaixo.</p>
    </section>
  );
}
