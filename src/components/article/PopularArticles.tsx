import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { getPopularArticles } from '@/content/helpCenter';

export function PopularArticles({ excludeSlug }: { excludeSlug?: string }) {
  const { t } = useTranslation();
  const popular = getPopularArticles(6)
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, 5);

  if (popular.length === 0) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <h3
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 12,
        }}
      >
        {t('article.popular_articles')}
      </h3>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {popular.map((article) => (
          <li key={article.slug}>
            <Link
              to="/artigo/$slug"
              params={{ slug: article.slug }}
              style={{ color: '#9147FF', fontSize: 14, textDecoration: 'none' }}
              className="hover:underline"
            >
              {t(`articles.${article.slug}.title`, article.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
