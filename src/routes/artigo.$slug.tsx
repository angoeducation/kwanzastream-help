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
          { name: "description", content: `${loaderData.cat?.title ?? ""} — guia oficial da Kwanza Stream.` },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="py-24 text-center px-4">
      <h1 className="text-[28px] font-semibold mb-3 text-ks-text">Artigo não encontrado</h1>
      <Link to="/" className="text-ks-accent hover:underline">Voltar à Central de Ajuda</Link>
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

  return (
    <div className="bg-ks-bg py-14">
      <article className="mx-auto max-w-[720px] px-6">
        <Breadcrumb
          items={[
            { label: "Início", to: "/" },
            cat
              ? { label: cat.title, to: "/categoria/$slug", params: { slug: cat.slug } }
              : { label: "Artigo" },
            { label: article.title },
          ]}
        />

        <h1
          className="mt-6 text-ks-text font-bold"
          style={{ fontSize: "32px", lineHeight: 1.25, letterSpacing: "-0.01em" }}
        >
          {article.title}
        </h1>
        <p className="mt-3 text-[13px] text-ks-muted">
          Atualizado em 15 de Maio de 2026 · {article.readMinutes} min de leitura
        </p>

        <hr className="my-8 border-t border-ks-border" />

        {/* Render actual article body HTML */}
        <div
          className="article-body space-y-5 text-[15px] text-ks-text leading-[1.7]"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <style>{`
          .article-body h2 {
            font-size: 22px;
            font-weight: 600;
            padding-top: 12px;
            color: var(--ks-text);
          }
          .article-body ul {
            list-style-type: disc;
            padding-left: 1.5rem;
          }
          .article-body li {
            margin-bottom: 6px;
          }
          .article-body strong {
            font-weight: 600;
          }
        `}</style>

        <FeedbackWidget />
        <RelatedArticles excludeSlug={article.slug} />
      </article>
    </div>
  );
}
