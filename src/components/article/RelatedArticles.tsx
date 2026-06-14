import { Link } from "@tanstack/react-router";
import { articles, getCategory } from "@/content/helpCenter";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export function RelatedArticles({ excludeSlug }: { excludeSlug: string }) {
  // Find current article to check category
  const currentArticle = articles.find((a) => a.slug === excludeSlug);
  const categorySlug = currentArticle?.categorySlug;

  // Get articles in same category (excluding current)
  let items = articles.filter((a) => a.categorySlug === categorySlug && a.slug !== excludeSlug);

  // Fallback to general articles if same-category articles are less than 3
  if (items.length < 3) {
    const fallback = articles.filter(
      (a) => a.slug !== excludeSlug && !items.find((item) => item.slug === a.slug),
    );
    items = [...items, ...fallback].slice(0, 3);
  } else {
    items = items.slice(0, 3);
  }

  return (
    <section className="mt-12 border-t border-ks-border pt-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-ks-accent" />
        <h3 className="text-[16px] font-bold text-ks-text">Artigos Recomendados</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((a) => {
          const cat = getCategory(a.categorySlug);
          return (
            <Link
              key={a.slug}
              to="/artigo/$slug"
              params={{ slug: a.slug }}
              className="group flex flex-col justify-between p-4 bg-white hover:bg-ks-surface border border-ks-border hover:border-ks-border-hover rounded-lg transition-all duration-200 shadow-sm hover:shadow"
            >
              <div>
                <span className="inline-block text-[11px] font-bold text-ks-accent bg-ks-accent/10 px-2 py-0.5 rounded mb-2">
                  {cat?.title}
                </span>
                <h4 className="text-[13px] font-semibold text-ks-text group-hover:text-ks-accent transition-colors duration-150 line-clamp-2">
                  {a.title}
                </h4>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-ks-border text-[11px] text-ks-muted">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {a.readMinutes} min
                </span>
                <span className="inline-flex items-center gap-0.5 font-semibold text-ks-accent group-hover:translate-x-0.5 transition-transform">
                  Ler <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
