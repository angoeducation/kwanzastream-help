import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const columns = [
    { label1: "Sobre", label2: "Carreiras", key: "sobre-carreiras" },
    { label1: "Blogue", label2: "Imprensa", key: "blog-imprensa" },
    { label1: "Marca", label2: "Desenvolvedores", key: "marca-devs" },
    { label1: "Plataformas", label2: "Prime", key: "plat-prime" },
    { label1: "Bits", label2: "Extensões", key: "bits-exts" },
    { label1: "Anúncios", label2: "Música", key: "ads-music" },
    { label1: "Parceiros", label2: "Afiliados", key: "partners-affs" },
    { label1: "Telemóvel", label2: "Jurídico", key: "mobile-legal" },
  ];

  return (
    <footer className="bg-[#000000] text-[#adadb8] mt-auto border-t border-[#1f1f23] py-10">
      <div className="mx-auto max-w-[1200px] px-6 flex flex-col items-center gap-10">
        
        {/* Top Centered Language Selector */}
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>

        {/* Desktop Footer Content (Logo + 8 columns) */}
        <div className="hidden md:flex w-full items-start justify-between gap-12 border-t border-[#1f1f23] pt-10">
          {/* Logo on Left */}
          <div className="flex-none">
            <Link to="/" className="flex items-center hover:opacity-90">
              <img
                src="/brand/wordmark.png"
                alt="Kwanza Stream"
                className="h-[30px] w-auto select-none brightness-0 invert"
                draggable={false}
              />
            </Link>
          </div>

          {/* 8 Columns on Right */}
          <div className="flex-1 grid grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 text-[13px] font-semibold">
            {columns.map((col) => (
              <div key={col.key} className="flex flex-col gap-2">
                <Link to="/" className="hover:text-white transition-colors">
                  {col.label1}
                </Link>
                <Link to="/" className="hover:text-white transition-colors">
                  {col.label2}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Footer Content */}
        <div className="md:hidden w-full border-t border-[#1f1f23] pt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center hover:opacity-90">
              <img
                src="/brand/wordmark.png"
                alt="Kwanza Stream"
                className="h-[24px] w-auto select-none brightness-0 invert"
                draggable={false}
              />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1 hover:text-white transition-colors border-none bg-transparent cursor-pointer text-[#adadb8]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {mobileOpen && (
            <div className="grid grid-cols-2 gap-4 text-[13px] font-semibold mt-2">
              {columns.map((col) => (
                <div key={col.key} className="flex flex-col gap-2">
                  <Link to="/" className="hover:text-white transition-colors">
                    {col.label1}
                  </Link>
                  <Link to="/" className="hover:text-white transition-colors">
                    {col.label2}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
