/* =====================================================================
   data.js — TODO el contenido del portafolio vive acá.
   Para actualizar tu portafolio, en general solo tocás este archivo.
   Cada texto tiene versión { es: "...", en: "..." }.
   ===================================================================== */

const PROFILE = {
  name: "Alejandro Insfran",
  fullName: "Alejandro Daniel Insfran Cañete",
  email: "tu-correo@ejemplo.com",                         // CAMBIAR
  github: "https://github.com/TU-USUARIO",                // CAMBIAR
  linkedin: "https://www.linkedin.com/in/TU-PERFIL",      // CAMBIAR
  cv: { es: "CV_Alejandro_Insfran_ES.pdf", en: "CV_Alejandro_Insfran_EN.pdf" },
  location: { es: "San Lorenzo, Paraguay", en: "San Lorenzo, Paraguay" },
};

/* ---------- Textos fijos de la interfaz ---------- */
const UI = {
  "nav.strengths": { es: "Fortalezas", en: "Strengths" },
  "nav.stack": { es: "Stack", en: "Stack" },
  "nav.experience": { es: "Experiencia", en: "Experience" },
  "nav.projects": { es: "Proyectos", en: "Projects" },
  "nav.contact": { es: "Contacto", en: "Contact" },
  "skip": { es: "Saltar al contenido", en: "Skip to content" },

  "hero.hello": { es: "Hola, soy", en: "Hi, I'm" },
  "hero.role": {
    es: "Backend Developer en sistemas financieros de alta criticidad",
    en: "Backend Developer for business-critical financial systems",
  },
  "hero.lead": {
    es: "Trabajo todos los días sobre el core de un banco: préstamos, garantías, tarjetas y reportes regulatorios. En paralelo construyo mis propios productos web, de la base de datos al deploy.",
    en: "I work every day on a bank's core system: loans, collateral, cards and regulatory reporting. On the side, I build my own web products, from the database to deployment.",
  },
  "hero.cta.projects": { es: "Ver proyectos", en: "See projects" },
  "hero.cta.cv": { es: "Descargar CV", en: "Download CV" },
  "hero.status": {
    es: "Abierto a trabajo remoto, híbrido o presencial",
    en: "Open to remote, hybrid or on-site roles",
  },

  "strengths.title": { es: "Lo que hago bien", en: "What I do well" },
  "stack.title": { es: "Skills", en: "Skills" },
  "skills.hint": { es: "Tocá una tecla o presioná cualquier letra", en: "Tap a key or press any letter" },
  "skills.list": { es: "Ver como lista", en: "View as list" },
  "contact.name": { es: "Tu nombre", en: "Your name" },
  "contact.message": { es: "Contame sobre el puesto o proyecto", en: "Tell me about the role or project" },
  "contact.send": { es: "Enviar mensaje", en: "Send message" },
  "contact.big": { es: "Trabajemos juntos", en: "Let's work together" },
  "stack.legend.daily": { es: "Uso diario", en: "Daily use" },
  "stack.legend.projects": { es: "Usado en proyectos", en: "Used in projects" },
  "stack.legend.learning": { es: "Aprendiendo", en: "Learning" },
  "experience.title": { es: "Experiencia", en: "Experience" },
  "projects.title": { es: "Proyectos", en: "Projects" },
  "projects.filter.all": { es: "Todos", en: "All" },
  "projects.empty": {
    es: "No hay proyectos en esta categoría todavía.",
    en: "No projects in this category yet.",
  },
  "projects.open": { es: "Ver detalle", en: "View details" },
  "project.demo": { es: "Abrir demo", en: "Open demo" },
  "project.code": { es: "Ver código", en: "View code" },
  "project.private": {
    es: "Repositorio privado. Puedo mostrar el código en una entrevista.",
    en: "Private repository. I can walk through the code in an interview.",
  },
  "project.nodemo": { es: "Demo disponible a pedido.", en: "Demo available on request." },
  "project.close": { es: "Cerrar", en: "Close" },
  "project.highlights": { es: "Qué resolví", en: "What I built" },
  "contact.title": { es: "Hablemos", en: "Let's talk" },
  "contact.text": {
    es: "Si buscás a alguien que entienda datos donde el dinero importa, escribime.",
    en: "If you need someone who understands data where money is on the line, reach out.",
  },
  "footer.built": {
    es: "Hecho a mano con HTML, CSS y JavaScript. Publicado con GitHub Pages.",
    en: "Handmade with HTML, CSS and JavaScript. Published with GitHub Pages.",
  },
};

