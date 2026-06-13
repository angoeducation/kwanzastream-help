import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (!topicsOpen) return;
    const onClick = () => setTopicsOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [topicsOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!profileOpen) return;
    const onClick = () => setProfileOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [profileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#9147ff] text-white">
      <div className="mx-auto max-w-[1200px] px-6 h-[50px] flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-90">
            {/* Kwanza Stream Logo Block */}
            <div className="w-[26px] h-[26px] bg-white rounded flex items-center justify-center font-black text-[#9147ff] text-[15px] select-none">
              K
            </div>
            <span className="font-['Rajdhani'] font-bold text-[20px] tracking-wider">
              Kwanza Stream
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 text-[13px] font-semibold">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTopicsOpen((v) => !v);
                }}
                className="flex items-center gap-1 opacity-90 hover:opacity-100 transition-opacity cursor-pointer text-[13px] font-semibold text-white bg-transparent border-none outline-none"
              >
                Tópicos <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
              </button>

              {topicsOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1.5 text-[13px] z-50">
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "comecar" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Começar
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "programa-afiliados" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Programa de Afiliados
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "programa-parceiros" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Programa de Parceiros
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "moderacao-seguranca" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Moderação e Segurança
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "pagamentos-salos" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Pagamentos e Salos
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "ks-premium" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Kwanza Stream Premium
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "aplicacao-movel" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Aplicação Móvel
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "ks-studio" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Kwanza Stream Studio
                  </Link>
                  <Link
                    to="/categoria/$slug"
                    params={{ slug: "eventos-torneios" }}
                    className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                  >
                    Eventos e Torneios
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    to="/catalogo"
                    className="block px-4 py-2 text-[#9146FF] font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Mais tópicos...
                  </Link>
                </div>
              )}
            </div>

            <Link to="/catalogo" className="opacity-90 hover:opacity-100 transition-opacity">
              Catálogo
            </Link>
            <Link to="/pesquisa" className="opacity-90 hover:opacity-100 transition-opacity">
              Pesquisar
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {auth.status === "loading" ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : auth.status === "authenticated" ? (
            /* Profile dropdown */
            <div className="relative hidden md:block">
              <button
                onClick={(e) => { e.stopPropagation(); setProfileOpen((v) => !v); }}
                className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity"
              >
                <img
                  src={auth.user.profile_image_url}
                  alt={auth.user.display_name}
                  className="w-7 h-7 rounded-full border-2 border-white/40"
                />
                <span className="text-[13px] font-semibold hidden lg:inline">
                  {auth.user.display_name}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 text-[13px]">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-semibold text-[#0E0E10]">{auth.user.display_name}</p>
                    <p className="text-[#53535F] text-[12px] truncate">{auth.user.email}</p>
                  </div>
                  <a
                    href={`https://kwanzastream.com/${auth.user.login}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-[#0E0E10] hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" /> Ver perfil
                  </a>
                  <button
                    onClick={auth.logout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-left text-[#0E0E10] hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" /> Terminar sessão
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={auth.login}
              className="hidden md:inline-flex text-[13px] font-semibold opacity-90 hover:opacity-100 transition-opacity"
            >
              Entrar
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            className="md:hidden p-1 opacity-90 hover:opacity-100"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="md:hidden bg-[#772CE8] border-t border-[#8238FF] text-[13px] font-semibold py-2">
          <Link
            to="/catalogo"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between w-full px-6 py-3 hover:bg-[#8238FF]/40"
          >
            <span>Tópicos</span>
            <ChevronDown className="w-4 h-4" />
          </Link>
          <Link
            to="/catalogo"
            onClick={() => setOpen(false)}
            className="block px-6 py-3 hover:bg-[#8238FF]/40"
          >
            Catálogo de Tópicos
          </Link>
          <Link
            to="/pesquisa"
            onClick={() => setOpen(false)}
            className="block px-6 py-3 hover:bg-[#8238FF]/40"
          >
            Pesquisar
          </Link>
          {auth.status === "authenticated" ? (
            <button
              onClick={() => { setOpen(false); auth.logout(); }}
              className="block w-full text-left px-6 py-3 hover:bg-[#8238FF]/40 text-white/90"
            >
              Terminar sessão ({auth.user.display_name})
            </button>
          ) : (
            <button
              onClick={() => { setOpen(false); auth.login(); }}
              className="block w-full text-left px-6 py-3 hover:bg-[#8238FF]/40 text-white/90"
            >
              Entrar
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
