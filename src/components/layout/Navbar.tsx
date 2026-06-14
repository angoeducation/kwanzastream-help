import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, LogOut, User, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    if (!topicsOpen) return;
    const onClick = () => setTopicsOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [topicsOpen]);

  useEffect(() => {
    if (!profileOpen) return;
    const onClick = () => setProfileOpen(false);
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [profileOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-[100] bg-[#9147ff] text-white">
      <div className="mx-auto max-w-[1200px] px-6 h-[50px] flex items-center justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-6">
          {/* Hamburger menu for mobile (Far Left) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menu"
            className="md:hidden p-1 opacity-90 hover:opacity-100 cursor-pointer border-none bg-transparent text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Logo (hidden on mobile, shown on desktop) */}
          <Link to="/" className="hidden md:flex items-center gap-2 hover:opacity-90">
            <div className="w-[26px] h-[26px] bg-white rounded flex items-center justify-center font-black text-[#9147ff] text-[15px] select-none">
              K
            </div>
            <span className="font-['Rajdhani'] font-bold text-[20px] tracking-wider">
              Kwanza Stream
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
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
          {/* Search Icon for mobile (Far Right) */}
          <Link
            to="/pesquisa"
            className="md:hidden p-1.5 opacity-90 hover:opacity-100 text-white cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </Link>

          {auth.status === "loading" ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            /* User menu button (both Desktop and Mobile layout) */
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen((v) => !v);
                }}
                className="flex items-center gap-2 p-1 md:p-0 bg-transparent border-none text-white cursor-pointer select-none"
              >
                {auth.status === "authenticated" ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={auth.user.profile_image_url}
                      alt={auth.user.display_name}
                      className="w-7 h-7 rounded border border-white/25"
                    />
                    <span className="text-[13px] font-semibold hidden lg:inline">
                      {auth.user.display_name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 mt-0.5 hidden md:inline" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded bg-[#ffffff]/10 hover:bg-[#ffffff]/20 border border-white/20 text-white flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-lg border border-gray-150 py-1 text-[13px] z-50 text-[#0E0E10]">
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-50 text-[#0E0E10]"
                  >
                    Página inicial
                  </Link>
                  <a
                    href="https://kwanzastream.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-2 hover:bg-gray-50 text-[#0E0E10]"
                  >
                    Voltar à Kwanza Stream
                  </a>
                  <Link
                    to="/contacto"
                    className="block px-4 py-2 hover:bg-gray-50 text-[#0E0E10]"
                  >
                    Contactar Suporte
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  {auth.status === "authenticated" ? (
                    <button
                      onClick={auth.logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#0E0E10] border-none bg-transparent cursor-pointer font-semibold"
                    >
                      Terminar sessão
                    </button>
                  ) : (
                    <button
                      onClick={auth.login}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#0E0E10] border-none bg-transparent cursor-pointer font-semibold"
                    >
                      Entrar
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer (Left Sidebar Drawer matching image 2 and 3) */}
      {open && (
        <>
          {/* Backdrop dimming layer */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Sidebar Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-white text-[#0E0E10] z-50 md:hidden shadow-lg p-5 flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="font-black text-[16px] tracking-wider text-[#9146FF]">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-[#0E0E10] cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="mt-4 flex flex-col text-[14px] font-bold">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="py-3 border-b border-gray-100 hover:text-[#9146FF]"
              >
                Início
              </Link>
              
              {/* Collapsible Tópicos accordion */}
              <div>
                <button
                  onClick={() => setMobileTopicsOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#9146FF] bg-transparent text-left font-bold text-[14px] border-none cursor-pointer"
                >
                  <span>Tópicos</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileTopicsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileTopicsOpen && (
                  <div className="pl-4 bg-gray-50 flex flex-col py-1 text-[13px] font-semibold animate-in slide-in-from-top duration-150">
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "comecar" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Começar
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "programa-afiliados" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Programa de Afiliados
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "programa-parceiros" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Programa de Parceiros
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "moderacao-seguranca" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Moderação e Segurança
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "pagamentos-salos" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Pagamentos e Salos
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "ks-premium" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Kwanza Stream Premium
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "aplicacao-movel" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Aplicação Móvel
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "ks-studio" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Kwanza Stream Studio
                    </Link>
                    <Link
                      to="/categoria/$slug"
                      params={{ slug: "eventos-torneios" }}
                      onClick={() => setOpen(false)}
                      className="py-2.5 hover:text-[#9146FF]"
                    >
                      Eventos e Torneios
                    </Link>
                    <div className="border-t border-gray-150 my-1" />
                    <Link
                      to="/catalogo"
                      onClick={() => setOpen(false)}
                      className="py-2.5 text-[#9146FF] font-bold"
                    >
                      Mais tópicos...
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/catalogo"
                onClick={() => setOpen(false)}
                className="py-3 border-b border-gray-100 hover:text-[#9146FF]"
              >
                Catálogo de Tópicos
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