/* ---------- Fortalezas ---------- */
const STRENGTHS = [
  {
    title: { es: "Encuentro la causa raíz", en: "I find the root cause" },
    text: {
      es: "En sistemas legacy de un banco, un error casi nunca está donde aparece. Rastreo el dato desde la pantalla hasta la tabla hasta dar con el origen real.",
      en: "In a bank's legacy systems, a bug is rarely where it shows up. I trace the data from the screen down to the table until I find the real origin.",
    },
    example: {
      es: "Un reporte de riesgo sumaba capital de más. Probé y descarté la hipótesis de cotizaciones y demostré con datos que un join duplicaba filas.",
      en: "A risk report was overstating capital. I ruled out an exchange-rate hypothesis and proved with data that a join was duplicating rows.",
    },
  },
  {
    title: { es: "Datos precisos donde el dinero importa", en: "Accurate data where money matters" },
    text: {
      es: "Cálculo de intereses, cuotas, saldos y reportes regulatorios. Cambios mínimos, probados y sin romper lo que ya funciona.",
      en: "Interest, installments, balances and regulatory reports. Minimal, tested changes that don't break what already works.",
    },
    example: {
      es: "Extendí un paquete PL/SQL de reportes de morosidad a nuevos módulos sin modificar la lógica existente.",
      en: "I extended a PL/SQL delinquency-reporting package to new modules without changing existing logic.",
    },
  },
  {
    title: { es: "Productos de punta a punta", en: "End-to-end products" },
    text: {
      es: "Diseño el esquema, la seguridad por fila, la interfaz y el deploy. Tengo productos propios funcionando con usuarios reales.",
      en: "I design the schema, row-level security, UI and deployment. I run my own products with real users.",
    },
    example: {
      es: "WalletIQ: autenticación, período de prueba, escáner de recibos con IA y chatbot financiero.",
      en: "WalletIQ: authentication, free trial, AI receipt scanner and a financial chatbot.",
    },
  },
];

/* ---------- Stack / teclado 3D ----------
   Cada habilidad con "key" se convierte en una tecla del teclado 3D.
   level:  "daily" (uso diario) | "projects" (usado en proyectos) | "learning" (aprendiendo)
   key:    texto corto que se imprime en la tecla (máx. ~7 letras)
   color:  color de la tecla
   phrase: lo que aparece al presionarla
   Ajustá los niveles a lo que puedas defender en una entrevista.            */
const KEY_COLORS = {
  orange: "#F97316", red: "#EF4444", blue: "#3B82F6", cyan: "#14B8C4",
  green: "#16A34A", purple: "#8B5CF6", yellow: "#F5A524", black: "#1E2533",
};

