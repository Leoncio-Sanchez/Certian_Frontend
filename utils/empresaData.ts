/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  Candidate,
  Challenge,
  EvaluationSubmission,
  Mentor,
  ImmersionBoardItem,
  CompanyBrandProfile
} from "~/types/empresa";

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Mateo Silva-Santisteban",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    career: "Ingeniería de Software · Institucional",
    cycle: "9no Ciclo",
    location: "Lima, Perú (Híbrido)",
    matches: 98,
    topTalent: true,
    badge: "Avanzado",
    techStack: ["FULL-STACK", "BLOCKCHAIN", "AI OPS", "React", "Node.js", "Solidity"],
    softSkills: ["Colaboración Radical", "Pensamiento Sistémico", "Adaptabilidad"],
    bio: "Apasionado por crear sistemas descentralizados robustos y arquitecturas escalables. Ganador del Hackathon Nacional CERTIAN 2025. Busco nuevos desafíos que impacten la cadena de suministro global.",
    validation360: {
      technical: 96,
      analytic: 94,
      communication: 88,
      systemic: 95,
      resilience: 92
    },
    challengesCompleted: [
      {
        id: "chal-comp-1",
        title: "Optimizador de Algoritmos Genéticos v2",
        date: "14 Oct 2025",
        points: 80,
        seal: "Medio"
      },
      {
        id: "chal-comp-2",
        title: "Arquitectura Micro-Frontend Scalable",
        date: "03 Nov 2025",
        points: 100,
        seal: "Avanzado"
      }
    ],
    contactEmail: "mateo.silva@certian.edu.pe",
    githubUrl: "https://github.com/mateo-silvas",
    linkedinUrl: "https://linkedin.com/in/mateo-silva-santisteban"
  },
  {
    id: "cand-2",
    name: "Mateo Rivadeneira",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    career: "Ingeniería de Sistemas",
    cycle: "8vo Ciclo",
    location: "Lima (Remoto)",
    matches: 96,
    topTalent: true,
    badge: "Medio",
    techStack: ["Python", "Docker", "PostgreSQL", "React", "FastAPI"],
    softSkills: ["Comunicación Efectiva", "Liderazgo de Equipos", "Autonomía"],
    bio: "Especialista en desarrollo backend y optimización de bases de datos relacionales y no relacionales. Me encanta documentar y seguir metodologías ágiles rigurosas.",
    validation360: {
      technical: 91,
      analytic: 95,
      communication: 90,
      systemic: 88,
      resilience: 85
    },
    challengesCompleted: [
      {
        id: "chal-comp-3",
        title: "Modelamiento Predictivo de Inventarios",
        date: "20 Sep 2025",
        points: 75,
        seal: "Medio"
      }
    ],
    contactEmail: "mrivadeneira@certian.edu.pe"
  },
  {
    id: "cand-3",
    name: "Camila Torres",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    career: "Ingeniería de Software",
    cycle: "9no Ciclo",
    location: "Tarapoto (Híbrido)",
    matches: 95,
    topTalent: true,
    badge: "Avanzado",
    techStack: ["React", "AWS", "Kubernetes", "TypeScript", "Node.js"],
    softSkills: ["Pensamiento Crítico", "Colaboración Radical", "Empatía"],
    bio: "Fascinada por las soluciones Cloud Native y la automatización de infraestructura. He liderado proyectos académicos basados en arquitecturas sin servidor (Serverless).",
    validation360: {
      technical: 93,
      analytic: 90,
      communication: 94,
      systemic: 91,
      resilience: 89
    },
    challengesCompleted: [
      {
        id: "chal-comp-4",
        title: "Filtro de Tráfico DDoS Distribuido",
        date: "01 Nov 2025",
        points: 120,
        seal: "Avanzado"
      }
    ],
    contactEmail: "camila.torres@certian.edu.pe"
  },
  {
    id: "cand-4",
    name: "Sebastian Valles",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    career: "Ingeniería de Software",
    cycle: "7mo Ciclo",
    location: "Juliaca (Presencial)",
    matches: 92,
    topTalent: false,
    badge: "Medio",
    techStack: ["Java", "Spring Boot", "Microservicios", "GraphQL", "MySQL"],
    softSkills: ["Flexibilidad", "Pensamiento Sistémico", "Solución de Problemas"],
    bio: "Desarrollador backend junior con gran motivación por integrarse a proyectos industriales corporativos. Apasionado por patrones de diseño de software y código limpio.",
    validation360: {
      technical: 87,
      analytic: 89,
      communication: 85,
      systemic: 90,
      resilience: 88
    },
    challengesCompleted: [],
    contactEmail: "sebasvalles@certian.edu.pe"
  },
  {
    id: "cand-5",
    name: "Luciana Herrera",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    career: "Ingeniería de Alimentos",
    cycle: "10mo Ciclo",
    location: "Lima (Presencial)",
    matches: 89,
    topTalent: false,
    badge: "Básico",
    techStack: ["HACCP", "Control de Calidad", "Microbiología", "Diseño de Procesos"],
    softSkills: ["Atención al Detalle", "Trabajo Bajo Presión", "Ética Profesional"],
    bio: "Enfocada en optimizar cadenas de producción alimentarias seguras y sostenibles. Realicé pasantías de investigación sobre empaques biodegradables.",
    validation360: {
      technical: 89,
      analytic: 86,
      communication: 88,
      systemic: 82,
      resilience: 91
    },
    challengesCompleted: [
      {
        id: "chal-comp-5",
        title: "Trazabilidad Segura SmartFood",
        date: "12 Aug 2025",
        points: 80,
        seal: "Básico"
      }
    ],
    contactEmail: "luciana.herrera@certian.edu.pe"
  },
  {
    id: "cand-6",
    name: "Daniel Espinoza",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    career: "Administración",
    cycle: "9no Ciclo",
    location: "Lima (Híbrido)",
    matches: 91,
    topTalent: false,
    badge: "Medio",
    techStack: ["Agile", "Scrum Master", "Finanzas Corporativas", "PowerBI"],
    softSkills: ["Negociación", "Liderazgo Adaptativo", "Visión Estratégica"],
    bio: "Facilitador de equipos ágiles con experiencia en planificación presupuestal y control financiero. Proactivo y enfocado en la mejora continua de procesos.",
    validation360: {
      technical: 85,
      analytic: 92,
      communication: 93,
      systemic: 86,
      resilience: 90
    },
    challengesCompleted: [],
    contactEmail: "daniel.espi@certian.edu.pe"
  },
  {
    id: "cand-7",
    name: "Sofía Mendoza",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    career: "Ciencias de la Comunicación",
    cycle: "8vo Ciclo",
    location: "Tarapoto (Remoto)",
    matches: 94,
    topTalent: true,
    badge: "Básico",
    techStack: ["SEO", "Copywriting", "Branding Digital", "Adobe Premier"],
    softSkills: ["Narrativa Persuasiva", "Empatía Social", "Asertividad"],
    bio: "Especialista en storytelling corporativo y posicionamiento de marcas emergentes. He desarrollado estrategias de comunicación corporativa digital con gran impacto orgánico.",
    validation360: {
      technical: 90,
      analytic: 85,
      communication: 97,
      systemic: 89,
      resilience: 93
    },
    challengesCompleted: [
      {
        id: "chal-comp-6",
        title: "Estrategia Campaña Social Wave",
        date: "28 Sep 2025",
        points: 70,
        seal: "Básico"
      }
    ],
    contactEmail: "sofiamendoza@certian.edu.pe"
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "chal-1",
    title: "Optimización Logística SmartChain v2",
    description: "Diseñar un algoritmo de ruteo eficiente e incorporar hashes distribuidos para la trazabilidad inmutable de suministros frios, minimizando costos de desvío y garantizando control de temperatura en tiempo real.",
    rewardHEC: 150,
    durationWeeks: 4,
    activeParticipantsCount: 14,
    status: "active",
    difficulty: "Avanzado",
    tags: ["Blockchain", "Logística", "Algorítmica"],
    category: "Tech & Agro",
    participants: [
      { id: "cand-1", name: "Mateo Silva-Santisteban", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", progress: 85 },
      { id: "p-1", name: "Lucía Fernández", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80", progress: 65 },
      { id: "p-2", name: "Carlos Méndez", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80", progress: 40 }
    ]
  },
  {
    id: "chal-2",
    title: "Arquitectura Microservicios Resilientes Cloud",
    description: "Refactorizar una plataforma monolítica bancaria en microservicios independientes que toleren fallos en cascada usando patrones circuit breaker y colas distribuidas para un alto rendimiento transaccional.",
    rewardHEC: 120,
    durationWeeks: 3,
    activeParticipantsCount: 8,
    status: "active",
    difficulty: "Avanzado",
    tags: ["Cloud Native", "Docker", "Sistemas Distribuídos"],
    category: "Microservicios",
    participants: [
      { id: "cand-3", name: "Camila Torres", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", progress: 90 },
      { id: "p-3", name: "Gabriel Soto", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80", progress: 70 }
    ]
  },
  {
    id: "chal-3",
    title: "Análisis Predictivo de Fuga de Clientes",
    description: "Construir e integrar modelos basados en ensamblados de árboles para identificar segmentos de usuarios con alto riesgo de abandono y proponer políticas automáticas de fidelización.",
    rewardHEC: 90,
    durationWeeks: 2,
    activeParticipantsCount: 19,
    status: "active",
    difficulty: "Medio",
    tags: ["Data Science", "Python", "Machine Learning"],
    category: "Inteligencia Artificial",
    participants: [
      { id: "cand-2", name: "Mateo Rivadeneira", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", progress: 95 }
    ]
  },
  {
    id: "chal-4",
    title: "Sistema Descentralizado Sello Académico CERTIAN",
    description: "Diseñar e implementar un contrato inteligente inteligente para gestionar y publicar de forma segura los sellos de excelencia académica de los talentos de CERTIAN.",
    rewardHEC: 180,
    durationWeeks: 5,
    activeParticipantsCount: 6,
    status: "draft",
    difficulty: "Avanzado",
    tags: ["Solidity", "Blockchain", "Smart Contracts"],
    category: "Blockchain",
    participants: []
  }
];

export const INITIAL_EVALUATIONS: EvaluationSubmission[] = [
  {
    id: "sub-1",
    candidateId: "cand-8",
    candidateName: "Ana Paula Torres",
    candidateCareer: "Especialista en Infraestructura TI",
    candidateAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    challengeTitle: "Optimización de Redes Corporativas Híbridas",
    submissionDate: "Hace 10 minutos",
    docTitle: "Propuesta Técnica de Robustez y VPN Multicloud.pdf",
    docContent: `PROPUESTA DE OPTIMIZACIÓN DE REDES - ANA PAULA TORRES

1. ARQUITECTURA PROPUESTA
Se diseña un túnel IPsec redundante multinube conectando las oficinas centrales de CERTIAN con instancias en AWS y GCP. Para asegurar latencia baja (<15ms) y tolerancia a caídas del 99.99%, se define:
- En rutadores Edge: Balanceo de carga dinámico vía BGP Multi-Exit Discriminator.
- Failover automatizado: Encriptación mediante claves rotativas automáticas IKEv2 cada 60 min.

2. SEGURIDAD & SEGMENTACIÓN (VPC)
- Aislación de tráfico: Se definen subredes privadas (/24) controladas mediante políticas estrictas de Security Groups (Stateful) y NACLs (Stateless).
- Bastion Hosts: Acceso SSH restringido exclusivamente por túneles VPN autenticados vía MFA de hardware.
- Monitorización activa: Implementación de VPC Flow Logs agregados a ElasticSearch para alarmas en tiempo real ante escaneos de puertos inusuales.

3. ANÁLISIS DE COSTOS Y FACTIBILIDAD
El costo operativo del equipamiento físico migrado a VPN Virtual Gateways representa un ahorro proyectado del 35.4% de gastos fijos mensuales corporativos en enlaces dedicados tradicionales.`,
    rubricScore: {
      technical: 9,
      analytic: 8,
      communication: 9
    },
    checkedSkills: ["AWS VPC", "Séguridad Redes", "BGP Routing", "Tolerancia a Fallos"],
    status: "pending"
  },
  {
    id: "sub-2",
    candidateId: "cand-9",
    candidateName: "Marco Aurelio Silva",
    candidateCareer: "Ingeniería de Sistemas - IA",
    candidateAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    challengeTitle: "Pipeline de Clasificación Automática de Anomalías",
    submissionDate: "Hace 1 hora",
    docTitle: "Entrenamiento de Redes Convolucionales para Detección de Defectos.md",
    docContent: `# PIPELINE DE CLASIFICACIÓN DE DEFECTOS EN LÍNEAS DE MONTAJE
Por: Marco Aurelio Silva

### 1. Extracción e Ingesta de Datos
Procesamiento de imágenes de alta resolución (2048x2048px) capturadas por sensores industriales de cámara lineal.
- Reescalado a 512x512px con normalización de brillo y contraste adaptativo CLAHE.
- Data Augmentation para balancear clases raras (defecto tipo fisura representaba únicamente el 2.4% del volumen original).

### 2. Modelo de Aprendizaje Profundo (CNN)
Se selecciona una arquitectura ResNet-50 preentrenada en ImageNet con fina sintonización en las capas densas terminales.
- Función de pérdida focal para mitigar la disparidad fuerte de clases.
- Optimizador Adam con decaimiento coseno de tasa de aprendizaje.

### 3. Resultados Logrados
- F1-Score general logrado en test: 0.945
- Tiempo de inferencia por frame en GPU NVIDIA T4: 12ms.`,
    rubricScore: {
      technical: 10,
      analytic: 9,
      communication: 7
    },
    checkedSkills: ["Computer Vision", "Convolutional Networks", "Fast API", "Docker"],
    status: "pending"
  },
  {
    id: "sub-3",
    candidateId: "cand-10",
    candidateName: "Lucía Méndez",
    candidateCareer: "Agro-Industrial Solutions",
    candidateAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    challengeTitle: "Diseño Sostenible de Invernadero Hidropónico Automatizado",
    submissionDate: "Ayer",
    docTitle: "Plan Operativo Hidropónico de Precisión IoT.pdf",
    docContent: `SISTEMA INTELIGENTE DE CONTROL NUTRICIONAL IoT
Estudio y optimización para la producción académica en Tarapoto, CERTIAN.

1. CONTROLADOR CENTRALIZADO (ESP32)
Monitoreo automático de pH y Conductividad Eléctrica (CE) del agua mediante sondas calibradas redundantes.
- Compensación de temperatura automática (ATC) por algoritmo polinomial.
- Solución dosificadora activada por relés temporizados proporcionales.

2. AHORRO EN RECURSOS HIDRICOS
Gracias al sistema de recirculación cerrado y la monitorización de transpiración vegetal estimada vía radiación solar incidente, se reduce la huella hídrica general del invernadero en un 78.2% comparado con la agricultura de suelo tradicional de la región amazónica.`,
    rubricScore: {
      technical: 8,
      analytic: 9,
      communication: 8
    },
    checkedSkills: ["IoT ESP32", "Automatización de Sensor", "Agro-Tech Sostenible"],
    status: "pending"
  }
];

export const MENTORS: Mentor[] = [
  {
    id: "men-1",
    name: "Dr. Carlos Mendoza",
    role: "Director de I+D AI & Data Science",
    company: "Global Tech Solutions",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    topics: ["Inteligencia Artificial", "Big Data", "Blockchain Corporativo"],
    availability: "Martes y Jueves, 4 PM - 6 PM"
  },
  {
    id: "men-2",
    name: "Ing. Elena Rostova",
    role: "Lead Solutions Architect Cloud",
    company: "Amazon Web Services (AWS)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    topics: ["Arquitectura Cloud Native", "Kubernetes", "Ciberseguridad"],
    availability: "Lunes y Miércoles, 6 PM - 8 PM"
  },
  {
    id: "men-3",
    name: "Dr. Juan Alarcón",
    role: "Decano de Ingeniería y Tecnología",
    company: "CERTIAN Institucional",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    topics: ["Liderazgo Transformacional", "Gestión Académica", "Ética Tecnológica"],
    availability: "Viernes, 2 PM - 5 PM"
  }
];

export const IMMERSION_ITEMS: ImmersionBoardItem[] = [
  {
    id: "imm-1",
    company: "Interbank",
    title: "Pasantía Express de Ciberseguridad",
    badgeText: "Ciberseguridad",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    duration: "4 semanas (Híbrido)",
    description: "Evaluación activa de políticas Zero Trust e implementación de logs agregados en entornos híbridos financieros.",
    vacantSpots: 3
  },
  {
    id: "imm-2",
    company: "Falabella Tech",
    title: "Inmersión Frontend Alta Perfomance",
    badgeText: "Web Performance",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    duration: "6 semanas (Remoto)",
    description: "Rediseño de vistas de pago móvil enfocando una reducción del 40% en tiempo de interactividad interactiva (TTI).",
    vacantSpots: 2
  },
  {
    id: "imm-3",
    company: "Global Tech Solutions",
    title: "Beca de Innovación IoT en el Agro",
    badgeText: "Agro-Tech",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    duration: "8 semanas (Presencial Tarapoto)",
    description: "Despliegue de nodos LoRaWAN para el monitoreo automatizado de cultivos sostenibles de café de especialidad.",
    vacantSpots: 5
  }
];

export const DEFAULT_COMPANY_PROFILE: CompanyBrandProfile = {
  name: "Global Tech Solutions",
  logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=80&h=80&q=80",
  coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  partnerStatus: "Socio Estratégico CERTIAN",
  lastUpdated: "Hace 2 horas",
  history: "Global Tech Solutions es un líder internacional en servicios de consultoría estratégica, desarrollo de software avanzado e innovación digital disruptiva. Con más de 12 años en el mercado de América Latina, apostamos firmemente por el desarrollo del talento joven nacional mediante sólidas alianzas colaborativas con instituciones insignia como CERTIAN.",
  values: [
    {
      title: "Innovación Disruptiva",
      description: "Impulsamos activamente el desarrollo del mañana fomentando la experimentación rápida y tecnologías como AI Ops y Blockchain.",
      icon: "Zap"
    },
    {
      title: "Integridad Total",
      description: "Construimos sobre bases de confianza absoluta, código transparente, ética intachable y responsabilidad social compartida.",
      icon: "Shield"
    },
    {
      title: "Excelencia Sin Compromisos",
      description: "Buscamos exceder las expectativas de la industria manufacturando software limpio, seguro, probado y altamente eficiente.",
      icon: "Award"
    }
  ],
  benefits: [
    "Mentoría personalizada activa impartida directamente por nuestros Directores Técnicos senior.",
    "Línea de carrera acelerada al graduarse con validación preferencial de sellos digitales.",
    "Ambiente altamente tecnológico, retador, inclusivo y con horarios adaptables flexibles.",
    "Acceso subvencionado permanente a certificaciones cloud globales avanzadas (AWS, GCP y Azure)."
  ],
  communityImpact: "Mantenemos un compromiso activo y continuo con el desarrollo sostenible a través de nuestro programa regional 'Código que Transforma'. Subvencionamos laboratorios de cómputo en áreas descentralizadas de Tarapoto, Juliaca y Lima, y patrocinamos becas de excelencia para incentivar la paridad de género y de oportunidades en carreras STEM."
};
