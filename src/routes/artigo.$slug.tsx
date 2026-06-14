import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, getCategory, getCategoryArticles } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { FeedbackWidget } from "@/components/article/FeedbackWidget";
import { RelatedArticles } from "@/components/article/RelatedArticles";

export const Route = createFileRoute("/artigo/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    const cat = getCategory(article.categorySlug);
    return { article, cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — Kwanza Stream Ajuda` },
          {
            name: "description",
            content: `${loaderData.cat?.title ?? ""} — guia oficial da Kwanza Stream.`,
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="text-[28px] font-semibold mb-3 text-ks-text">Artigo não encontrado</h1>
      <Link to="/" className="text-ks-accent hover:underline">
        Voltar à Central de Ajuda
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="text-[28px] font-semibold text-ks-text">Erro ao carregar artigo</h1>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { article, cat } = Route.useLoaderData();

  // Get articles in same category (or other categories to make up 5) for sidebar
  const categoryArticles = getCategoryArticles(article.categorySlug)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 5);

  if (categoryArticles.length < 5) {
    const fallbacks = articles
      .filter((a) => a.slug !== article.slug && !categoryArticles.some((x) => x.slug === a.slug))
      .slice(0, 5 - categoryArticles.length);
    categoryArticles.push(...fallbacks);
  }

  return (
    <div className="bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        {/* Left Column: Main Content */}
        <main className="min-w-0">
          <nav className="text-xs font-semibold text-[#6441A5] uppercase tracking-[0.05em] mb-5 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="text-inherit no-underline hover:underline">
              Início
            </Link>
            {cat && (
              <>
                <span>&gt;</span>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: cat.slug }}
                  className="text-inherit no-underline hover:underline"
                >
                  {cat.title}
                </Link>
              </>
            )}
            <span>&gt;</span>
            <span className="text-inherit font-bold">{article.title}</span>
          </nav>

          <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight mb-6 tracking-tight">
            {article.title}
          </h1>

          <p className="mt-3 text-xs text-[#999] mb-8">
            Atualizado em 15 de Maio de 2026 · {article.readMinutes} min de leitura
          </p>

          <hr className="my-8 border-t border-[var(--color-border)]" />

          {/* Render actual article body HTML */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }} />

          <style>{`
            .article-body p {
              font-size: var(--text-base);
              line-height: var(--leading-relaxed);
              color: var(--color-text);
              margin-bottom: 16px;
            }
            .article-body h2 {
              font-size: var(--text-2xl);
              font-weight: var(--font-bold);
              margin: 32px 0 12px;
              background: var(--color-accent);
              color: white;
              padding: 10px 16px;
              border-radius: 4px;
            }
            .article-body h3 {
              font-size: var(--text-xl);
              font-weight: var(--font-semibold);
              margin: 24px 0 8px;
            }
            .article-body ul {
              list-style-type: disc;
              margin-bottom: 16px;
              padding-left: 0;
            }
            .article-body li {
              font-size: var(--text-base);
              line-height: var(--leading-relaxed);
              margin-bottom: 8px;
              margin-left: 20px;
            }
            .article-body a {
              color: var(--color-link);
              text-decoration: none;
            }
            .article-body a:hover {
              text-decoration: underline;
            }
          `}</style>

          <FeedbackWidget />

          <div className="mt-12 pt-8 border-t border-[var(--color-border)] text-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 text-[18px] font-bold text-[#0E0E10] hover:text-[#9146FF] transition-colors cursor-pointer"
            >
              <span>Contactar Suporte</span>
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
        </main>

        {/* Right Column: Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-none">
          <div className="sticky top-[80px]">
            <h3 className="text-sm font-bold uppercase tracking-[0.08em] text-[#999] mb-4">
              Artigos Populares
            </h3>
            <nav className="flex flex-col gap-3">
              {categoryArticles.map((art) => (
                <Link
                  key={art.slug}
                  to="/artigo/$slug"
                  params={{ slug: art.slug }}
                  className="text-sm text-[#9146FF] leading-relaxed no-underline hover:underline block"
                >
                  {art.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