const SKILLS = [
  {
    group: { es: "Bases de datos", en: "Databases" },
    items: [
      { name: "Oracle Database", key: "Oracle", color: "red", level: "daily",
        phrase: { es: "Donde vive el dinero del banco. La uso todos los días.", en: "Where the bank's money lives. I use it every day." } },
      { name: "SQL", key: "SQL", color: "orange", level: "daily",
        phrase: { es: "Si el dato existe, lo encuentro.", en: "If the data exists, I'll find it." } },
      { name: "PL/SQL", key: "PL/SQL", color: "yellow", level: "daily",
        phrase: { es: "Paquetes, cursores y reportes que no pueden fallar.", en: "Packages, cursors and reports that can't fail." } },
      { name: "PostgreSQL", key: "PG", color: "blue", level: "projects",
        phrase: { es: "La base de mis productos propios.", en: "The database behind my own products." } },
      { name: "Supabase + RLS", key: "SB", color: "green", level: "projects",
        phrase: { es: "Auth, storage y seguridad por fila.", en: "Auth, storage and row-level security." } },
    ],
  },
  {
    group: { es: "Backend", en: "Backend" },
    items: [
      { name: "Python", key: "Py", color: "blue", level: "projects",
        phrase: { es: "Mi puerta de entrada al backend abierto.", en: "My way into open-source backend." } },
      { name: "Django", key: "Dj", color: "green", level: "learning",
        phrase: { es: "Aprendiendo desde cero, bien de base.", en: "Learning it from the ground up." } },
      { name: "Java", key: "Java", color: "orange", level: "learning",
        phrase: { es: "Tipado fuerte, en camino.", en: "Strong typing, on the way." } },
      { name: "Spring Boot", key: "Spring", color: "green", level: "learning",
        phrase: { es: "El próximo nivel del backend.", en: "The next backend level." } },
      { name: "APIs REST", key: "REST", color: "black", level: "projects",
        phrase: { es: "Contratos claros entre sistemas.", en: "Clear contracts between systems." } },
    ],
  },
  {
    group: { es: "Frontend", en: "Frontend" },
    items: [
      { name: "JavaScript", key: "JS", color: "yellow", level: "projects",
        phrase: { es: "El que siempre está.", en: "Always there." } },
      { name: "TypeScript", key: "TS", color: "blue", level: "projects",
        phrase: { es: "JavaScript con cinturón de seguridad.", en: "JavaScript with a seatbelt." } },
      { name: "HTML", key: "HTML", color: "red", level: "projects",
        phrase: { es: "La estructura de todo lo que se ve.", en: "The structure of everything you see." } },
      { name: "CSS", key: "CSS", color: "purple", level: "projects",
        phrase: { es: "Que se vea bien en cualquier pantalla.", en: "Looks good on any screen." } },
      { name: "Next.js", key: "Next", color: "black", level: "projects",
        phrase: { es: "Mi ERP multinegocio corre acá.", en: "My multi-business ERP runs on it." } },
      { name: "React", key: "React", color: "cyan", level: "learning",
        phrase: { es: "Componentes, estado y paciencia.", en: "Components, state and patience." } },
      { name: "Tailwind CSS", key: "TW", color: "cyan", level: "projects",
        phrase: { es: "Estilos rápidos sin salir del HTML.", en: "Fast styling without leaving HTML." } },
    ],
  },
  {
    group: { es: "DevOps y herramientas", en: "DevOps & tools" },
    items: [
      { name: "VS Code", key: "Code", color: "blue", level: "projects",
        phrase: { es: "Mi casa.", en: "Home sweet home." } },
      { name: "Git", key: "Git", color: "red", level: "daily",
        phrase: { es: "Cada cambio con su historia.", en: "Every change has a story." } },
      { name: "GitHub", key: "GH", color: "black", level: "projects",
        phrase: { es: "Donde estás viendo esto.", en: "Where you're looking at this." } },
      { name: "Jira", key: "Jira", color: "blue", level: "daily",
        phrase: { es: "Tickets que se cierran.", en: "Tickets that get closed." } },
      { name: "Docker", key: "Docker", color: "cyan", level: "learning",
        phrase: { es: "Funciona en mi máquina y en la tuya.", en: "Works on my machine and yours." } },
      { name: "Netlify", key: "NTL", color: "cyan", level: "projects",
        phrase: { es: "Deploy con un push.", en: "Deploy with a push." } },
      { name: "Vercel", key: "VCL", color: "black", level: "projects",
        phrase: { es: "Producción sin drama.", en: "Production without drama." } },
      { name: "VPS + Cloudflare", key: "VPS", color: "orange", level: "projects",
        phrase: { es: "Servidor propio con Cloudflare adelante.", en: "My own server behind Cloudflare." } },
    ],
  },
  {
    group: { es: "Core bancario", en: "Core banking" },
    items: [
      { name: "Oracle Forms", key: "Forms", color: "red", level: "daily",
        phrase: { es: "Las pantallas del core bancario.", en: "The core banking screens." } },
      { name: "Oracle Reports", key: "RDF", color: "purple", level: "daily",
        phrase: { es: "Reportes donde cada guaraní cuenta.", en: "Reports where every cent counts." } },
      { name: "PL/SQL Developer", level: "daily" },
      { name: "Préstamos y cuotas", level: "daily" },
      { name: "Reportes regulatorios", level: "daily" },
    ],
  },
];

