import { Link } from "@tanstack/react-router";
import { articles, getCategory } from "@/content/helpCenter";

export function RelatedArticles({ excludeSlug }: { excludeSlug: string }) {
  const items = articles.filter((a) => a.slug !== excludeSlug).slice(0, 3);
  return (
    <section className="mt-12 border-t border-ks-border pt-8">
      <h3 className="text-[15px] font-semibold text-ks-text mb-2">Artigos relacionados</h3>
      <ul>
        {items.map((a, idx) => {
          const cat = getCategory(a.categorySlug);
          return (
            <li key={a.slug}>
              <Link
                to="/artigo/$slug"
                params={{ slug: a.slug }}
                className={`group flex items-center justify-between py-3 ${
                  idx < items.length - 1 ? "border-b border-ks-border" : ""
                }`}
              >
                <div className="flex items-center min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-ks-accent mr-3 flex-none" />
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-ks-text group-hover:text-ks-accent transition-colors duration-150">
                      {a.title}
                    </p>
                    <p className="text-[12px] text-ks-muted mt-0.5">{cat?.title}</p>
                  </div>
                </div>
                <span className="text-[12px] text-ks-muted ml-4 flex-none">{a.readMinutes} min</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
