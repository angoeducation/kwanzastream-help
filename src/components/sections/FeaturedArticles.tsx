import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { featuredArticles, getCategory } from "@/content/helpCenter";

export function FeaturedArticles() {
  return (
    <section className="bg-ks-surface border-y border-ks-border py-14">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="text-[22px] font-semibold text-ks-text mb-6">Artigos mais lidos</h2>

        <ul>
          {featuredArticles.map((a, idx) => {
            const cat = getCategory(a.categorySlug);
            return (
              <li key={a.slug}>
                <Link
                  to="/artigo/$slug"
                  params={{ slug: a.slug }}
                  className={`group flex items-center justify-between py-4 ${
                    idx < featuredArticles.length - 1 ? "border-b border-ks-border" : ""
                  }`}
                >
                  <div className="flex items-center min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-ks-accent mr-3 flex-none" />
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-ks-text group-hover:text-ks-accent transition-colors duration-150 truncate">
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

        <a
          href="#"
          className="inline-block mt-6 text-[14px] font-medium text-ks-accent hover:underline"
        >
          Ver todos os artigos →
        </a>
      </div>
    </section>
  );
}