/* ---------- Experiencia (del más reciente al más antiguo) ---------- */
const EXPERIENCE = [
  {
    role: {
      es: "Desarrollador de Datos y Sistemas (Bases de Datos Core Bancario)",
      en: "Data & Systems Developer (Core Banking Databases)",
    },
    company: "Zeta Banco S.A.E.C.A.",
    period: { es: "Ene 2026 – actualidad", en: "Jan 2026 – present" },
    points: {
      es: [
        "Diagnostico y corrijo incidencias del core bancario (préstamos, garantías, tarjetas y cuentas) con SQL, PL/SQL, Oracle Forms y Reports, gestionadas por tickets en Jira.",
        "Encontré la causa raíz de diferencias en el cálculo de intereses de cuotas y de montos duplicados en reportes de riesgo por joins con filas repetidas.",
        "Extendí un paquete PL/SQL de reporte de morosidad para sumar cuenta corriente y cuentas vencidas junto a préstamos y tarjetas.",
        "Agregué reglas de negocio a vistas de inventario de préstamos, analizando dependencias para no invalidar objetos relacionados.",
        "Reemplacé valores fijos en el código por parámetros configurables por módulo, moneda y oficina.",
      ],
      en: [
        "I diagnose and fix core banking issues (loans, collateral, cards and accounts) using SQL, PL/SQL, Oracle Forms and Reports, tracked through Jira tickets.",
        "Found the root cause of installment interest mismatches and of duplicated amounts in risk reports caused by joins with repeated rows.",
        "Extended a PL/SQL delinquency-reporting package to include checking and past-due accounts alongside loans and cards.",
        "Added business rules to loan inventory views, analyzing dependencies to avoid invalidating related objects.",
        "Replaced hard-coded values with parameters configurable by module, currency and branch.",
      ],
    },
  },
  {
    role: { es: "Analista de Datos y Soporte de Sistemas", en: "Data Analyst & Systems Support" },
    company: "Zeta Banco S.A.E.C.A.",
    period: { es: "Feb 2023 – ene 2026", en: "Feb 2023 – Jan 2026" },
    points: {
      es: [
        "Optimicé consultas lentas sobre tablas de préstamos y créditos con múltiples joins.",
        "Analicé tablas históricas de cuentas para detectar y explicar diferencias de saldos.",
        "Corregí un error de división por cero en seis objetos PL/SQL de un reporte de ratios de liquidez.",
      ],
      en: [
        "Optimized slow multi-join queries on loan and credit tables.",
        "Analyzed historical account tables to detect and explain balance discrepancies.",
        "Fixed a division-by-zero error across six PL/SQL objects in a liquidity ratio report.",
      ],
    },
  },
];

/* ---------- Proyectos ----------
   PARA AGREGAR UN PROYECTO: copiá este bloque al final del array y completalo.

   {
     slug: "mi-proyecto",                 // sin espacios, se usa en la URL (#p/mi-proyecto)
     name: "Mi proyecto",
     category: "backend",                 // "backend" | "fullstack" | "ecommerce"
     status: { es: "En desarrollo", en: "In progress" },
     summary: { es: "Una línea.", en: "One line." },
     description: { es: "Párrafo corto.", en: "Short paragraph." },
     highlights: { es: ["Logro 1", "Logro 2"], en: ["Achievement 1", "Achievement 2"] },
     stack: ["Python", "Django", "PostgreSQL"],
     demo: "https://...",                 // o null si no hay demo pública
     repo: "https://github.com/...",      // o null si el repo es privado
     image: "mi-proyecto.png",            // subí la captura a la raíz, o null para usar la portada generada
   },
*/
const CATEGORIES = [
  { id: "all", label: { es: "Todos", en: "All" } },
  { id: "fullstack", label: { es: "Full-stack", en: "Full-stack" } },
  { id: "backend", label: { es: "Backend", en: "Backend" } },
  { id: "ecommerce", label: { es: "E-commerce", en: "E-commerce" } },
];

