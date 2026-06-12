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
    <section id="categorias" className="bg-[#F7F7F8] py-8">
      <div className="mx-auto max-w-[960px] px-6">
        {noResults ? (
          <p className="text-center text-[15px] text-[#53535F] py-10">
            Nenhum resultado encontrado para "{q}"
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(({ cat, isMatch }) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  to="/categoria/$slug"
                  params={{ slug: cat.slug }}
                  className="group flex flex-col items-center justify-center p-8 rounded border border-[#E4E4E7] bg-white hover:border-[#C4C4CC] transition-colors duration-150"
                  style={{
                    opacity: isMatch ? 1 : 0.3,
                  }}
                >
                  <Icon className="w-12 h-12 text-[#ADADB8] stroke-[1] mb-3" />
                  <h3 className="text-[17px] font-bold text-[#0E0E10] text-center">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-[12px] text-[#53535F] leading-relaxed text-center max-w-[300px]">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
