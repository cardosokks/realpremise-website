import { Project, BlogPost, Comment, Subscriber, User, ChatSession, Partner, TeamMember } from '../types';

export const INITIAL_USER: User = {
  id: 'usr-admin-01',
  name: 'Ricardo Cardoso',
  email: 'ricardo.estudos1998@gmail.com',
  avatar: '/src/assets/images/ricardo_creator_avatar_1790708000570.jpg',
  role: 'admin'
};

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    title: 'Nexus SaaS E-Commerce Suite',
    description: 'Plataforma completa de gestão de e-commerce e inventário em tempo real com analytics preditivo.',
    longDescription: 'Desenvolvido do zero com arquitetura moderna, este sistema de gestão de e-commerce oferece dashboard em tempo real para vendas, previsão de estoque e checkout de alta conversão. A API no backend foi desenhada para processar alto volume de requisições por segundo com baixíssima latência.',
    screenshotUrl: '/src/assets/images/project_ecommerce_saas_1790707906993.jpg',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/nexus-ecommerce-suite',
    category: 'SaaS',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'JWT'],
    client: 'SaaS E-Commerce / Full-Stack',
    completedDate: 'Maio 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Dashboard reativo com atualização via WebSockets',
      'Relatórios exportáveis em PDF e Excel',
      'Autenticação JWT com Refresh Tokens seguros',
      'Infraestrutura containerizada em Docker'
    ]
  },
  {
    id: 'proj-02',
    title: 'Studio Arc - Arquitetura & Design',
    description: 'Portfólio minimalista e interativo para escritório de arquitetura de luxo com catálogo 3D.',
    longDescription: 'Um site institucional de altíssima elegância para o Studio Arc. Focado na visualização de fotografias de projetos em altíssima definição, experiência de navegação fluido e carregamento ultrarrápido com renderização SSR.',
    screenshotUrl: '/src/assets/images/project_agency_portfolio_1790707919660.jpg',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/studio-arc-portfolio',
    category: 'Portfólio',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Node.js', 'Express'],
    client: 'Portfólio & Design Minimalista',
    completedDate: 'Junho 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Animações suaves a 60fps usando Framer Motion',
      'Modo escuro e claro sincronizado nativamente',
      'Otimização de imagens WebP com lazy loading',
      'Pontuação de 99+ no Google Lighthouse'
    ]
  },
  {
    id: 'proj-03',
    title: 'Aura AI - Analytics Platform',
    description: 'Dashboard de inteligência de dados com agregação de métricas de redes sociais e conversão.',
    longDescription: 'Plataforma SaaS para análise de dados e performance de marketing. Permite conexão com múltiplas APIs, visualização em gráficos interativos e geração automática de relatórios resumidos por inteligência artificial.',
    screenshotUrl: '/src/assets/images/project_ai_analytics_1790707930507.jpg',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/aura-ai-analytics',
    category: 'Web App',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Chart.js', 'Gemini API', 'JWT'],
    client: 'Analytics & Inteligência Artificial',
    completedDate: 'Julho 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Geração de insights e resumos via modelo Gemini Flash',
      'Banco de dados relacional PostgreSQL otimizado',
      'Segurança RBAC com perfis de Administrador e Leitor',
      'Exportação de dados bruta em JSON e CSV'
    ]
  },
  {
    id: 'proj-04',
    title: 'Lumina Editorial & Art Gallery',
    description: 'Galeria virtual e revista digital com curadoria de fotografia contemporânea e artes visuais.',
    longDescription: 'Uma experiência editorial digital com layout inspirados em revistas físicas de moda e arte contemporânea. Possui suporte para galeria em grade maçonaria, modo de leitura contínua e sistema de newsletters integrado.',
    screenshotUrl: '/src/assets/images/project_creative_gallery_1790707938879.jpg',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/lumina-editorial-gallery',
    category: 'Landing Page',
    techStack: ['React', 'Tailwind CSS', 'TypeScript', 'Express', 'JWT', 'PostgreSQL'],
    client: 'Revista Editorial & Artes Visuais',
    completedDate: 'Agosto 2026',
    featured: false,
    viewsCount: 0,
    highlights: [
      'Layout em grade maçonaria responsiva sem cortes',
      'Leitor de artigos sem distrações',
      'Integração direta com formulário de inscritos'
    ]
  },
  {
    id: 'proj-05',
    title: 'Vortex FinTech - Banking & Crypto Gateway',
    description: 'Plataforma bancária digital e gateway de pagamentos com liquidação em cripto e PIX instantâneo.',
    longDescription: 'Gateway de pagamento corporativo de alto volume capaz de processar transações financeiras multimoedas, integração bancária via PIX e liquidação automática em ativos digitais. Possui relatórios de conciliação diária.',
    screenshotUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/vortex-fintech-gateway',
    category: 'SaaS',
    techStack: ['Spring Boot 3', 'PostgreSQL', 'Redis', 'React', 'Docker'],
    client: 'FinTech & Pagamentos Digitais',
    completedDate: 'Setembro 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Processamento de alta vazão com Redis Cache',
      'Conformidade com boas práticas de segurança e criptografia AES-256',
      'Dashboard financeiro em tempo real com conciliação'
    ]
  },
  {
    id: 'proj-06',
    title: 'Pulse Health - Telemedicina & Prontuário IA',
    description: 'Sistema completo de agendamento, teleconsulta em vídeo criptografado e transcrição médica via IA.',
    longDescription: 'Plataforma para clínicas e profissionais de saúde que automatiza o fluxo do paciente desde a triagem inteligente até a consulta remota. Conta com modelo de IA especialista na estruturação de notas clínicas.',
    screenshotUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/pulse-health-telemedicine',
    category: 'Web App',
    techStack: ['React', 'TypeScript', 'WebRTC', 'Gemini API', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    client: 'Telemedicina & Saúde Digital',
    completedDate: 'Agosto 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Vídeochamadas P2P com WebRTC',
      'Resumo automático de consultas por inteligência artificial',
      'Geração de prescrições e relatórios padronizados'
    ]
  },
  {
    id: 'proj-07',
    title: 'Velox Logistics - Rastreamento e Roteamento Inteligente',
    description: 'Gestão de frotas e roteamento inteligente de entregas para logística urbana.',
    longDescription: 'Sistema de inteligência geográfica que otimiza rotas de entregas para frotas urbanas, reduzindo consumo de combustível e custos operacionais através de algoritmos de roteamento.',
    screenshotUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/velox-logistics-ai',
    category: 'SaaS',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL / PostGIS', 'Docker'],
    client: 'Logística & Roteamento Inteligente',
    completedDate: 'Julho 2026',
    featured: false,
    viewsCount: 0,
    highlights: [
      'Roteamento geoespacial com PostGIS',
      'Rastreamento em mapa interativo',
      'Comprovante digital de entrega por foto e assinatura'
    ]
  },
  {
    id: 'proj-08',
    title: 'UrbanKicks - E-Commerce Sneaker Culture',
    description: 'Loja virtual de calçados de edição limitada com catálogo interativo e checkout otimizado.',
    longDescription: 'E-commerce especializado na cultura streetwear e calçados exclusivos. Oferece visualização rica de produtos, categorização por raridade e checkout ágil.',
    screenshotUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/urbankicks-ecommerce',
    category: 'E-Commerce',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Node.js', 'PostgreSQL'],
    client: 'E-Commerce Sneaker Culture',
    completedDate: 'Setembro 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Arquitetura responsiva e mobile-first',
      'Checkout integrado com pagamentos instantâneos',
      'Filtros dinâmicos por tamanho, marca e estilo'
    ]
  },
  {
    id: 'proj-09',
    title: 'CyberShield - Monitoramento de Segurança e Logs',
    description: 'Hub de segurança da informação para detecção de anomalias, análise de telemetria e logs em tempo real.',
    longDescription: 'Plataforma para times de infraestrutura e segurança centralizarem telemetria de servidores, status de conexões e identificação proativa de falhas no ambiente.',
    screenshotUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/cybershield-siem-platform',
    category: 'API/Backend',
    techStack: ['Spring Boot', 'PostgreSQL', 'React', 'Docker', 'TypeScript'],
    client: 'Segurança da Informação & SOC',
    completedDate: 'Agosto 2026',
    featured: false,
    viewsCount: 0,
    highlights: [
      'Ingestão contínua e busca indexada de logs',
      'Regras de alertas configuráveis em tempo real',
      'Painel de controle com status dos serviços'
    ]
  },
  {
    id: 'proj-10',
    title: 'Zenith Real Estate - Portal Imobiliário 360',
    description: 'Portal de empreendimentos imobiliários com tours virtuais imersivos e simulação de financiamento.',
    longDescription: 'Landing page e portal de alta conversão focado em imóveis de alto padrão. Apresenta tours virtuais interativos em 360 graus, calculadora de financiamento e captura qualificada de leads.',
    screenshotUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/zenith-realestate-portal',
    category: 'Landing Page',
    techStack: ['React', 'Three.js', 'Tailwind CSS', 'TypeScript', 'Node.js'],
    client: 'Portal Imobiliário & Tours 360',
    completedDate: 'Junho 2026',
    featured: false,
    viewsCount: 0,
    highlights: [
      'Visualização 360° fluida com Three.js',
      'Simulador de parcelamento integrado',
      'Captura e encaminhamento de propostas'
    ]
  },
  {
    id: 'proj-11',
    title: 'OmniDesk - Central de Atendimento Omnichannel',
    description: 'Plataforma unificada de atendimento ao cliente via Web, WhatsApp e Chatbot com IA.',
    longDescription: 'Central de suporte que consolida conversas de múltiplos canais em um único painel. Utiliza assistentes inteligentes para triagem de chamados e encaminhamento organizado.',
    screenshotUrl: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/omnidesk-support-suite',
    category: 'SaaS',
    techStack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'WebSockets', 'Gemini API'],
    client: 'Atendimento Omnichannel & Chat',
    completedDate: 'Maio 2026',
    featured: true,
    viewsCount: 0,
    highlights: [
      'Consolidação de chats em tempo real via WebSockets',
      'Sugestão de respostas rápidas com IA generativa',
      'Painel de controle com métricas de tempo de resposta'
    ]
  },
  {
    id: 'proj-12',
    title: 'Gastronomy - Cardápio Digital & KDS para Restaurantes',
    description: 'Sistema de pedidos na mesa por QR Code e Kitchen Display System (KDS) em tempo real.',
    longDescription: 'Aplicação web progressiva para bares e restaurantes que moderniza o atendimento. Os clientes visualizam pratos no celular via QR Code e a cozinha recebe os pedidos sincronizados.',
    screenshotUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
    liveUrl: 'https://ais-dev-tckwsjpr6cejshhew7mjxv-855330772024.us-east1.run.app',
    githubUrl: 'https://github.com/cardosokks/gastronomy-restaurant-kds',
    category: 'Web App',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'PWA'],
    client: 'Gastronomia & KDS Digital',
    completedDate: 'Julho 2026',
    featured: false,
    viewsCount: 0,
    highlights: [
      'Funciona offline e em conexões oscilantes via PWA',
      'Sincronização instantânea entre salão e cozinha',
      'Gestão de estoque de insumos em tempo real'
    ]
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-01',
    title: 'Arquitetura de API Robusta com Spring Boot, PostgreSQL e Autenticação JWT',
    slug: 'arquitetura-api-spring-boot-postgresql-jwt',
    summary: 'Como planejar e construir APIs RESTful resilientes, tipadas e escaláveis utilizando Spring Boot no backend e tokens JWT de curta duração.',
    content: `
### Introdução

Quando desenvolvemos aplicações web modernas para produção, a segurança e a integridade dos dados são as prioridades absolutas. Neste artigo, exploro a arquitetura padrão combinando **Spring Boot**, **PostgreSQL** e **Autenticação Stateless com JWT (JSON Web Tokens)**.

---

### 1. Modelagem do Banco PostgreSQL e Entidades JPA

Uma boa API começa com uma modelagem relacional rigorosa. No PostgreSQL, garantimos integridade referencial com chaves estrangeiras, índices compostos e restrições de unicidade.

\`\`\`sql
-- Exemplo de Tabela de Usuários e Roles
CREATE TABLE tb_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

No Spring Boot, utilizamos o **Spring Data JPA** para criar repositórios limpos com consultas otimizadas.

---

### 2. Fluxo de Autenticação JWT Seguro

Para garantir que apenas usuários autorizados consigam gerenciar os projetos e postagens, utilizamos o filtro \`OncePerRequestFilter\` do Spring Security:

1. O cliente faz um requisição \`POST /api/auth/login\` enviando e-mail e senha.
2. O servidor valida as credenciais contra a hash Bcrypt armazenada no banco.
3. Se válido, o servidor gera um **JWT assinado com algoritmo HMAC512 ou RSA256**.
4. O cliente inclui o token no cabeçalho \`Authorization: Bearer <TOKEN>\` em todas as requisições protegidas.

---

### 3. Considerações de Performance e Boas Práticas

- **Connection Pooling:** Configuração do HikariCP no Spring Boot para reutilizar conexões PostgreSQL de forma otimizada.
- **DTOs Limpos:** Separação estrita entre Entidades de Banco e DTOs de entrada/saída (Data Transfer Objects), evitando exposição indevida de dados sensíveis.
- **Tratamento Global de Exceções:** Implementação de \`@ControllerAdvice\` para retornar respostas HTTP padronizadas (ex: 401 Unauthorized, 403 Forbidden, 400 Bad Request).
    `,
    category: 'Backend',
    tags: ['Spring Boot', 'PostgreSQL', 'JWT', 'Segurança', 'Java'],
    coverUrl: '/src/assets/images/project_ecommerce_saas_1790707906993.jpg',
    publishedAt: '15 de Setembro, 2026',
    readTime: '6 min de leitura',
    viewsCount: 0,
    author: {
      name: 'Ricardo Cardoso',
      avatar: '/src/assets/images/ricardo_creator_avatar_1790708000570.jpg',
      role: 'Engenheiro Full-Stack Sênior'
    },
    projectId: 'proj-01'
  },
  {
    id: 'post-02',
    title: 'Navegação Reativa e Estados no Frontend Moderno com TypeScript e React',
    slug: 'navegacao-reativa-estados-frontend-typescript-react',
    summary: 'Comparativo prático de gerenciamento de estado, renderização reativa e integração de componentes em aplicações SPA de alta performance.',
    content: `
### Apresentação

No ecossistema moderno com **TypeScript** e **React** (com Hooks nativos, Context e Tailwind CSS), o gerenciamento de estado reativo transformou a criação de interfaces ricas e acessíveis.

---

### 1. Princípios de Reatividade

Em aplicações interativas, o objetivo principal é manter a interface leve, responsiva e livre de re-renders desnecessários.

- **Filtros em tempo real:** O usuário digita no campo de busca ou seleciona uma tag e a lista de itens atualiza instantaneamente com \`useMemo\`.
- **Design System com Tailwind CSS:** Utilitários diretos que mantêm o bundle CSS enxuto e consistente.
- **Acessibilidade WCAG 2.1 AA:** Suporte completo a leitores de tela e navegação via teclado com seleções visíveis.

---

### 2. Boas Práticas de Responsividade

Garantir que todos os componentes se adaptem com perfeição tanto a dispositivos móveis de 360px quanto a monitores ultrawide de 1920px requer disciplina:

1. Touch targets de no mínimo 44px em botões e inputs.
2. Tipografia fluida com contraste de cores auditado.
3. Tratamento rigoroso de overflow horizontal para evitar quebras de layout.
    `,
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Acessibilidade', 'UX/UI'],
    coverUrl: '/src/assets/images/project_agency_portfolio_1790707919660.jpg',
    publishedAt: '20 de Setembro, 2026',
    readTime: '5 min de leitura',
    viewsCount: 0,
    author: {
      name: 'Ricardo Cardoso',
      avatar: '/src/assets/images/ricardo_creator_avatar_1790708000570.jpg',
      role: 'Engenheiro Full-Stack Sênior'
    },
    projectId: 'proj-02'
  },
  {
    id: 'post-03',
    title: 'Integração de Inteligência Artificial para Geração Autônoma de Conteúdo',
    slug: 'integracao-ia-geracao-conteudo-analytics-gemini',
    summary: 'Como integrar modelos de linguagem de última geração no fluxo da sua aplicação web para criação de resumos técnicos automatizados.',
    content: `
### Inteligência Artificial em Aplicações Web

Adicionar recursos inteligentes eleva o patamar de qualquer aplicação web. No nosso painel administrativo, incluímos um assistente baseado nos modelos **Gemini** do Google AI Studio com chamadas protegidas no servidor.

---

### Destaques do Assistente IA:

1. **Auto-Sumarização Técnica:** Transforma tópicos brutos em artigos estruturados para o blog.
2. **Sugestão de Tags:** Analisa o stack do projeto e sugere as melhores palavras-chave.
3. **Tarefas Autônomas:** Agendamento periódico para busca e redação de novidades de tecnologia.
    `,
    category: 'Inteligência Artificial',
    tags: ['Gemini API', 'AI Integration', 'TypeScript', 'Node.js'],
    coverUrl: '/src/assets/images/project_ai_analytics_1790707930507.jpg',
    publishedAt: '25 de Setembro, 2026',
    readTime: '4 min de leitura',
    viewsCount: 0,
    author: {
      name: 'Ricardo Cardoso',
      avatar: '/src/assets/images/ricardo_creator_avatar_1790708000570.jpg',
      role: 'Engenheiro Full-Stack Sênior'
    },
    projectId: 'proj-03'
  }
];

