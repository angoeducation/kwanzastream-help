import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumb } from "@/components/article/Breadcrumb";
import { categories } from "@/content/helpCenter";
import { User, Mail, Layers, FileText, MessageSquare, Send, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contatar Apoio — Kwanza Stream Ajuda" },
      { name: "description", content: "Envia um pedido de suporte para a equipa da Kwanza Stream." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-ks-bg py-14 min-h-[70vh]">
      <div className="mx-auto max-w-[640px] px-6">
        <Breadcrumb
          items={[
            { label: "Início", to: "/" },
            { label: "Contatar Apoio" },
          ]}
        />

        <div className="mt-8 bg-white border border-ks-border rounded-xl shadow-sm overflow-hidden">
          {submitted ? (
            <div className="p-8 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full border border-green-100 text-green-600 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-[20px] font-bold text-ks-text">Pedido enviado com sucesso!</h2>
                <p className="text-[14px] text-ks-muted max-w-md mx-auto">
                  Obrigado, <span className="font-semibold text-ks-text">{formData.name}</span>. O teu ticket foi registado. Entraremos em contacto para o e-mail <span className="font-semibold text-ks-text">{formData.email}</span> o mais rápido possível.
                </p>
              </div>
              <div className="pt-4 border-t border-ks-border flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/"
                  className="px-5 py-2.5 bg-ks-accent hover:bg-ks-accent-hover text-white rounded-md text-[13px] font-semibold transition-all shadow-sm"
                >
                  Voltar ao Início
                </Link>
                <Link
                  to="/catalogo"
                  className="px-5 py-2.5 bg-white hover:bg-ks-surface text-ks-text border border-ks-border rounded-md text-[13px] font-semibold transition-all shadow-sm"
                >
                  Ver Catálogo de Tópicos
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h1 className="text-[22px] font-bold text-ks-text">Como podemos ajudar?</h1>
                <p className="text-[13px] text-ks-muted mt-1">
                  Preenche o formulário abaixo e um dos nossos assistentes responderá em menos de 24 horas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[12px] font-bold uppercase tracking-wider text-ks-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Manuel Antunes"
                    className="w-full text-[14px] bg-white border border-ks-border rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-ks-accent focus:border-ks-accent text-ks-text placeholder-ks-muted/60"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[12px] font-bold uppercase tracking-wider text-ks-muted flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Endereço de E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Ex: manuel@gmail.com"
                    className="w-full text-[14px] bg-white border border-ks-border rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-ks-accent focus:border-ks-accent text-ks-text placeholder-ks-muted/60"
                  />
                </div>

                {/* Topic / Category */}
                <div className="space-y-1.5">
                  <label htmlFor="category" className="text-[12px] font-bold uppercase tracking-wider text-ks-muted flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Tópico Relacionado
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full text-[14px] bg-white border border-ks-border rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-ks-accent focus:border-ks-accent text-ks-text"
                  >
                    <option value="" disabled>Seleciona um tópico...</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[12px] font-bold uppercase tracking-wider text-ks-muted flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Dificuldade no pagamento via Multicaixa"
                    className="w-full text-[14px] bg-white border border-ks-border rounded-md px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-ks-accent focus:border-ks-accent text-ks-text placeholder-ks-muted/60"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[12px] font-bold uppercase tracking-wider text-ks-muted flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Descrição do Problema
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Explica detalhadamente o que aconteceu..."
                    className="w-full text-[14px] bg-white border border-ks-border rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-ks-accent focus:border-ks-accent text-ks-text placeholder-ks-muted/60 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-ks-accent hover:bg-ks-accent-hover text-white py-3 rounded-md text-[14px] font-semibold transition-all duration-150 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> Enviar Pedido de Suporte
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
