import { Link } from "@tanstack/react-router";
import { categories } from "@/content/helpCenter";
import { useSearch } from "@/context/SearchContext";
import { useTranslation } from "react-i18next";

function matches(text: string, q: string) {
  return text.toLowerCase().includes(q.toLowerCase());
}

export function CategoryGrid() {
  const { t } = useTranslation();
  const { query } = useSearch();
  const q = query.trim();

  const filtered = categories.map((cat) => {
    const title = t(`categories.${cat.slug}.title`);
    const description = t(`categories.${cat.slug}.description`);
    return {
      cat,
      title,
      description,
      isMatch: !q || matches(title, q) || matches(description, q),
    };
  });
  const noResults = q && filtered.every((f) => !f.isMatch);

  return (
    <section id="categorias" className="bg-ks-bg py-8">
      {!noResults && (
        <div className="mx-auto max-w-[860px] px-6 flex justify-end mb-2">
          <a
            href="https://x.com/KwanzaStream"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#9146FF] hover:bg-[#772CE8] text-white text-[13px] font-bold rounded shadow transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>{t("home.follow_x")}</span>
          </a>
        </div>
      )}

      {noResults ? (
        <div className="mx-auto max-w-[900px] px-6">
          <p className="text-center text-[15px] text-ks-text-secondary py-10">
            {t("search.no_results_title", { query: q })}
          </p>
        </div>
      ) : (
        <div className="category-grid">
          {filtered.map(({ cat, title, description, isMatch }) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                to="/categoria/$slug"
                params={{ slug: cat.slug }}
                className="category-card"
                style={{
                  opacity: isMatch ? 1 : 0.3,
                }}
              >
                <Icon className="icon" />
                <h3>{title}</h3>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
