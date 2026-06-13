import { Link } from "@tanstack/react-router";
import { categories } from "@/content/helpCenter";
import { useSearch } from "@/context/SearchContext";

function matches(text: string, q: string) {
  return text.toLowerCase().includes(q.toLowerCase());
}

export function CategoryGrid() {
  const { query } = useSearch();
  const q = query.trim();

  const filtered = categories.map((cat) => ({
    cat,
    isMatch: !q || matches(cat.title, q) || matches(cat.description, q),
  }));
  const noResults = q && filtered.every((f) => !f.isMatch);

  return (
    <section id="categorias" className="bg-ks-bg py-8">
      {noResults ? (
        <div className="mx-auto max-w-[900px] px-6">
          <p className="text-center text-[15px] text-ks-text-secondary py-10">
            Nenhum resultado encontrado para "{q}"
          </p>
        </div>
      ) : (
        <div className="category-grid">
          {filtered.map(({ cat, isMatch }) => {
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
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
