import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { searchArticles, getCategory, popularSearches } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { useTranslation } from "react-i18next";
import { EmptySearchIllustration } from "@/components/search/EmptySearchIllustration";
import { formatDate } from "@/lib/format";

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
  const { t, i18n } = useTranslation();
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
    <div className="bg-[var(--color-surface)] min-h-screen" style={{ paddingTop: '32px', paddingBottom: '32px' }}>
      <div className="mx-auto max-w-[1100px]" style={{ padding: '0 24px' }}>
        <Breadcrumb items={[{ label: t("breadcrumb.home"), to: "/" }, { label: t("search.page_title") }]} />

        {/* Centered Search input */}
        <div className="mt-6 max-w-[600px] mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex items-stretch h-[48px] rounded bg-white border border-[#9146FF] overflow-hidden">
              <input
                type="search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("home.search_placeholder")}
                className="flex-1 bg-transparent outline-none px-4 text-base text-[#0E0E10] placeholder:text-[#ADADB8] min-w-0 border-none"
              />
              <button
                type="submit"
                className="px-6 bg-[#9146FF] text-white text-base font-bold hover:bg-[#772CE8] transition-colors duration-150 cursor-pointer border-none"
              >
                {t("home.search_button")}
              </button>
            </div>
          </form>
        </div>

        {q && q.trim() ? (
          /* Two-column layout matching help.twitch.tv */
          <div className="mt-12 grid grid-cols-1 md:grid-cols-[200px_1fr] items-start" style={{ gap: '48px' }}>
            
            {/* Left Sidebar */}
            <aside className="w-full md:w-[200px] flex-none">
              <h2 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '12px' }}>
                {t("search.results_one", { count: results.length })}
              </h2>
              <div className="flex flex-col gap-1">
                <button
                  className="w-full text-left cursor-default block"
                  style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-accent)', background: 'rgba(145, 70, 255, 0.08)', padding: '8px 12px', borderRadius: '4px', borderLeft: '3px solid var(--color-accent)', border: 'none', borderLeftWidth: '3px', borderLeftStyle: 'solid', borderLeftColor: 'var(--color-accent)' }}
                >
                  <div className="flex items-center justify-between">
                    <span>{t("search.tab_articles")}</span>
                    <span className="bg-white text-[var(--color-accent)] text-xs font-bold px-2 py-0.5 rounded-full border border-[var(--color-accent)]">
                      {results.length}
                    </span>
                  </div>
                </button>
              </div>
            </aside>

            {/* Right Content Area: Main Results */}
            <main className="flex-1 min-w-0">
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
                {results.length === 1
                  ? t("search.results_one", { count: results.length })
                  : t("search.results_other", { count: results.length })}{" "}
                • {t("search.sorted_by")}
              </p>

              {results.length > 0 ? (
                <>
                  <div className="border-t border-[var(--color-border)] pt-4">
                    {results.map((a) => {
                      const translatedBody = t(`articles.${a.slug}.body`, a.body);
                      const cleanSnippet = translatedBody.replace(/<[^>]*>/g, '').slice(0, 160) + "...";
                      return (
                        <div key={a.slug} style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid var(--color-border)' }}>
                          <Link
                            to="/artigo/$slug"
                            params={{ slug: a.slug }}
                            className="hover:underline"
                            style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-link)', textDecoration: 'none', display: 'block', marginBottom: '4px' }}
                          >
                            {t(`articles.${a.slug}.title`, a.title)}
                          </Link>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-meta)', marginBottom: '6px' }}>
                            {a.id} • {t("article.last_modified")}{" "}
                            {formatDate(a.lastModified ?? "", i18n.language)}
                          </p>
                          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                            {cleanSnippet}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-10 pt-8 border-t border-[var(--color-border)] text-center">
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 text-[18px] font-bold text-[#0E0E10] hover:text-[#9146FF] transition-colors cursor-pointer"
                    >
                      <span>{t("article.contact_support")}</span>
                      <svg
                        className="w-4.5 h-4.5 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-16 bg-white border border-[var(--color-border)] rounded-lg px-6">
                  <EmptySearchIllustration />
                  <p className="text-[18px] font-bold text-[var(--color-text)] mt-6">
                    {t("search.no_results_title", { query: q })}
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md">
                    {t("search.no_results_hint")}{" "}
                    <Link to="/catalogo" className="text-[var(--color-accent)] hover:underline font-semibold">
                      {t("search.no_results_link")}
                    </Link>
                    .
                  </p>
                </div>
              )}
            </main>
          </div>
        ) : (
          /* Popular Searches */
          <div className="mt-12 max-w-[600px] mx-auto text-center">
            <p className="text-[13px] font-semibold text-ks-muted uppercase tracking-[0.06em] mb-4">
              {t("search.popular_searches")}
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
