import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X, LogOut, User, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { categories } from "@/content/helpCenter";

export function Navbar() {
  const { t } = useTranslation();
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
    <header className="sticky top-0 z-[100] bg-[#9146FF] text-white">
      <div className="mx-auto max-w-[1200px] px-6 h-[56px] flex items-center justify-between">
        
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
 
          {/* Logo isotipo (hidden on mobile, shown on desktop) */}
          <Link to="/" className="hidden md:flex items-center hover:opacity-90">
            <img
              src="/brand/wordmark.png"
              alt="Kwanza Stream"
              className="h-[26px] w-auto select-none"
              draggable={false}
            />
          </Link>
 
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-semibold">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTopicsOpen((v) => !v);
                }}
                className="flex items-center gap-1 text-sm font-semibold text-white bg-transparent border-none outline-none px-3 py-2 rounded opacity-90 hover:opacity-100 hover:bg-white/15 transition-all cursor-pointer"
              >
                {t("nav.topics")} <ChevronDown className="w-3.5 h-3.5 mt-0.5" />
              </button>
 
              {topicsOpen && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1.5 text-[13px] z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to="/categoria/$slug"
                      params={{ slug: cat.slug }}
                      className="block px-4 py-2 text-[#0E0E10] hover:text-[#9146FF] hover:bg-gray-50 transition-colors"
                    >
                      {t(`categories.${cat.slug}.title`)}
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    to="/catalogo"
                    className="block px-4 py-2 text-[#9146FF] font-semibold hover:bg-gray-50 transition-colors"
                  >
                    {t("nav.more_topics")}
                  </Link>
                </div>
              )}
            </div>
 
            <Link
              to="/catalogo"
              className="text-sm font-semibold text-white no-underline px-3 py-2 rounded opacity-90 hover:opacity-100 hover:bg-white/15 transition-all"
            >
              {t("nav.catalog")}
            </Link>
            <Link
              to="/pesquisa"
              className="text-sm font-semibold text-white no-underline px-3 py-2 rounded opacity-90 hover:opacity-100 hover:bg-white/15 transition-all"
            >
              {t("nav.search")}
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
          ) : auth.status === "authenticated" ? (
            /* User menu button when authenticated */
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileOpen((v) => !v);
                }}
                className="flex items-center gap-2 p-1 md:p-0 bg-transparent border-none text-white cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={auth.user.profile_image_url}
                    alt={auth.user.display_name}
                    className="w-7 h-7 rounded border border-white/25"
                  />
                  <span className="text-sm font-semibold hidden lg:inline">
                    {auth.user.display_name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 mt-0.5 hidden md:inline" />
                </div>
              </button>
 
               {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded shadow-lg border border-gray-150 py-1 text-[13px] z-50 text-[#0E0E10]">
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-50 text-[#0E0E10]"
                  >
                    {t("nav.home")}
                  </Link>
                  <a
                    href="https://kwanzastream.com"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-2 hover:bg-gray-50 text-[#0E0E10]"
                  >
                    {t("nav.back_to_ks")}
                  </a>
                  <Link
                    to="/contacto"
                    className="block px-4 py-2 hover:bg-gray-50 text-[#0E0E10]"
                  >
                    {t("nav.contact_support")}
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={auth.logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[#0E0E10] border-none bg-transparent cursor-pointer font-semibold"
                  >
                    {t("nav.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* When not authenticated */
            <div className="flex items-center gap-2">
              <button
                onClick={auth.login}
                className="hidden md:block text-sm font-semibold text-white border-none bg-transparent cursor-pointer px-3 py-2 hover:bg-white/15 rounded transition-all"
              >
                {t("nav.login")}
              </button>
              <button
                onClick={auth.login}
                className="md:hidden w-7 h-7 rounded bg-[#ffffff]/10 hover:bg-[#ffffff]/20 border border-white/20 text-white flex items-center justify-center cursor-pointer"
                aria-label={t("nav.login")}
              >
                <User className="w-5 h-5" />
              </button>
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
              <span className="font-black text-[16px] tracking-wider text-[#9146FF]">{t("nav.menu")}</span>
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
                {t("nav.home")}
              </Link>

              {/* Collapsible Tópicos accordion */}
              <div>
                <button
                  onClick={() => setMobileTopicsOpen((v) => !v)}
                  className="w-full flex items-center justify-between py-3 border-b border-gray-100 hover:text-[#9146FF] bg-transparent text-left font-bold text-[14px] border-none cursor-pointer"
                >
                  <span>{t("nav.topics")}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      mobileTopicsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileTopicsOpen && (
                  <div className="pl-4 bg-gray-50 flex flex-col py-1 text-[13px] font-semibold animate-in slide-in-from-top duration-150">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to="/categoria/$slug"
                        params={{ slug: cat.slug }}
                        onClick={() => setOpen(false)}
                        className="py-2.5 hover:text-[#9146FF]"
                      >
                        {t(`categories.${cat.slug}.title`)}
                      </Link>
                    ))}
                    <div className="border-t border-gray-150 my-1" />
                    <Link
                      to="/catalogo"
                      onClick={() => setOpen(false)}
                      className="py-2.5 text-[#9146FF] font-bold"
                    >
                      {t("nav.more_topics")}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/catalogo"
                onClick={() => setOpen(false)}
                className="py-3 border-b border-gray-100 hover:text-[#9146FF]"
              >
                {t("nav.catalog")}
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
