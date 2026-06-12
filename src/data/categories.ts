export type Category = {
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export const categories: Category[] = [
  {
    slug: "comecar",
    title: "Começar",
    description: "Novo no KwanzaStream? Temos guias para te ajudar a começar.",
    icon: "hand-wave",
  },
  {
    slug: "programa-afiliados",
    title: "Programa de Afiliados",
    description: "Informação sobre o Programa de Afiliados? Estás no lugar certo!",
    icon: "layers",
  },
  {
    slug: "programa-parceiros",
    title: "Programa de Parceiros",
    description: "Questões sobre o Programa de Parceiros? Consulta estes artigos!",
    icon: "check-badge",
  },
  {
    slug: "moderacao-seguranca",
    title: "Moderação e Segurança",
    description: "Fica em segurança no KwanzaStream. Ferramentas de moderação aqui.",
    icon: "shield",
  },
  {
    slug: "pagamentos-salos",
    title: "Pagamentos e Salos",
    description: "Problemas com pagamentos via Multicaixa? Salos e fundos aqui.",
    icon: "credit-card",
  },
  {
    slug: "ks-premium",
    title: "KwanzaStream Premium",
    description: "Queres uma experiência premium? Descobre tudo sobre o Premium!",
    icon: "crown",
  },
  {
    slug: "aplicacao-movel",
    title: "Aplicação Móvel",
    description: "Ajuda com a app KwanzaStream? Temos artigos para todos os dispositivos!",
    icon: "device-mobile",
  },
  {
    slug: "ks-studio",
    title: "KwanzaStream Studio",
    description: "À procura de informação sobre o KwanzaStream Studio? Temos aqui!",
    icon: "video-camera",
  },
  {
    slug: "eventos-torneios",
    title: "Eventos e Torneios",
    description: "Detalhes sobre promoções e torneios? Guardamos tudo aqui!",
    icon: "megaphone",
  },
];
