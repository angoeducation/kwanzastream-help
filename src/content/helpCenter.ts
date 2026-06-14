import {
  Pointer,
  Layers,
  ShieldCheck,
  Shield,
  CreditCard,
  Crown,
  MonitorSmartphone,
  Video,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

/* ─── Types ─── */
export type Category = {
  slug: string;
  title: string;
  description: string;
  articleCount: number;
  icon: LucideIcon;
};

export type Article = {
  slug: string;
  title: string;
  categorySlug: string;
  readMinutes: number;
  body: string;
  id?: string;
  lastModified?: string; // ISO date string e.g. "2026-05-20"
  views?: number;
  popular?: boolean;
};

export type WhatsNew = {
  date: string;
  badge: "NOVO" | "ACTUALIZAÇÃO";
  title: string;
  description: string;
  slug: string;
};

/* ─── Categories (9) ─── */
export const categories: Category[] = [
  {
    slug: "comecar",
    title: "Começar",
    description: "Novo na Kwanza Stream? Temos guias para te ajudar a começar.",
    articleCount: 12,
    icon: Pointer,
  },
  {
    slug: "programa-afiliados",
    title: "Programa de Afiliados",
    description: "Informação sobre o Programa de Afiliados? Estás no lugar certo!",
    articleCount: 8,
    icon: Layers,
  },
  {
    slug: "programa-parceiros",
    title: "Programa de Parceiros",
    description: "Questões sobre o Programa de Parceiros? Consulta estes artigos!",
    articleCount: 15,
    icon: ShieldCheck,
  },
  {
    slug: "moderacao-seguranca",
    title: "Moderação e Segurança",
    description: "Fica em segurança na Kwanza Stream. Ferramentas de moderação aqui.",
    articleCount: 10,
    icon: Shield,
  },
  {
    slug: "pagamentos-salos",
    title: "Pagamentos e Salos",
    description: "Problemas com pagamentos via Multicaixa? Salos e fundos aqui.",
    articleCount: 9,
    icon: CreditCard,
  },
  {
    slug: "ks-premium",
    title: "Kwanza Stream Premium",
    description: "Queres uma experiência premium? Descobre tudo sobre o Premium!",
    articleCount: 14,
    icon: Crown,
  },
  {
    slug: "aplicacao-movel",
    title: "Aplicação Móvel",
    description: "Ajuda com a app Kwanza Stream? Temos artigos para todos os dispositivos!",
    articleCount: 11,
    icon: MonitorSmartphone,
  },
  {
    slug: "ks-studio",
    title: "Kwanza Stream Studio",
    description: "À procura de informação sobre o Kwanza Stream Studio? Temos aqui!",
    articleCount: 6,
    icon: Video,
  },
  {
    slug: "eventos-torneios",
    title: "Eventos e Torneios",
    description: "Detalhes sobre promoções e torneios? Guardamos tudo aqui!",
    articleCount: 7,
    icon: Megaphone,
  },
];

/* ─── Articles (20) ─── */
export const articles: Article[] = [
  /* ── Começar ── */
  {
    slug: "como-criar-conta",
    title: "Como Criar uma Conta na Kwanza Stream",
    categorySlug: "comecar",
    readMinutes: 4,
    body: `<p>Criar a tua conta na Kwanza Stream é rápido e gratuito. Vai a <strong>kwanzastream.com/registo</strong> e preenche o formulário com o teu nome de utilizador, email e palavra-passe.</p>
<h2>Passos para o registo</h2>
<ul>
<li>Acede à página de registo no navegador ou na app móvel.</li>
<li>Preenche o teu nome de utilizador (único), email válido e palavra-passe com pelo menos 8 caracteres.</li>
<li>Confirma o teu email clicando no link enviado para a tua caixa de entrada.</li>
<li>Opcionalmente, verifica o teu número de telemóvel angolano para segurança extra.</li>
</ul>
<p>Depois de confirmares o email, já podes explorar streams ao vivo, seguir criadores e começar a interagir no chat. Se quiseres fazer streams, consulta o artigo sobre como configurar o primeiro stream.</p>`,
  },
  {
    slug: "configurar-primeiro-stream",
    title: "Como Configurar o Primeiro Stream",
    categorySlug: "comecar",
    readMinutes: 8,
    body: `<p>Fazer o teu primeiro stream na Kwanza Stream é mais simples do que pensas. Precisas de um computador ou telemóvel, uma ligação estável à internet e software de streaming como o OBS Studio ou o Kwanza Stream Studio.</p>
<h2>Configuração recomendada</h2>
<ul>
<li>Resolução: 1920×1080 (ou 1280×720 para ligações mais lentas)</li>
<li>FPS: 30 ou 60</li>
<li>Bitrate: 4500 Kbps para 1080p, 2500 Kbps para 720p</li>
<li>Encoder: x264 (CPU) ou NVENC (GPU NVIDIA)</li>
<li>Keyframe: 2 segundos</li>
</ul>
<h2>Passos rápidos</h2>
<p>No painel da Kwanza Stream, copia a tua chave de stream. No OBS, vai a Definições → Stream → seleciona "Personalizado" e cola o URL do servidor e a chave. Clica em "Iniciar Stream" e estás no ar!</p>`,
  },
  {
    slug: "requisitos-sistema",
    title: "Requisitos de Sistema para Streaming",
    categorySlug: "comecar",
    readMinutes: 5,
    body: `<p>Para fazeres streams de qualidade na Kwanza Stream, o teu computador deve cumprir os requisitos mínimos abaixo.</p>
<h2>Requisitos mínimos</h2>
<ul>
<li>Processador: Intel i5 4ª geração ou AMD Ryzen 3 (ou superior)</li>
<li>RAM: 8 GB</li>
<li>Placa gráfica: qualquer GPU com suporte DirectX 11</li>
<li>Internet: pelo menos 6 Mbps de upload estável</li>
<li>Sistema operativo: Windows 10/11, macOS 12+ ou Ubuntu 22.04+</li>
</ul>
<p>Para streams de jogos a 1080p60, recomendamos um i7 ou Ryzen 5 com 16 GB de RAM e uma GPU dedicada NVIDIA GTX 1060 ou superior para usar o encoder NVENC e reduzir a carga no CPU.</p>`,
  },
  /* ── Programa de Afiliados ── */
  {
    slug: "requisitos-afiliado",
    title: "Requisitos para se Tornar Afiliado",
    categorySlug: "programa-afiliados",
    readMinutes: 6,
    body: `<p>O Programa de Afiliados da Kwanza Stream permite que criadores emergentes comecem a monetizar o seu conteúdo. Para te qualificares, precisas de cumprir os seguintes critérios:</p>
<h2>Critérios de elegibilidade</h2>
<ul>
<li>Pelo menos 50 seguidores na tua conta Kwanza Stream</li>
<li>Mínimo de 500 minutos de transmissão nos últimos 30 dias</li>
<li>Pelo menos 7 dias únicos de transmissão nos últimos 30 dias</li>
<li>Média de 3 ou mais espectadores simultâneos</li>
</ul>
<p>Quando cumprires todos os requisitos, receberás um convite automático por email. Aceita o convite, preenche as informações fiscais e configura o método de pagamento para começares a receber receitas.</p>`,
  },
  {
    slug: "configurar-monetizacao",
    title: "Como Configurar a Monetização",
    categorySlug: "programa-afiliados",
    readMinutes: 7,
    body: `<p>Depois de seres aceite como Afiliado, podes ativar várias fontes de receita no teu painel de criador.</p>
<h2>Fontes de receita disponíveis</h2>
<ul>
<li><strong>Subscrições:</strong> Os espectadores podem subscrever o teu canal em 3 níveis (Básico, Avançado, Premium).</li>
<li><strong>Bits e Cheers:</strong> Os espectadores compram Bits e enviam-nos no chat como Cheers animados.</li>
<li><strong>Publicidade:</strong> Ativa anúncios mid-roll durante o teu stream e ganha por cada impressão.</li>
</ul>
<p>Para configurar, vai ao Painel do Criador → Monetização e segue as instruções. Certifica-te de que tens o método de pagamento Multicaixa Express ou transferência bancária configurado na secção Pagamentos.</p>`,
  },
  /* ── Programa de Parceiros ── */
  {
    slug: "candidatura-parceiro",
    title: "Guia de Candidatura a Parceiro",
    categorySlug: "programa-parceiros",
    readMinutes: 10,
    body: `<p>O Programa de Parceiros é o nível mais alto de reconhecimento na Kwanza Stream. Os parceiros têm acesso a ferramentas exclusivas, suporte prioritário e maior percentagem de receita.</p>
<h2>Como candidatar-se</h2>
<ul>
<li>Deves ser Afiliado há pelo menos 3 meses.</li>
<li>Média de 75 ou mais espectadores simultâneos nos últimos 30 dias.</li>
<li>Pelo menos 12 streams únicos nos últimos 30 dias.</li>
<li>Cumprir as Diretrizes da Comunidade sem infrações activas.</li>
</ul>
<p>Submete a tua candidatura em Painel do Criador → Parceiros → Candidatar. A equipa da Kwanza Stream revê candidaturas semanalmente e responde dentro de 15 dias úteis.</p>`,
  },
  {
    slug: "beneficios-parceiro",
    title: "Benefícios do Programa de Parceiros",
    categorySlug: "programa-parceiros",
    readMinutes: 5,
    body: `<p>Ser Parceiro da Kwanza Stream abre portas a um conjunto exclusivo de ferramentas e vantagens.</p>
<h2>Vantagens principais</h2>
<ul>
<li>Percentagem de receita mais elevada (até 70% em subscrições).</li>
<li>Selo de verificação exclusivo no perfil e no chat.</li>
<li>Acesso ao suporte prioritário 24/7.</li>
<li>Possibilidade de transcodificação garantida em múltiplas qualidades.</li>
<li>Convites para eventos exclusivos da Kwanza Stream em Luanda.</li>
</ul>
<p>Os parceiros também podem personalizar emotes ilimitados, criar pontos de canal e aceder a análises avançadas de audiência no painel.</p>`,
  },
  /* ── Moderação e Segurança ── */
  {
    slug: "configurar-automod",
    title: "Como Configurar o AutoMod",
    categorySlug: "moderacao-seguranca",
    readMinutes: 6,
    body: `<p>O AutoMod é a ferramenta de moderação automática da Kwanza Stream que filtra mensagens potencialmente ofensivas antes de aparecerem no chat.</p>
<h2>Como ativar</h2>
<ul>
<li>Vai ao Painel do Criador → Moderação → AutoMod.</li>
<li>Escolhe o nível de filtragem: Baixo, Médio, Alto ou Personalizado.</li>
<li>No modo Personalizado, podes ajustar categorias individuais como linguagem ofensiva, discriminação, conteúdo sexual e hostilidade.</li>
</ul>
<p>As mensagens bloqueadas pelo AutoMod ficam numa fila para revisão dos teus moderadores, que podem aprovar ou rejeitar cada uma. Recomendamos começar com o nível Médio e ajustar conforme a audiência.</p>`,
  },
  {
    slug: "denunciar-utilizador",
    title: "Como Denunciar um Utilizador",
    categorySlug: "moderacao-seguranca",
    readMinutes: 4,
    body: `<p>Se encontrares comportamento que viole as Diretrizes da Comunidade da Kwanza Stream, podes denunciar o utilizador directamente na plataforma.</p>
<h2>Passos para denunciar</h2>
<ul>
<li>Clica no nome do utilizador no chat ou no perfil.</li>
<li>Seleciona "Denunciar" no menu de opções.</li>
<li>Escolhe o motivo da denúncia (ex.: assédio, spam, conteúdo impróprio).</li>
<li>Adiciona uma descrição opcional com detalhes.</li>
<li>Submete a denúncia.</li>
</ul>
<p>A equipa de Confiança e Segurança da Kwanza Stream analisa todas as denúncias dentro de 24 horas. As denúncias são confidenciais — o utilizador denunciado não saberá quem o denunciou.</p>`,
  },
  /* ── Pagamentos e Salos ── */
  {
    slug: "pagamento-multicaixa",
    title: "Como Pagar via Multicaixa Express",
    categorySlug: "pagamentos-salos",
    readMinutes: 5,
    body: `<p>O Multicaixa Express é o método de pagamento mais popular na Kwanza Stream para utilizadores em Angola. Permite comprar Bits, subscrições e Premium directamente do teu telemóvel.</p>
<h2>Como funciona</h2>
<ul>
<li>No momento do pagamento, seleciona "Multicaixa Express" como método.</li>
<li>Insere o teu número de telefone associado ao Multicaixa Express.</li>
<li>Receberás uma notificação na app Multicaixa para confirmar o pagamento.</li>
<li>Confirma com o teu PIN e a transação é processada em segundos.</li>
</ul>
<p>Os pagamentos via Multicaixa Express são processados em Kwanzas (AOA). As taxas de conversão são actualizadas diariamente conforme o câmbio oficial do BNA.</p>`,
  },
  {
    slug: "levantar-salos",
    title: "Como Levantar os Teus Salos",
    categorySlug: "pagamentos-salos",
    readMinutes: 6,
    body: `<p>Os Salos são a moeda de receita do criador na Kwanza Stream. Quando acumulas receita de subscrições, Bits e anúncios, o valor aparece como Salos no teu painel.</p>
<h2>Requisitos para levantamento</h2>
<ul>
<li>Saldo mínimo de 10.000 AOA em Salos.</li>
<li>Método de pagamento verificado (Multicaixa Express ou conta bancária angolana).</li>
<li>Informações fiscais preenchidas no perfil.</li>
</ul>
<h2>Como levantar</h2>
<p>Vai a Painel do Criador → Pagamentos → Levantar Salos. Seleciona o montante e o método. Os levantamentos via Multicaixa Express são processados em até 48 horas. Transferências bancárias podem demorar até 5 dias úteis.</p>`,
  },
  /* ── Kwanza Stream Premium ── */
  {
    slug: "vantagens-premium",
    title: "Vantagens do Kwanza Stream Premium",
    categorySlug: "ks-premium",
    readMinutes: 5,
    body: `<p>O Kwanza Stream Premium oferece uma experiência superior de visualização com funcionalidades exclusivas.</p>
<h2>O que inclui</h2>
<ul>
<li>Visualização sem anúncios em todos os canais.</li>
<li>1 subscrição gratuita por mês para o canal que escolheres.</li>
<li>Emotes exclusivos Premium para usar em qualquer chat.</li>
<li>Selo Premium ao lado do teu nome no chat.</li>
<li>Cores de chat personalizadas e opções de destaque.</li>
<li>Armazenamento expandido para VODs e clips.</li>
</ul>
<p>O Premium custa 2.500 AOA/mês e pode ser pago via Multicaixa Express, cartão VISA ou referência bancária. Subscreve em kwanzastream.com/premium.</p>`,
  },
  {
    slug: "cancelar-premium",
    title: "Como Cancelar a Subscrição Premium",
    categorySlug: "ks-premium",
    readMinutes: 3,
    body: `<p>Podes cancelar a tua subscrição Premium a qualquer momento. O cancelamento entra em vigor no final do período de faturação actual.</p>
<h2>Passos para cancelar</h2>
<ul>
<li>Vai a Definições → Subscrições → Kwanza Stream Premium.</li>
<li>Clica em "Cancelar Subscrição".</li>
<li>Confirma o cancelamento na janela de diálogo.</li>
</ul>
<p>Após o cancelamento, manténs acesso às funcionalidades Premium até ao fim do período já pago. Não há reembolso parcial. Podes reactivar o Premium a qualquer momento.</p>`,
  },
  /* ── Aplicação Móvel ── */
  {
    slug: "instalar-app-android",
    title: "Como Instalar a App no Android",
    categorySlug: "aplicacao-movel",
    readMinutes: 4,
    body: `<p>A app Kwanza Stream está disponível gratuitamente na Google Play Store para dispositivos Android 8.0 ou superior.</p>
<h2>Instalação</h2>
<ul>
<li>Abre a Google Play Store no teu dispositivo.</li>
<li>Pesquisa por "Kwanza Stream".</li>
<li>Toca em "Instalar" e aguarda o download.</li>
<li>Abre a app e faz login com a tua conta Kwanza Stream.</li>
</ul>
<p>A app permite ver streams ao vivo, interagir no chat, enviar Bits, gerir o teu canal e até fazer streams directamente do telemóvel. Certifica-te de que tens a versão mais recente para acederes a todas as funcionalidades.</p>`,
  },
  {
    slug: "resolver-problemas-app",
    title: "Resolver Problemas na App Móvel",
    categorySlug: "aplicacao-movel",
    readMinutes: 5,
    body: `<p>Se estás a ter problemas com a app da Kwanza Stream no teu telemóvel, segue estes passos de resolução antes de contactares o suporte.</p>
<h2>Problemas comuns e soluções</h2>
<ul>
<li><strong>App não abre:</strong> Limpa a cache da app em Definições → Apps → Kwanza Stream → Limpar Cache.</li>
<li><strong>Stream não carrega:</strong> Verifica a tua ligação à internet. Tenta mudar de Wi-Fi para dados móveis ou vice-versa.</li>
<li><strong>Chat não funciona:</strong> Faz logout e login novamente. Se persistir, reinstala a app.</li>
<li><strong>Notificações não chegam:</strong> Vai a Definições do telemóvel → Notificações → Kwanza Stream e garante que estão ativadas.</li>
</ul>
<p>Se o problema persistir após estes passos, contacta o suporte em apoio@kwanzastream.com com capturas de ecrã e a versão da app instalada.</p>`,
  },
  /* ── Kwanza Stream Studio ── */
  {
    slug: "configurar-ks-studio",
    title: "Configurar o Kwanza Stream Studio",
    categorySlug: "ks-studio",
    readMinutes: 7,
    body: `<p>O Kwanza Stream Studio é o software de streaming oficial, desenhado para ser fácil de usar mesmo para quem nunca fez um stream antes.</p>
<h2>Instalação e configuração</h2>
<ul>
<li>Descarrega o KS Studio em kwanzastream.com/studio.</li>
<li>Instala e abre o programa — ele detecta automaticamente a tua webcam e microfone.</li>
<li>Faz login com a tua conta Kwanza Stream (a chave de stream é configurada automaticamente).</li>
<li>Escolhe um layout predefinido ou personaliza as tuas cenas.</li>
</ul>
<h2>Primeiros passos</h2>
<p>O assistente de configuração inicial testa a tua velocidade de internet e recomenda as melhores definições de qualidade. Aceita as recomendações ou ajusta manualmente. Quando estiveres pronto, clica em "Ir ao Vivo"!</p>`,
  },
  {
    slug: "cenas-transicoes",
    title: "Gerir Cenas e Transições no KS Studio",
    categorySlug: "ks-studio",
    readMinutes: 6,
    body: `<p>As cenas permitem-te organizar diferentes layouts para o teu stream — por exemplo, uma cena de jogo, uma de conversa e uma de intervalo.</p>
<h2>Criar e editar cenas</h2>
<ul>
<li>No painel esquerdo do KS Studio, clica em "+" para adicionar uma nova cena.</li>
<li>Dá um nome à cena (ex.: "Gameplay", "Just Chatting", "BRB").</li>
<li>Adiciona fontes: webcam, captura de ecrã, imagens, texto, alertas, etc.</li>
<li>Arrasta e redimensiona cada fonte na pré-visualização.</li>
</ul>
<h2>Transições</h2>
<p>Nas definições de transição, podes escolher entre corte directo, fade, deslizar ou animações personalizadas. Define a duração (recomendamos 300-500ms) e aplica a transição globalmente ou por par de cenas.</p>`,
  },
  /* ── Eventos e Torneios ── */
  {
    slug: "participar-torneio",
    title: "Como Participar num Torneio",
    categorySlug: "eventos-torneios",
    readMinutes: 5,
    body: `<p>A Kwanza Stream organiza regularmente torneios de gaming para a comunidade angolana, com prémios em dinheiro e equipamento.</p>
<h2>Como participar</h2>
<ul>
<li>Consulta os torneios activos em kwanzastream.com/torneios.</li>
<li>Clica no torneio que te interessa e lê as regras e requisitos.</li>
<li>Clica em "Inscrever" e preenche o formulário (individual ou equipa).</li>
<li>Confirma a inscrição por email.</li>
</ul>
<p>Os torneios são transmitidos ao vivo no canal oficial Kwanza Stream Esports. Os participantes devem fazer stream do seu ponto de vista durante os jogos. Consulta as regras específicas de cada torneio para mais detalhes.</p>`,
  },
  {
    slug: "criar-evento",
    title: "Como Criar um Evento na Plataforma",
    categorySlug: "eventos-torneios",
    readMinutes: 6,
    body: `<p>Criadores Afiliados e Parceiros podem criar eventos personalizados na plataforma para interagir com a sua comunidade.</p>
<h2>Tipos de eventos</h2>
<ul>
<li><strong>Stream Agendado:</strong> Agenda um stream futuro que aparece no teu perfil e notifica seguidores.</li>
<li><strong>Watch Party:</strong> Vê conteúdo em conjunto com a tua audiência.</li>
<li><strong>Torneio Comunitário:</strong> Organiza competições entre os teus seguidores.</li>
<li><strong>Maratona de Stream:</strong> Define um objectivo de horas de stream com barra de progresso.</li>
</ul>
<p>Para criar um evento, vai ao Painel do Criador → Eventos → Criar Novo. Preenche título, descrição, data/hora e tipo. O evento aparecerá automaticamente no calendário do teu canal e os seguidores recebem notificação.</p>`,
  },
  /* ── Extra articles to reach 20 ── */
  {
    slug: "personalizar-perfil",
    title: "Como Personalizar o Teu Perfil",
    categorySlug: "comecar",
    readMinutes: 4,
    body: `<p>Um perfil bem configurado ajuda-te a destacar na plataforma e a atrair mais seguidores.</p>
<h2>Elementos do perfil</h2>
<ul>
<li><strong>Avatar:</strong> Carrega uma imagem quadrada (mínimo 256×256px).</li>
<li><strong>Banner:</strong> Imagem de capa com 1200×480px recomendado.</li>
<li><strong>Bio:</strong> Escreve uma descrição curta sobre ti e o teu conteúdo (máximo 300 caracteres).</li>
<li><strong>Links sociais:</strong> Adiciona links para Instagram, Twitter, YouTube, etc.</li>
<li><strong>Painéis de canal:</strong> Cria secções personalizadas abaixo do player com regras, horário e informações.</li>
</ul>
<p>Vai a Definições → Perfil para editar tudo. As alterações ficam visíveis imediatamente no teu canal.</p>`,
  },
  {
    slug: "seguranca-conta",
    title: "Proteger a Tua Conta com 2FA",
    categorySlug: "moderacao-seguranca",
    readMinutes: 4,
    body: `<p>A autenticação de dois fatores (2FA) adiciona uma camada extra de segurança à tua conta Kwanza Stream.</p>
<h2>Como ativar o 2FA</h2>
<ul>
<li>Vai a Definições → Segurança → Autenticação de Dois Fatores.</li>
<li>Escolhe o método: app de autenticação (recomendado) ou SMS.</li>
<li>Para app de autenticação, digitaliza o código QR com Google Authenticator ou Authy.</li>
<li>Insere o código de 6 dígitos gerado para confirmar.</li>
<li>Guarda os códigos de recuperação num local seguro.</li>
</ul>
<p>Com o 2FA ativo, precisarás do código adicional sempre que fizeres login num dispositivo novo. Recomendamos fortemente que todos os criadores ativem o 2FA para proteger o seu canal e receitas.</p>`,
  },
];

/* ─── Featured (first 8 for homepage) ─── */
export const featuredArticles = articles.slice(0, 8);

/* ─── What's New ─── */
export const whatsNew: WhatsNew[] = [
  {
    date: "MAI 2026",
    badge: "NOVO",
    title: "App Móvel Kwanza Stream 3.0",
    description:
      "A nova app permite streaming em 1080p60 directamente do telemóvel, com vista de moderação integrada e definições de notificação melhoradas.",
    slug: "app-movel-3",
  },
  {
    date: "ABR 2026",
    badge: "NOVO",
    title: "Clips Automáticos com IA",
    description:
      "O novo motor de detecção por IA identifica automaticamente momentos de hype no teu stream e sugere clips para partilhares nas redes sociais.",
    slug: "clips-automaticos",
  },
  {
    date: "MAR 2026",
    badge: "ACTUALIZAÇÃO",
    title: "Painel de Análises Redesenhado",
    description:
      "O painel de análises foi actualizado com retenção de visualizações, picos de audiência em simultâneo e tendências de receita numa vista limpa e única.",
    slug: "analytics-dashboard",
  },
];

/* ─── Popular Searches ─── */
export const popularSearches = [
  "Configurar OBS",
  "Requisitos afiliado",
  "AutoMod",
  "Salos Multicaixa",
  "KS Studio",
];

// Enrich articles with ID, ISO lastModified date, views count and popular flag
const articleMetadata: Record<string, { id: string; lastModified: string; views: number }> = {
  "como-criar-conta":           { id: "KS-000000001", lastModified: "2026-05-08", views: 2380 },
  "configurar-primeiro-stream": { id: "KS-000000002", lastModified: "2026-06-10", views: 1940 },
  "requisitos-sistema":         { id: "KS-000000003", lastModified: "2026-04-15", views: 1320 },
  "personalizar-perfil":        { id: "KS-000000004", lastModified: "2026-05-30", views: 870 },
  "requisitos-afiliado":        { id: "KS-000000005", lastModified: "2026-05-12", views: 1650 },
  "configurar-monetizacao":     { id: "KS-000000006", lastModified: "2026-05-20", views: 1210 },
  "candidatura-parceiro":       { id: "KS-000000007", lastModified: "2026-06-02", views: 980 },
  "beneficios-parceiro":        { id: "KS-000000008", lastModified: "2026-06-05", views: 740 },
  "configurar-automod":         { id: "KS-000000009", lastModified: "2026-05-08", views: 1105 },
  "denunciar-utilizador":       { id: "KS-000000010", lastModified: "2026-04-28", views: 630 },
  "seguranca-conta":            { id: "KS-000000011", lastModified: "2026-06-11", views: 920 },
  "pagamento-multicaixa":       { id: "KS-000000012", lastModified: "2026-05-28", views: 2140 },
  "levantar-salos":             { id: "KS-000000013", lastModified: "2026-06-01", views: 1480 },
  "vantagens-premium":          { id: "KS-000000014", lastModified: "2026-06-12", views: 860 },
  "cancelar-premium":           { id: "KS-000000015", lastModified: "2026-06-13", views: 510 },
  "instalar-app-android":       { id: "KS-000000016", lastModified: "2026-05-15", views: 760 },
  "resolver-problemas-app":     { id: "KS-000000017", lastModified: "2026-05-18", views: 430 },
  "configurar-ks-studio":       { id: "KS-000000018", lastModified: "2026-06-04", views: 340 },
  "cenas-transicoes":           { id: "KS-000000019", lastModified: "2026-06-06", views: 190 },
  "participar-torneio":         { id: "KS-000000020", lastModified: "2026-05-22", views: 290 },
  "criar-evento":               { id: "KS-000000021", lastModified: "2026-05-25", views: 150 },
};

// Top 5 by views — marked as popular
const TOP_POPULAR_SLUGS = [
  "como-criar-conta",
  "configurar-primeiro-stream",
  "pagamento-multicaixa",
  "requisitos-afiliado",
  "levantar-salos",
];

articles.forEach((a) => {
  const meta = articleMetadata[a.slug] || {
    id: `KS-000000000`,
    lastModified: "2026-06-13",
    views: 40,
  };
  a.id = meta.id;
  a.lastModified = meta.lastModified;
  a.views = meta.views;
  a.popular = TOP_POPULAR_SLUGS.includes(a.slug);
});

/* ─── Helpers ─── */
export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getCategoryArticles(categorySlug: string) {
  return articles.filter((a) => a.categorySlug === categorySlug);
}

export function searchArticles(query: string): Article[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return articles.filter(
    (a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q),
  );
}

export function getPopularArticles(limit = 5): Article[] {
  return [...articles]
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, limit);
}
