import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, getCategory, getCategoryArticles, articles } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { FeedbackWidget } from "@/components/article/FeedbackWidget";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/lib/format";
import { PopularArticles } from "@/components/article/PopularArticles";

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
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
      <div className="py-24 text-center px-4">
        <h1 className="text-[28px] font-semibold mb-3 text-ks-text">{t("article.not_found")}</h1>
        <Link to="/" className="text-ks-accent hover:underline">
          {t("article.back_to_help")}
        </Link>
      </div>
    );
  },
  errorComponent: () => {
    const { t } = useTranslation();
    return (
      <div className="py-24 text-center px-4">
        <h1 className="text-[28px] font-semibold text-ks-text">{t("article.error_loading")}</h1>
      </div>
    );
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { t, i18n } = useTranslation();
  const { article, cat } = Route.useLoaderData();

  return (
    <div className="bg-[var(--color-surface)]">
      <div className="max-w-[1100px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
        {/* Left Column: Main Content */}
        <main className="min-w-0">
          <nav className="text-xs font-bold text-[#9146FF] uppercase tracking-[0.08em] mb-5 flex items-center gap-2 flex-wrap">
            <Link to="/" className="text-inherit no-underline hover:underline">
              {t("breadcrumb.home")}
            </Link>
            {cat && (
              <>
                <span className="text-[#adadb8] font-normal">&gt;</span>
                <Link
                  to="/categoria/$slug"
                  params={{ slug: cat.slug }}
                  className="text-inherit no-underline hover:underline"
                >
                  {t(`categories.${cat.slug}.title`)}
                </Link>
              </>
            )}
            <span className="text-[#adadb8] font-normal">&gt;</span>
            <span className="text-ks-text">{t(`articles.${article.slug}.title`, article.title)}</span>
          </nav>

          <h1 className="text-3xl font-bold text-[var(--color-text)] leading-tight mb-6 tracking-tight">
            {t(`articles.${article.slug}.title`, article.title)}
          </h1>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ks-muted mb-8 font-medium">
            <span>{article.id}</span>
            <span>·</span>
            <span className="uppercase tracking-wider text-[10px] font-bold text-[#9146FF]">{t("article.type_label")}</span>
            <span>·</span>
            <span>
              {article.views === 1
                ? t("article.views_one", { count: article.views })
                : t("article.views_other", { count: article.views })}
            </span>
            <span>·</span>
            <span>
              {t("article.updated_on")}{" "}
              {formatDate(article.lastModified ?? "", i18n.language)}
            </span>
            <span>·</span>
            <span>{t("article.read_minutes", { count: article.readMinutes })}</span>
          </div>

          <hr className="my-8 border-t border-[var(--color-border)]" />

          {/* Render actual article body HTML */}
          <div className="article-body" dangerouslySetInnerHTML={{ __html: t(`articles.${article.slug}.body`, article.body) }} />

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
        </main>

        {/* Right Column: Sidebar */}
        <aside className="hidden lg:block w-[280px] flex-none">
          <div className="sticky top-[80px]">
            <PopularArticles excludeSlug={article.slug} />
          </div>
        </aside>
      </div>
    </div>
  );
}
