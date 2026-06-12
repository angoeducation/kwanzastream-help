import { Globe } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section className="bg-white border-b border-[#E4E4E7] pb-6">
      <div className="mx-auto max-w-[960px] px-6 pt-12 text-center">
        <h1
          className="text-[#0E0E10] font-bold tracking-tight text-center"
          style={{ fontSize: "36px", lineHeight: 1.2 }}
        >
          Olá! Como podemos ajudar?
        </h1>

        <div className="mt-6">
          <SearchBar />
        </div>

        <p className="mt-4 text-[13px] font-semibold text-[#53535F] text-center">
          Pesquisa na Base de Conhecimento ou consulta tópicos específicos abaixo.
        </p>
      </div>

      {/* Sub-hero Action Bar */}
      <div className="mx-auto max-w-[960px] px-6 mt-6 flex items-center justify-end gap-3 text-[12px]">
        <a
          href="https://instagram.com/kwanzastream"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 bg-[#9147ff] text-white px-3.5 py-[7px] rounded font-bold hover:bg-[#772CE8] transition-colors"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 stroke-current text-white fill-none"
            strokeWidth={2}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          Segue-nos no Instagram
        </a>
        
        <button className="flex items-center gap-1 bg-white border border-[#E4E4E7] text-[#53535F] px-3.5 py-[7px] rounded font-bold hover:bg-[#F2F2F4] transition-colors">
          <Globe className="w-3.5 h-3.5 text-[#53535F]" />
          <span>Português (Angola)</span>
          <span className="text-[8px] ml-1">▼</span>
        </button>
      </div>
    </section>
  );
}