const PROJECTS = [
  {
    slug: "walletiq",
    name: "WalletIQ",
    category: "fullstack",
    status: { es: "En producción", en: "Live" },
    summary: {
      es: "App de finanzas personales para Paraguay y LATAM.",
      en: "Personal finance app for Paraguay and LATAM.",
    },
    description: {
      es: "Aplicación web para ordenar gastos e ingresos en varias monedas, con asistente financiero con IA y documentos legales paraguayos.",
      en: "Web app to track income and expenses in multiple currencies, with an AI financial assistant and Paraguayan legal documents.",
    },
    highlights: {
      es: [
        "Autenticación y período de prueba de 30 días.",
        "Escáner de recibos con IA y chatbot financiero con la API de Claude.",
        "Esquema en PostgreSQL con seguridad a nivel de fila (RLS).",
        "Soporte multimoneda y generación de documentos legales.",
      ],
      en: [
        "Authentication and a 30-day free trial.",
        "AI receipt scanner and financial chatbot built on the Claude API.",
        "PostgreSQL schema with row-level security (RLS).",
        "Multi-currency support and legal document generation.",
      ],
    },
    stack: ["JavaScript", "HTML/CSS", "Supabase", "PostgreSQL", "Claude API", "Netlify"],
    demo: "https://glowing-rugelach-0b87c0.netlify.app",
    repo: null,
    image: null,
  },
  {
    slug: "salesclose",
    name: "SalesClose",
    category: "fullstack",
    status: { es: "En producción", en: "Live" },
    summary: {
      es: "Plataforma SaaS para cerrar ventas por WhatsApp.",
      en: "SaaS platform to close sales over WhatsApp.",
    },
    description: {
      es: "Panel multiempresa para gestionar leads, conversaciones y plantillas de venta, con planes y precios por país.",
      en: "Multi-tenant dashboard to manage leads, conversations and sales templates, with plans and per-country pricing.",
    },
    highlights: {
      es: [
        "Arquitectura multi-tenant: organizaciones, leads, conversaciones y plantillas.",
        "Seguridad por fila (RLS) para aislar los datos de cada empresa.",
        "Período de prueba de 14 días y planes escalonados en USD con moneda local.",
      ],
      en: [
        "Multi-tenant architecture: organizations, leads, conversations and templates.",
        "Row-level security (RLS) to isolate each company's data.",
        "14-day trial and tiered USD plans with local currency equivalents.",
      ],
    },
    stack: ["JavaScript", "HTML/CSS", "Supabase", "PostgreSQL", "Netlify"],
    demo: null,
    repo: null,
    image: null,
  },
  {
    slug: "erp-multinegocio",
    name: "ERP multinegocio",
    category: "fullstack",
    status: { es: "En desarrollo", en: "In progress" },
    summary: {
      es: "Sistema de gestión para varios negocios en una sola app.",
      en: "Management system for several businesses in one app.",
    },
    description: {
      es: "Ventas, compras, inventario, comisiones y rentabilidad real por negocio, con un tablero consolidado.",
      en: "Sales, purchasing, inventory, commissions and real profitability per business, with a consolidated dashboard.",
    },
    highlights: {
      es: [
        "Datos aislados por negocio y arquitectura preparada para sumar más negocios.",
        "Roles de administrador, vendedor y operador con permisos distintos.",
        "Comisiones con porcentaje y umbrales configurables, sin valores fijos en el código.",
        "Separación explícita entre venta, ganancia e inversión.",
      ],
      en: [
        "Per-business data isolation, designed to add new businesses without a rewrite.",
        "Admin, seller and operator roles with different permissions.",
        "Commissions with configurable rates and thresholds, no hard-coded values.",
        "Explicit separation of revenue, profit and investment.",
      ],
    },
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel"],
    demo: null,
    repo: null,
    image: null,
  },
  {
    slug: "casa-de-cambios",
    name: "Casa de cambios",
    category: "backend",
    status: { es: "En desarrollo", en: "In progress" },
    summary: {
      es: "Sistema para una casa de cambios hecho con Django.",
      en: "Currency exchange system built with Django.",
    },
    description: {
      es: "Proyecto para dominar Django desde cero: modelos, vistas, formularios y reglas de negocio de compra y venta de divisas.",
      en: "Project to master Django from scratch: models, views, forms and currency buy/sell business rules.",
    },
    highlights: {
      es: ["Backend con Django y plantillas HTML/CSS.", "Código versionado en GitHub."],
      en: ["Django backend with HTML/CSS templates.", "Code versioned on GitHub."],
    },
    stack: ["Python", "Django", "HTML/CSS", "Git"],
    demo: null,
    repo: "https://github.com/TU-USUARIO/casadecambios", // CAMBIAR cuando lo subas
    image: null,
  },
  {
    slug: "tienda-shopify",
    name: "Tienda Shopify a medida",
    category: "ecommerce",
    status: { es: "En producción", en: "Live" },
    summary: {
      es: "Theme propio para una marca de e-commerce en Paraguay.",
      en: "Custom theme for an e-commerce brand in Paraguay.",
    },
    description: {
      es: "Landing de venta con secciones modulares, pago contra entrega y medición de conversiones para campañas de Meta Ads.",
      en: "Sales landing page with modular sections, cash on delivery and conversion tracking for Meta Ads campaigns.",
    },
    highlights: {
      es: [
        "Theme en Liquid con secciones reutilizables.",
        "Meta Pixel y Conversions API para medir compras.",
        "Checkout nativo con reglas de pago según zona de envío.",
      ],
      en: [
        "Liquid theme with reusable sections.",
        "Meta Pixel and Conversions API to track purchases.",
        "Native checkout with payment rules by shipping zone.",
      ],
    },
    stack: ["Shopify", "Liquid", "JavaScript", "CSS", "Meta Pixel"],
    demo: null,
    repo: null,
    image: null,
  },
];
