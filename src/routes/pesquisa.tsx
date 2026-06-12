import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { searchArticles, getCategory, popularSearches } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { ArrowRight, Search } from "lucide-react";

type SearchParams = { q?: string };

export const Route = createFileRoute("/pesquisa")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Pesquisa — KwanzaStream Ajuda" },
      { name: "description", content: "Pesquisa artigos de ajuda no KwanzaStream." },
    ],
  }),
  component: PesquisaPage,
});

function PesquisaPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [input, setInput] = useState(q || "");
  const results = searchArticles(q || "");

  useEffect(() => {
    setInput(q || "");
  }, [q]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/pesquisa", search: { q: input.trim() } });
  };

  return (
    <div className="bg-ks-bg py-14">
      <div className="mx-auto max-w-[720px] px-6">
        <Breadcrumb
          items={[
            { label: "Início", to: "/" },
            { label: "Pesquisa" },
          ]}
        />

        <div className="mt-6">
          <h1 className="text-[28px] font-semibold text-ks-text">Pesquisar Artigos</h1>
        </div>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex items-stretch h-[42px] rounded-lg bg-ks-surface border border-ks-border overflow-hidden focus-within:border-ks-accent transition-colors">
            <div className="flex items-center pl-3">
              <Search className="w-4 h-4 text-ks-muted" />
            </div>
            <input
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pesquisa na Base de Conhecimento..."
              className="flex-1 bg-transparent outline-none px-3 text-[14px] text-ks-text placeholder:text-ks-muted min-w-0"
            />
            <button
              type="submit"
              className="px-6 bg-ks-accent text-white text-[13px] font-bold hover:bg-ks-accent-hover transition-colors duration-150"
            >
              Pesquisar
            </button>
          </div>
        </form>

        {/* Results or suggestions */}
        {q && q.trim() ? (
          <div className="mt-8">
            <p className="text-[13px] text-ks-muted mb-4">
              {results.length} resultado{results.length !== 1 ? "s" : ""} para "{q}"
            </p>

            {results.length > 0 ? (
              <div className="bg-ks-surface border border-ks-border rounded-lg px-6">
                <ul>
                  {results.map((a, idx) => {
                    const cat = getCategory(a.categorySlug);
                    return (
                      <li key={a.slug}>
                        <Link
                          to="/artigo/$slug"
                          params={{ slug: a.slug }}
                          className={`group flex items-center justify-between py-4 ${
                            idx < results.length - 1 ? "border-b border-ks-border" : ""
                          }`}
                        >
                          <div className="flex items-center min-w-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-ks-accent mr-3 flex-none" />
                            <div className="min-w-0">
                              <p className="text-[15px] font-medium text-ks-text group-hover:text-ks-accent transition-colors duration-150">
                                {a.title}
                              </p>
                              <p className="text-[12px] text-ks-muted mt-0.5">{cat?.title}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-none ml-4">
                            <span className="text-[12px] text-ks-muted">{a.readMinutes} min</span>
                            <ArrowRight className="w-3.5 h-3.5 text-ks-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-[16px] font-medium text-ks-text">Nenhum resultado encontrado</p>
                <p className="mt-2 text-[14px] text-ks-text-secondary">
                  Tenta usar palavras-chave diferentes ou consulta o{" "}
                  <Link to="/catalogo" className="text-ks-accent hover:underline">
                    catálogo de tópicos
                  </Link>.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-[13px] font-semibold text-ks-muted uppercase tracking-[0.06em] mb-3">
              Pesquisas populares
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  to="/pesquisa"
                  search={{ q: term }}
                  className="px-3 py-1.5 rounded-full border border-ks-border text-[13px] text-ks-text-secondary hover:border-ks-accent hover:text-ks-accent transition-colors duration-150"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
