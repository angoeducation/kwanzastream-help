import { Link } from "@tanstack/react-router";

const columns = [
  {
    title: "Kwanza Stream",
    links: ["Sobre", "Blog", "Marca", "Carreiras", "Imprensa"],
  },
  {
    title: "Programas",
    links: ["Afiliados", "Parceiros", "Publicidade", "Desenvolvedores"],
  },
  {
    title: "Recursos",
    links: ["Salos", "Premium", "Extensões", "Plataformas", "Música"],
  },
  {
    title: "Legal",
    links: ["Telemóvel", "Jurídico", "Privacidade", "RGPD Angola"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0e0e0e] text-[#adadb8] py-12 mt-auto border-t border-[#1f1f23]">
      <div className="mx-auto max-w-[1200px] px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        {/* Left Side: White Logo Block */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <div className="w-[30px] h-[30px] bg-white rounded flex items-center justify-center font-black text-black text-[17px] select-none">
              K
            </div>
            <span className="font-['Rajdhani'] font-bold text-[22px] tracking-wider text-white">
              Kwanza Stream
            </span>
          </Link>
          <p className="text-[12px] leading-relaxed text-[#adadb8]/70">
            A Kwanza Stream é a plataforma de streaming feita para criadores angolanos.
          </p>
        </div>

        {/* Right Side: Contact + Columns */}
        <div className="flex flex-col gap-8">
          {/* Contact Support above links */}
          <div className="flex justify-start">
            <Link
              to="/contacto"
              className="text-[#9147ff] hover:text-[#772ce8] text-[15px] font-bold flex items-center gap-1 transition-colors"
            >
              Contatar Apoio &rarr;
            </Link>
          </div>

          {/* 4 columns of links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/50 mb-3">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-[13px] font-semibold text-[#adadb8]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/"
                        className="hover:text-white transition-colors duration-150"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
