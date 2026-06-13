import { useState, useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { searchArticles } from "../../content/helpCenter";

export function Hero() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const suggestions = query.trim() ? searchArticles(query).slice(0, 5) : [];

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = () => {
    setShowSuggestions(false);
    navigate({ to: "/pesquisa", search: { q: query.trim() } });
  };

  return (
    <>
      {showSuggestions && query.trim() && (
        <div className="fixed inset-0 bg-black/40 z-40 transition-opacity" />
      )}
      <section className="hero-section">
        <h1>Olá! Podemos ajudar?</h1>
        <div ref={containerRef} className="search-container relative z-50">
          <input
            type="text"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>
            Procurar
          </button>

          {showSuggestions && query.trim() && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-md shadow-lg z-50 text-left overflow-hidden text-[#0E0E10]">
              <button
                onClick={handleSearch}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-[13px] text-left text-[#9146FF] font-semibold cursor-pointer border-none bg-transparent"
              >
                <Search className="w-4 h-4 flex-none" />
                <span className="truncate">Pesquisar por "{query}" na Kwanza Stream Ajuda</span>
              </button>

              {suggestions.map((art) => (
                <button
                  key={art.slug}
                  onClick={() => {
                    setShowSuggestions(false);
                    navigate({ to: `/artigo/${art.slug}` });
                  }}
                  className="w-full block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-left cursor-pointer border-none bg-transparent"
                >
                  <p className="text-[14px] font-semibold text-[#0E0E10] truncate">
                    {art.title}
                  </p>
                  <p className="text-[11px] text-[#53535F] mt-0.5">
                    Base de Conhecimento • {art.lastModified} • {art.id}
                  </p>
                </button>
              ))}

              {suggestions.length === 0 && (
                <div className="px-4 py-4 text-[13px] text-gray-500">
                  Nenhuma sugestão encontrada para "{query}". Pressione Enter para pesquisar.
                </div>
              )}
            </div>
          )}
        </div>
        <p>Pesquisa na Base de Conhecimentos ou consulta tópicos específicos abaixo.</p>
      </section>
    </>
  );
}
