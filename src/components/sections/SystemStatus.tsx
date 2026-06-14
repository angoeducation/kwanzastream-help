import { Activity } from "lucide-react";

const indicators = [
  { label: "Streaming", color: "var(--ks-success)" },
  { label: "Chat", color: "var(--ks-success)" },
  { label: "VODs", color: "var(--ks-success)" },
  { label: "API", color: "var(--ks-warning)" },
];

export function SystemStatus() {
  return (
    <section id="estado" className="bg-ks-bg py-8">
      <div className="mx-auto max-w-[960px] px-6">
        <div className="bg-ks-surface border border-ks-border rounded-lg px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-start">
            <Activity
              className="w-[18px] h-[18px] text-ks-success mt-0.5 mr-2.5 flex-none"
              strokeWidth={2}
            />
            <div>
              <p className="text-[15px] font-medium text-ks-text">Todos os sistemas operacionais</p>
              <p className="text-[13px] text-ks-muted">Última verificação: há 3 minutos</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {indicators.map((ind) => (
              <span
                key={ind.label}
                className="flex items-center gap-1.5 text-[13px] text-ks-text-secondary"
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ind.color }} />
                {ind.label}
              </span>
            ))}
            <a href="#" className="text-[13px] text-ks-accent hover:underline">
              Ver histórico →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
