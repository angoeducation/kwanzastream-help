import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const columns = [
    {
      title: t("footer.col_kwanzastream"),
      links: [
        { label: "Sobre", key: "Sobre" },
        { label: "Blog", key: "Blog" },
        { label: "Marca", key: "Marca" },
        { label: "Carreiras", key: "Carreiras" },
        { label: "Imprensa", key: "Imprensa" }
      ],
    },
    {
      title: t("footer.col_programas"),
      links: [
        { label: "Afiliados", key: "Afiliados" },
        { label: "Parceiros", key: "Parceiros" },
        { label: "Publicidade", key: "Publicidade" },
        { label: "Desenvolvedores", key: "Desenvolvedores" }
      ],
    },
    {
      title: t("footer.col_recursos"),
      links: [
        { label: "Salos", key: "Salos" },
        { label: "Premium", key: "Premium" },
        { label: "Extensões", key: "Extensões" },
        { label: "Plataformas", key: "Plataformas" },
        { label: "Música", key: "Música" }
      ],
    },
    {
      title: t("footer.col_legal"),
      links: [
        { label: "Telemóvel", key: "Telemóvel" },
        { label: "Jurídico", key: "Jurídico" },
        { label: "Privacidade", key: "Privacidade" },
        { label: "RGPD Angola", key: "RGPD Angola" }
      ],
    },
  ];

  // Flattened list of links for mobile display matching image 5
  const allMobileLinks = [
    "Sobre",
    "Carreiras",
    "Blog",
    "Imprensa",
    "Marca",
    "Desenvolvedores",
    "Plataformas",
  ];

  return (
    <footer className="bg-[#0e0e0e] text-[#adadb8] mt-auto border-t border-[#1f1f23]" style={{ padding: '48px 24px 32px' }}>
      {/* Desktop Footer (hidden on mobile) */}
      <div className="hidden md:grid mx-auto max-w-[1200px] px-6 grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">
        {/* Left Side: White Logo Block + Language Selector */}
        <div className="flex flex-col gap-5 items-start">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <div className="w-[30px] h-[30px] bg-white rounded flex items-center justify-center font-black text-black text-[17px] select-none">
              K
            </div>
            <span className="font-['Rajdhani'] font-bold text-[22px] tracking-wider text-white">
              Kwanza Stream
            </span>
          </Link>
          <p className="text-[12px] leading-relaxed text-[#adadb8]/70">
            {t("footer.tagline")}
          </p>
          <div className="mt-2 flex flex-col gap-1.5 items-start">
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)' }}>
              {t("footer.language_label")}
            </span>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Right Side: Contact + Columns */}
        <div className="flex flex-col gap-8">
          {/* Contact Support above links */}
          <div className="flex justify-start">
            <Link
              to="/contacto"
              className="hover:text-[#772ce8] flex items-center gap-1 transition-colors"
              style={{ color: '#9147ff', fontSize: '0.875rem', fontWeight: 600 }}
            >
              {t("footer.contact_support")} &rarr;
            </Link>
          </div>

          {/* 4 columns of links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
                  {col.title}
                </h4>
                <ul className="space-y-2" style={{ fontSize: '0.875rem', fontWeight: 400, color: '#adadb8' }}>
                  {col.links.map((link) => (
                    <li key={link.key}>
                      <Link to="/" className="hover:text-white transition-colors duration-150">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Footer (shown on mobile only) */}
      <div className="md:hidden px-6">
        {/* Language Selector matching image 5 */}
        <div className="flex items-center justify-end mb-6">
          <LanguageSwitcher />
        </div>

        <div className="flex items-center justify-between py-4 border-b border-[#1f1f23]">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            <div className="w-[26px] h-[26px] bg-white rounded flex items-center justify-center font-black text-black text-[15px] select-none">
              K
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Collapsible links list */}
        {mobileOpen && (
          <div className="mt-4 flex flex-col text-[14px] font-semibold">
            {/* Contatar Apoio item */}
            <Link
              to="/contacto"
              className="py-3 border-b border-[#1f1f23] hover:text-white text-[#9147ff]"
            >
              {t("footer.contact_support")}
            </Link>

            {allMobileLinks.map((link) => (
              <Link
                key={link}
                to="/"
                className="py-3 border-b border-[#1f1f23] hover:text-white text-[#adadb8]"
              >
                {link}
              </Link>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}
