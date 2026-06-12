import { useEffect, useRef } from "react";
import { useSearch } from "@/context/SearchContext";
import { useNavigate } from "@tanstack/react-router";

export function SearchBar() {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (query.trim()) {
          navigate({ to: "/pesquisa", search: { q: query.trim() } });
        } else {
          document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className="w-full max-w-[480px] mx-auto"
    >
      <div className="flex items-stretch h-[34px] rounded bg-white border border-[#9146FF] overflow-hidden">
        <input
          ref={ref}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisa na Base de Conhecimento..."
          className="flex-1 bg-transparent outline-none px-3 text-[13px] text-[#0E0E10] placeholder:text-[#ADADB8] min-w-0"
        />
        <button
          type="submit"
          className="px-6 bg-[#9146FF] text-white text-[13px] font-bold hover:bg-[#772CE8] transition-colors duration-150"
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}
