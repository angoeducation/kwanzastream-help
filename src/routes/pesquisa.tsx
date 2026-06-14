import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { searchArticles, getCategory, popularSearches } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";

type SearchParams = { q?: string };

export const Route = createFileRoute("/pesquisa")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Pesquisa — Kwanza Stream Ajuda" },
      { name: "description", content: "Pesquisa artigos de ajuda na Kwanza Stream." },
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
    <div className="bg-[#F7F7F8] py-10 min-h-screen">
      <div className="mx-auto max-w-[1000px] px-6">
        <Breadcrumb
          items={[
            { label: "Início", to: "/" },
            { label: "Pesquisa" },
          ]}
        />

        {/* Centered Search input */}
        <div className="mt-6 max-w-[600px] mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex items-stretch h-[40px] rounded bg-white border border-[#9146FF] overflow-hidden">
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pesquisar..."
                className="flex-1 bg-transparent outline-none px-4 text-[14px] text-[#0E0E10] placeholder:text-[#ADADB8] min-w-0 border-none"
              />
              <button
                type="submit"
                className="px-6 bg-[#9146FF] text-white text-[14px] font-bold hover:bg-[#772CE8] transition-colors duration-150 cursor-pointer border-none"
              >
                Procurar
              </button>
            </div>
          </form>
        </div>

        {q && q.trim() ? (
          /* Two-column layout */
          <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left Sidebar (25% width) */}
            <aside className="w-full md:w-[240px] flex-none">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#53535F] mb-4">
                Resultados da pesquisa
              </h2>
              <div className="border border-gray-200 rounded overflow-hidden bg-white">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#f0f0ff] border-l-4 border-[#9146FF] text-left text-[14px] font-bold text-[#9146FF] border-none"
                >
                  <span>Artigos</span>
                  <span className="bg-white text-[#9146FF] text-[11px] font-black px-2 py-0.5 rounded-full border border-[#9146FF]">
                    {results.length}
                  </span>
                </button>
              </div>
            </aside>

            {/* Right Content Area (75% width) */}
            <main className="flex-1 min-w-0">
              <h1 className="text-[24px] font-black text-[#0E0E10] mb-1">Artigos</h1>
              <p className="text-[13px] text-[#53535F] mb-6">
                Mais de {results.length} resultado{results.length !== 1 ? "s" : ""} • Ordenado por Relevância
              </p>

              {results.length > 0 ? (
                <>
                  <div className="border-t border-gray-200">
                    {results.map((a) => (
                      <div key={a.slug} className="py-5 border-b border-gray-200">
                        <Link
                          to="/artigo/$slug"
                          params={{ slug: a.slug }}
                          className="text-[16px] font-bold text-[#9146FF] hover:underline"
                        >
                          {a.title}
                        </Link>
                        <p className="text-[12px] text-[#53535F] mt-1.5">
                          {a.id} • Última modificação {a.lastModified}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 pt-8 border-t border-gray-150 text-center">
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 text-[18px] font-bold text-[#0E0E10] hover:text-[#9146FF] transition-colors cursor-pointer"
                    >
                      <span>Contactar Suporte</span>
                      <svg className="w-4.5 h-4.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
                  <p className="text-[16px] font-medium text-ks-text">Nenhum resultado encontrado para "{q}"</p>
                  <p className="mt-2 text-[14px] text-ks-text-secondary">
                    Tenta usar palavras-chave diferentes ou consulta o{" "}
                    <Link to="/catalogo" className="text-ks-accent hover:underline">
                      catálogo de tópicos
                    </Link>.
                  </p>
                </div>
              )}
            </main>
          </div>
        ) : (
          /* Popular Searches */
          <div className="mt-12 max-w-[600px] mx-auto text-center">
            <p className="text-[13px] font-semibold text-ks-muted uppercase tracking-[0.06em] mb-4">
              Pesquisas populares
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  to="/pesquisa"
                  search={{ q: term }}
                  className="px-4 py-2 rounded-full border border-ks-border text-[13px] bg-white text-ks-text-secondary hover:border-ks-accent hover:text-ks-accent transition-colors duration-150"
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
