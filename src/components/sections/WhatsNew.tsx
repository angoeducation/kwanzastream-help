import { whatsNew } from "@/content/helpCenter";

export function WhatsNew() {
  return (
    <section id="novidades" className="bg-ks-surface border-t border-ks-border py-14">
      <div className="mx-auto max-w-[960px] px-6">
        <h2 className="text-[22px] font-semibold text-ks-text">Novidades e Actualizações</h2>
        <p className="text-[14px] text-ks-muted mt-1">Últimas mudanças na plataforma.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {whatsNew.map((item) => (
            <article
              key={item.slug}
              className="bg-ks-surface border border-ks-border rounded-lg p-5 transition-all duration-150 hover:border-ks-border-hover"
              style={{ boxShadow: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-ks-muted">
                  {item.date}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-ks-accent-subtle text-ks-accent">
                  {item.badge}
                </span>
              </div>
              <h3 className="mt-2.5 text-[15px] font-semibold text-ks-text leading-[1.4]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] text-ks-text-secondary leading-[1.5] line-clamp-3">
                {item.description}
              </p>
              <a
                href="#"
                className="inline-block mt-3 text-[13px] font-medium text-ks-accent hover:underline"
              >
                Ler mais →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
