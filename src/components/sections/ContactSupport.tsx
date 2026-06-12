import { Headphones, MessageCircle, Twitter, MessagesSquare, ChevronRight } from "lucide-react";

const community = [
  { Icon: MessageCircle, label: "Servidor Discord", meta: "12.400 membros" },
  { Icon: Twitter, label: "Twitter / X", meta: "@KwanzaStream" },
  { Icon: MessagesSquare, label: "Fórum de Criadores", meta: "Faz perguntas à comunidade" },
];

export function ContactSupport() {
  return (
    <section className="bg-ks-bg py-14">
      <div className="mx-auto max-w-[960px] px-6 grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-4">
        <div className="bg-ks-surface border border-ks-border rounded-lg p-7">
          <Headphones className="w-[22px] h-[22px] text-ks-text-secondary" strokeWidth={1.75} />
          <h3 className="mt-3 text-[20px] font-semibold text-ks-text">Ainda tens dúvidas?</h3>
          <p className="mt-1.5 text-[14px] text-ks-text-secondary leading-[1.5]">
            A nossa equipa está disponível de Segunda a Sábado, das 8h às 22h (WAT).
          </p>

          <div className="mt-5 space-y-2">
            <button className="w-full h-10 rounded-md bg-ks-accent text-white text-[14px] font-medium hover:bg-ks-accent-hover transition-colors duration-150">
              Abrir ticket de suporte
            </button>
            <button className="w-full h-10 rounded-md border border-ks-border-hover bg-transparent text-[14px] font-medium text-ks-text hover:bg-ks-surface-2 transition-colors duration-150 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ks-success" />
              <span>Chat ao vivo</span>
              <span className="text-[13px] text-ks-text-secondary">· Online agora</span>
            </button>
          </div>

          <p className="mt-3 text-[12px] text-ks-muted">Tempo médio de resposta: 2 horas</p>
        </div>

        <div className="bg-ks-surface border border-ks-border rounded-lg p-7">
          <h3 className="text-[18px] font-semibold text-ks-text">Comunidade</h3>
          <p className="mt-1 text-[13px] text-ks-muted">Junta-te a outros criadores KwanzaStream.</p>

          <div className="mt-4">
            {community.map(({ Icon, label, meta }, i) => (
              <a
                key={label}
                href="#"
                className={`flex items-center px-3 -mx-3 py-3 hover:bg-ks-bg transition-colors duration-150 ${
                  i < community.length - 1 ? "border-b border-ks-border" : ""
                }`}
              >
                <Icon className="w-[18px] h-[18px] text-ks-muted mr-3 flex-none" strokeWidth={1.75} />
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-ks-text">{label}</p>
                  <p className="text-[12px] text-ks-muted">{meta}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-ks-muted flex-none" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
