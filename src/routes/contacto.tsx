import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/context/AuthContext";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { CheckCircle, X, MessageSquare, Mail, AlertTriangle, ShieldAlert, ArrowRight, Twitter } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contactar Suporte — Kwanza Stream Ajuda" },
      { name: "description", content: "Envia um pedido de suporte para a equipa da Kwanza Stream." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const auth = useAuth();
  const isLoggedIn = auth.status === "authenticated";

  const [showChoiceModal, setShowChoiceModal] = useState(true);
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    phoneCode: "+244",
    phoneNum: "",
    category: "Geral",
    description: "",
  });

  const openChat = () => {
    if (window.Tawk_API && typeof window.Tawk_API.maximize === "function") {
      window.Tawk_API.maximize();
      setShowChoiceModal(false);
    } else {
      alert("O chat está a carregar... Por favor, tenta novamente em segundos.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recaptchaChecked) return;
    setSubmitted(true);
  };

  if (auth.status === "loading") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-[#F7F7F8]">
        <div className="w-8 h-8 border-4 border-[#9147ff]/40 border-t-[#9147ff] rounded-full animate-spin" />
      </div>
    );
  }

  // Login Restriction Wall
  if (!isLoggedIn) {
    return (
      <div className="bg-[#F7F7F8] py-14 min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-[480px] px-6 w-full text-center bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 text-red-500 rounded-full mb-6 border border-red-100">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="text-[20px] font-black text-[#0E0E10]">Inicio de Sessão Necessário</h1>
          <p className="text-[14px] text-[#53535F] mt-2 mb-6">
            Apenas utilizadores autenticados podem enviar pedidos de suporte para a Kwanza Stream.
          </p>
          <button
            onClick={auth.login}
            className="w-full py-3 bg-[#9146FF] hover:bg-[#772CE8] text-white text-[14px] font-bold rounded shadow transition-colors cursor-pointer border-none"
          >
            Entrar com a Kwanza Stream
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F8] py-10 min-h-screen relative">
      {/* Help Choice Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-[640px] w-full p-6 relative animate-in zoom-in-95 duration-150 text-center">
            <button
              onClick={() => setShowChoiceModal(false)}
              className="absolute right-4 top-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-[22px] font-black text-[#0E0E10] mt-2">Como gostarias de obter ajuda?</h2>
            <p className="text-[14px] text-[#53535F] mt-1 mb-6">Escolhe a opção mais adequada para ti.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Fala connosco card (Chat) */}
              <div className="bg-[#e6f4fe] border border-blue-100 rounded-lg p-5 flex flex-col items-center">
                <img
                  src="/radical_dog_gaming.png"
                  alt="Gamer Dog"
                  className="w-32 h-32 object-contain select-none pointer-events-none"
                />
                <h3 className="text-[16px] font-bold text-[#0E0E10] mt-3">Fala connosco</h3>
                <p className="text-[12px] text-[#53535F] mt-1 mb-5">Obtém uma resposta em minutos</p>
                <button
                  onClick={openChat}
                  className="w-full py-2.5 bg-[#9146FF] hover:bg-[#772CE8] text-white text-[13px] font-bold rounded shadow transition-colors cursor-pointer border-none mt-auto"
                >
                  Iniciar chat
                </button>
              </div>

              {/* Envia-nos um e-mail card (Email Form) */}
              <div className="bg-[#fef6e7] border border-orange-100 rounded-lg p-5 flex flex-col items-center">
                <img
                  src="/ice_skull_gaming.png"
                  alt="Gaming Ice Skull"
                  className="w-32 h-32 object-contain select-none pointer-events-none"
                />
                <h3 className="text-[16px] font-bold text-[#0E0E10] mt-3">Envia-nos um e-mail</h3>
                <p className="text-[12px] text-[#53535F] mt-1 mb-5">Responderemos no prazo de 24 horas</p>
                <button
                  onClick={() => setShowChoiceModal(false)}
                  className="w-full py-2.5 bg-white hover:bg-orange-50/50 text-[#9146FF] border border-[#9146FF] text-[13px] font-bold rounded shadow transition-colors cursor-pointer mt-auto"
                >
                  Enviar e-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1000px] px-6">
        <Breadcrumb
          items={[
            { label: "Início", to: "/" },
            { label: "Contacta-nos" },
          ]}
        />

        {submitted ? (
          <div className="mt-8 max-w-[600px] mx-auto bg-white border border-gray-200 rounded-xl p-8 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full border border-green-100 text-green-600 mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-[20px] font-bold text-[#0E0E10]">Mensagem enviada com sucesso!</h2>
            <p className="text-[14px] text-[#53535F] mt-2 mb-8 max-w-md mx-auto">
              Obrigado, <span className="font-semibold text-[#0E0E10]">{auth.user?.display_name}</span>. 
              O teu ticket de suporte foi registado e enviado para a equipa da Kwanza Stream. 
              Entraremos em contacto para <span className="font-semibold text-[#0E0E10]">{auth.user?.email}</span> dentro de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/"
                className="px-6 py-3 bg-[#9146FF] hover:bg-[#772CE8] text-white rounded text-[13px] font-bold transition-all shadow-sm"
              >
                Voltar ao Início
              </Link>
              <Link
                to="/catalogo"
                className="px-6 py-3 bg-white hover:bg-gray-50 text-[#0E0E10] border border-gray-200 rounded text-[13px] font-bold transition-all shadow-sm"
              >
                Ver Tópicos
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left side: Main form */}
            <main className="flex-1 bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm w-full">
              <h1 className="text-[24px] font-black text-[#0E0E10] mb-2">Contacta-nos</h1>
              <p className="text-[13px] text-[#53535F] mb-6 border-b border-gray-100 pb-4">
                Preenche os campos abaixo para abrir um pedido de suporte oficial.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#53535F] mb-1.5">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    value={auth.user?.display_name || ""}
                    disabled
                    className="w-full text-[13px] bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[#53535F] cursor-not-allowed"
                  />
                </div>

                {/* Account Login */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#53535F] mb-1.5">
                    Seu nome de usuário da Kwanza Stream
                  </label>
                  <input
                    type="text"
                    value={auth.user?.login || ""}
                    disabled
                    className="w-full text-[13px] bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[#53535F] cursor-not-allowed"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#53535F] mb-1.5">
                    Endereço de e-mail para enviar a resposta
                  </label>
                  <input
                    type="text"
                    value={auth.user?.email || ""}
                    disabled
                    className="w-full text-[13px] bg-gray-50 border border-gray-200 rounded px-3 py-2 text-[#53535F] cursor-not-allowed"
                  />
                </div>

                {/* Phone number */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#53535F] mb-1.5">
                    Número de telefone associado à tua conta Kwanza Stream
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.phoneCode}
                      onChange={(e) => setFormData((v) => ({ ...v, phoneCode: e.target.value }))}
                      className="bg-white border border-gray-200 rounded px-2 py-2 text-[13px] font-semibold outline-none focus:border-[#9146FF]"
                    >
                      <option value="+244">Angola +244</option>
                      <option value="+351">Portugal +351</option>
                      <option value="+55">Brasil +55</option>
                      <option value="+258">Moçambique +258</option>
                      <option value="+238">Cabo Verde +238</option>
                      <option value="+1">Estados Unidos +1</option>
                    </select>
                    <input
                      type="tel"
                      value={formData.phoneNum}
                      onChange={(e) => setFormData((v) => ({ ...v, phoneNum: e.target.value }))}
                      placeholder="Ex: 923000000"
                      required
                      className="flex-1 text-[13px] bg-white border border-gray-200 rounded px-3 py-2 outline-none focus:border-[#9146FF]"
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#53535F] mb-1.5">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData((v) => ({ ...v, category: e.target.value }))}
                    className="w-full text-[13px] bg-white border border-gray-200 rounded px-3 py-2 outline-none focus:border-[#9146FF]"
                  >
                    <option value="Problemas de Conta/Login">Problemas de Conta/Login</option>
                    <option value="Geral">Geral / Dúvidas</option>
                    <option value="Legal">Legal & Termos</option>
                    <option value="Contas Monetizadas">Contas Monetizadas (Afiliados/Parceiros)</option>
                    <option value="Privacidade">Privacidade & RGPD</option>
                    <option value="Compras">Compras & Subs (Multicaixa)</option>
                    <option value="Enviar Feedback">Enviar Feedback / Ideias</option>
                    <option value="Suspensões e Avisos">Suspensões e Avisos de Segurança</option>
                    <option value="Aplicações Kwanza Stream">Aplicações Kwanza Stream (Telemóvel/Studio)</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#53535F] mb-1.5">
                    Descrição do problema
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((v) => ({ ...v, description: e.target.value }))}
                    placeholder="Explica o teu problema detalhadamente..."
                    required
                    rows={5}
                    className="w-full text-[13px] bg-white border border-gray-200 rounded p-3 outline-none focus:border-[#9146FF] resize-none"
                  />
                </div>

                {/* Mock Recaptcha checkbox */}
                <div className="bg-gray-50 border border-gray-200 rounded p-4 flex items-center justify-between">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={recaptchaChecked}
                      onChange={(e) => setRecaptchaChecked(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#9146FF] focus:ring-[#9146FF]"
                    />
                    <span className="text-[13px] font-semibold text-[#0E0E10]">I'm not a robot</span>
                  </label>
                  <div className="flex flex-col items-center select-none opacity-60">
                    <div className="w-6 h-6 bg-white border border-gray-300 rounded flex items-center justify-center font-black text-[#9146FF] text-[10px]">
                      K
                    </div>
                    <span className="text-[8px] text-gray-500 mt-0.5">reCAPTCHA</span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!recaptchaChecked}
                  className={`w-full py-3 text-white text-[14px] font-bold rounded shadow transition-all border-none ${
                    recaptchaChecked 
                      ? "bg-[#9146FF] hover:bg-[#772CE8] cursor-pointer" 
                      : "bg-[#adadb8] cursor-not-allowed opacity-60"
                  }`}
                >
                  Enviar
                </button>
              </form>
            </main>

            {/* Right side: Sidebar info */}
            <aside className="w-full lg:w-[320px] flex-none flex flex-col gap-6">
              
              {/* Chat assistance promo card */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-center">
                <img
                  src="/radical_dog_gaming.png"
                  alt="Gamer Dog"
                  className="w-24 h-24 mx-auto object-contain select-none pointer-events-none"
                />
                <h2 className="text-[16px] font-black text-[#0E0E10] mt-3">Obtenha ajuda agora, evite a espera</h2>
                <p className="text-[12px] text-[#53535F] mt-1.5 mb-5 leading-relaxed">
                  Converse com o nosso assistente virtual para obter uma resposta mais rápida. Disponível agora.
                </p>
                <button
                  onClick={openChat}
                  className="w-full py-2.5 bg-[#9146FF] hover:bg-[#772CE8] text-white text-[13px] font-bold rounded shadow transition-colors cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Iniciar um chat</span>
                </button>
              </div>

              {/* Social Follow-up links */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#53535F] mb-3">Outros Recursos</h3>
                <a
                  href="https://x.com/KwanzaStream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-150 hover:border-[#9146FF] text-[#9146FF] text-[13px] font-bold rounded transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    <span>Segue-nos no X</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
