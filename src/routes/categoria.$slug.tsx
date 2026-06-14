import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, getCategory, getCategoryArticles } from "@/content/helpCenter";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { ArrowRight } from "lucide-react";

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
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="text-[28px] font-semibold mb-3 text-ks-text">Categoria não encontrada</h1>
      <Link to="/" className="text-ks-accent hover:underline">Voltar à Central de Ajuda</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="text-[28px] font-semibold text-ks-text">Erro ao carregar categoria</h1>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const articles = getCategoryArticles(cat.slug);
  const related = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);

  return (
    <div className="bg-ks-bg py-14">
      <div className="mx-auto max-w-[960px] px-6">
        <Breadcrumb
          items={[
            { label: "Início", to: "/" },
            { label: cat.title },
          ]}
        />

        <div className="mt-6">
          <h1 className="text-[28px] font-semibold text-ks-text">{cat.title}</h1>
          <p className="mt-2 text-[15px] text-ks-text-secondary max-w-2xl">{cat.description}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
          <section className="bg-ks-surface border border-ks-border rounded-lg px-6">
            {articles.length > 0 ? (
              <ul>
                {articles.map((a, idx) => (
                  <li key={a.slug}>
                    <Link
                      to="/artigo/$slug"
                      params={{ slug: a.slug }}
                      className={`group flex items-center justify-between py-4 ${
                        idx < articles.length - 1 ? "border-b border-ks-border" : ""
                      }`}
                    >
                      <div className="flex items-center min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-ks-accent mr-3 flex-none" />
                        <p className="text-[15px] font-medium text-ks-text group-hover:text-ks-accent transition-colors duration-150">
                          {a.title}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-none ml-4">
                        <span className="text-[12px] text-ks-muted">{a.readMinutes} min</span>
                        <ArrowRight className="w-3.5 h-3.5 text-ks-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-8 text-center text-[14px] text-ks-muted">
                Ainda não há artigos nesta categoria.
              </p>
            )}
          </section>

          <aside className="hidden lg:block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ks-muted mb-3">
              Categorias relacionadas
            </p>
            <ul className="space-y-1">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: c.slug }}
                    className="block py-2 text-[14px] text-ks-text-secondary hover:text-ks-text transition-colors duration-150"
                  >
                    {c.title}
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
            <span>Contactar Suporte</span>
            <svg className="w-4.5 h-4.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