export const INITIAL_COMMENTS: Comment[] = [];

export const INITIAL_SUBSCRIBERS: Subscriber[] = [];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'tech-01',
    name: 'React',
    logoUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
    websiteUrl: 'https://react.dev',
    order: 1,
    active: true
  },
  {
    id: 'tech-02',
    name: 'TypeScript',
    logoUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png',
    websiteUrl: 'https://www.typescriptlang.org',
    order: 2,
    active: true
  },
  {
    id: 'tech-03',
    name: 'Node.js',
    logoUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png',
    websiteUrl: 'https://nodejs.org',
    order: 3,
    active: true
  },
  {
    id: 'tech-04',
    name: 'Spring Boot',
    logoUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/spring-boot/spring-boot.png',
    websiteUrl: 'https://spring.io/projects/spring-boot',
    order: 4,
    active: true
  },
  {
    id: 'tech-05',
    name: 'PostgreSQL',
    logoUrl: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png',
    websiteUrl: 'https://www.postgresql.org',
    order: 5,
    active: true
  },
  {
    id: 'tech-06',
    name: 'Docker',
    logoUrl: 'https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png',
    websiteUrl: 'https://www.docker.com',
    order: 6,
    active: true
  },
  {
    id: 'tech-07',
    name: 'Tailwind CSS',
    logoUrl: 'https://tailwindcss.com/favicons/apple-touch-icon.png',
    websiteUrl: 'https://tailwindcss.com',
    order: 7,
    active: true
  },
  {
    id: 'tech-08',
    name: 'GitHub',
    logoUrl: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png',
    websiteUrl: 'https://github.com/cardosokks',
    order: 8,
    active: true
  }
];

export const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-01',
    name: 'Ricardo Cardoso',
    role: 'Engenheiro de Software Full-Stack & Arquiteto de Soluções',
    bio: 'Especialista no desenvolvimento de sistemas web escaláveis, microsserviços resilientes, APIs RESTful de alta performance e interfaces modernas com acessibilidade (WCAG 2.1 AA). Experiência sólida em React, TypeScript, Spring Boot, PostgreSQL, Docker e Cloud.',
    avatarUrl: '/src/assets/images/ricardo_creator_avatar_1790708000570.jpg',
    skills: ['React & Next.js', 'TypeScript', 'Node.js / Express', 'Spring Boot', 'PostgreSQL', 'Docker & CI/CD', 'Tailwind CSS', 'WCAG 2.1 AA'],
    githubUrl: 'https://github.com/cardosokks',
    linkedinUrl: 'https://linkedin.com/in/cardosokks',
    websiteUrl: 'https://github.com/cardosokks',
    email: 'ricardo.estudos1998@gmail.com',
    whatsapp: '',
    featured: true,
    order: 1,
    active: true
  }
];
