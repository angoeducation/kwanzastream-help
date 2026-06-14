import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getCategory, getCategoryArticles } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/categoria/$slug")({
  loader: ({ params }) => {
    const cat = getCategory(params.slug);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.title} — Kwanza Stream Ajuda` },
          { name: "description", content: loaderData.cat.description },
        ]
      : [],
  }),
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
      <div className="py-24 text-center px-4">
        <h1 className="text-[28px] font-semibold mb-3 text-ks-text">{t("catalog.not_found")}</h1>
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
        <h1 className="text-[28px] font-semibold text-ks-text">{t("catalog.error_loading")}</h1>
      </div>
    );
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { t, i18n } = useTranslation();
  const { cat } = Route.useLoaderData();
  const rawArticles = getCategoryArticles(cat.slug);
  const related = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");

  const articles =
    activeTab === "all"
      ? rawArticles
      : [...rawArticles].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));

  const catTitle = t(`categories.${cat.slug}.title`);
  const catDescription = t(`categories.${cat.slug}.description`);

  return (
    <div className="bg-ks-bg py-14">
      <div className="mx-auto max-w-[960px] px-6">
        <Breadcrumb items={[{ label: t("breadcrumb.home"), to: "/" }, { label: catTitle }]} />

        <div className="mt-6">
          <h1 className="text-[28px] font-semibold text-ks-text">{catTitle}</h1>
          <p className="mt-2 text-[15px] text-ks-text-secondary max-w-2xl">{catDescription}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
          <div className="flex flex-col gap-4">
            {/* Tabs Header */}
            <div className="flex border-b border-[#e5e7eb] dark:border-ks-border">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer bg-transparent border-none ${
                  activeTab === "all"
                    ? "border-[#9146FF] text-[#9146FF]"
                    : "border-transparent text-ks-text-secondary hover:text-[#9146FF]"
                }`}
              >
                {t("search.tab_articles")}
              </button>
              <button
                onClick={() => setActiveTab("popular")}
                className={`py-3 px-4 text-sm font-semibold border-b-2 transition-colors cursor-pointer bg-transparent border-none ${
                  activeTab === "popular"
                    ? "border-[#9146FF] text-[#9146FF]"
                    : "border-transparent text-ks-text-secondary hover:text-[#9146FF]"
                }`}
              >
                {t("search.tab_popular")}
              </button>
            </div>

            <section className="bg-ks-surface border border-ks-border rounded-lg px-6">
              {articles.length > 0 ? (
                <ul>
                  {articles.map((a, idx) => (
                    <li key={a.slug}>
                      <Link
                        to="/artigo/$slug"
                        params={{ slug: a.slug }}
                        className={`group flex items-start justify-between py-4 ${
                          idx < articles.length - 1 ? "border-b border-ks-border" : ""
                        }`}
                      >
                        <div className="flex items-start min-w-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-ks-accent mr-3 mt-2 flex-none" />
                          <div className="flex flex-col min-w-0">
                            <p className="text-[15px] font-semibold text-ks-text group-hover:text-ks-accent transition-colors duration-150">
                              {t(`articles.${a.slug}.title`, a.title)}
                            </p>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ks-muted mt-1 font-medium">
                              <span>{a.id}</span>
                              <span>·</span>
                              <span className="uppercase tracking-wider text-[10px] font-bold text-[#9146FF]">{t("article.type_label")}</span>
                              <span>·</span>
                              <span>
                                {a.views === 1
                                  ? t("article.views_one", { count: a.views })
                                  : t("article.views_other", { count: a.views })}
                              </span>
                              <span>·</span>
                              <span>
                                {t("article.updated_on")}{" "}
                                {formatDate(a.lastModified ?? "", i18n.language)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-none ml-4 mt-1.5">
                          <span className="text-[12px] text-ks-muted">
                            {t("article.read_minutes", { count: a.readMinutes })}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-ks-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-8 text-center text-[14px] text-ks-muted">
                  {t("catalog.no_articles")}
                </p>
              )}
            </section>
          </div>

          <aside className="hidden lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ks-muted mb-3">
              {t("catalog.related_categories")}
            </p>
            <ul className="space-y-1">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: c.slug }}
                    className="block py-2 text-[14px] text-ks-text-secondary hover:text-ks-text transition-colors duration-150"
                  >
                    {t(`categories.${c.slug}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 text-[18px] font-bold text-[#0E0E10] hover:text-[#9146FF] transition-colors cursor-pointer"
          >
            <span>{t("catalog.contact_support")}</span>
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
      </div>
    </div>
  );
}
