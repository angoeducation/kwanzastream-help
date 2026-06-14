import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo de Tópicos — Kwanza Stream Ajuda" },
      {
        name: "description",
        content: "Explora todos os tópicos de ajuda da Kwanza Stream organizados por categoria.",
      },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-ks-bg py-14">
      <div className="mx-auto max-w-[960px] px-6">
        <Breadcrumb items={[{ label: t("breadcrumb.home"), to: "/" }, { label: t("catalog.title") }]} />

        <div className="mt-6">
          <h1 className="text-[28px] font-semibold text-ks-text">{t("catalog.title")}</h1>
          <p className="mt-2 text-[15px] text-ks-text-secondary max-w-2xl">
            {t("catalog.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to="/categoria/$slug"
                params={{ slug: cat.slug }}
                className="group bg-ks-surface border border-ks-border rounded-lg p-6 transition-all duration-150 hover:border-ks-border-hover hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-ks-accent-subtle flex items-center justify-center flex-none">
                    <Icon className="w-5 h-5 text-ks-accent" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-[16px] font-semibold text-ks-text group-hover:text-ks-accent transition-colors duration-150">
                      {t(`categories.${cat.slug}.title`)}
                    </h2>
                    <p className="mt-1 text-[13px] text-ks-text-secondary leading-relaxed line-clamp-2">
                      {t(`categories.${cat.slug}.description`)}
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-ks-muted">
                      {cat.articleCount} {t("catalog.articles")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
