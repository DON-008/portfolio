// Education and Profile aren't in tech doc §6's three named interfaces,
// but the folder-structure rule ("data.ts — ALL site content") and the
// no-copy-in-components rule require hero/contact/footer/education strings
// to live here too, not in component files. Flagged for Don's review.
// professionalWork is new (from data-seed.ts) and has no dedicated page
// spec in the tech doc — placed as its own section between Experience and
// Education; flag if a different placement is wanted.

export interface Profile {
  name: string;
  role: string;
  eyebrow: string;
  pitch: string;
  totalExperience: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvPath: string;
  contactInvitation: string;
  footerTagline: string;
}

export const profile: Profile = {
  name: "Don Davis",
  role: "Frontend Engineer",
  eyebrow: "ANGULAR · TYPESCRIPT · RXJS · NGRX",
  pitch:
    "Frontend Engineer with 5+ years in software development —  focused on Angular (v10–v22), TypeScript, RxJS and NgRx — building responsive, high-performance web applications from reactive state architecture and JWT auth flows to Core Web Vitals optimization.",
  totalExperience: "5+ years",
  location: "Kochi, Kerala, India",
  email: "dondavis.davis55@gmail.com",
  // Phone number is intentionally OMITTED from the site (CV-only, per Don).
  // Never render a phone number anywhere in the UI.
  github: "https://github.com/DON-008",
  linkedin: "https://www.linkedin.com/in/don-davis-188a49123/",
  cvPath: "/cv/Don-Davis-CV.pdf",
  // DRAFT — not part of data-seed.ts (which has no Contact/Footer copy yet).
  // Don to review and correct wording whenever Step 9 covers Contact/Footer.
  contactInvitation:
    "Building something that needs a frontend engineer who thinks in systems? Let's talk.",
  footerTagline: "Built with Next.js — projects built with Angular",
};

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  status: "live" | "in-development";
  liveUrl?: string;
  repoUrl: string;
  stack: string[];
  highlight: string;
  problem: string;
  architecture: string[];
  decisions: { title: string; body: string }[];
  featured: boolean;
  // TODO: no real screenshots supplied yet (tech doc §6/§11 flag: never
  // invent these). Path to /public/images/<slug>.png once Don provides one.
  screenshot?: string;
}

export const projects: Project[] = [
  {
    slug: "esmp",
    name: "ESMP — Enterprise Service Management Portal",
    tagline:
      "Fintech-style case & ticket management platform with four user roles, SLA monitoring and audit logging.",
    status: "live",
    liveUrl: "https://esmp-gnp8.onrender.com/",
    repoUrl: "https://github.com/DON-008/esmp",
    stack: [
      "Angular 22",
      "Signals",
      "NgRx (Store · Effects · Entity)",
      "NestJS",
      "TypeORM",
      "JWT + HTTP-only refresh",
      "Cypress",
      "GitHub Actions",
    ],
    highlight:
      "Optimistic UI with per-case rollback, silent JWT refresh via interceptor chain, zoneless change detection.",
    problem:
      "Modeled on claims-processing and citizen-services platforms: four roles (Citizen, Agent, Supervisor, Admin) sharing case data across dozens of screens, with SLA deadlines, auditability and role-based access — the kind of state-heavy domain where ad-hoc state management falls apart.",
    architecture: [
      "Angular 22 standalone components with zoneless change detection; template layer is 100% Signals",
      "Global cross-route state in NgRx (Store, Effects, Entity) with memoized selectors; component-local state in Signals",
      "REST integration against a NestJS modular monolith with TypeORM (SQLite)",
      "JWT auth with HTTP-only refresh cookies; auth / refresh / error interceptor chain; AuthGuard + RoleGuard with NestJS RolesGuard as the real enforcement layer",
      "Quality pipeline: Jasmine/Karma + Jest unit tests (80% coverage target on services and NgRx logic), Cypress E2E, ESLint, GitHub Actions CI/CD; deployed on Render",
    ],
    decisions: [
      {
        title: "Signals vs NgRx split rule",
        body: "Signals own state that lives and dies with one component; NgRx owns state shared across routes (cases, session). Selectors arrive via store.selectSignal(), so the template layer stays uniform.",
      },
      {
        title: "Optimistic UI with concurrent-safe rollback",
        body: "The reducer applies adapter.updateOne on the request action and stashes the previous entity in an optimisticBackup map keyed by caseId — so multiple in-flight updates can each roll back independently on failure.",
      },
      {
        title: "concatMap for status transitions",
        body: "Status updates must not race or cancel each other, so the effect uses concatMap (strict ordering) instead of switchMap, which is reserved for cancellable flows like search.",
      },
      {
        title: "provideAppInitializer for session restore",
        body: "Router activation is blocked until silent session restore completes, preventing authGuard from firing against an empty store on page reload.",
      },
      {
        title: "Defense in depth",
        body: "Route guards are UX, not security — the NestJS RolesGuard rejects unauthorized API calls regardless of what the client does.",
      },
    ],
    featured: true,
  },
  {
    slug: "pulseticker",
    name: "PulseTicker",
    tagline:
      "Real-time cryptocurrency market dashboard streaming Binance WebSocket data — no backend, no API key.",
    status: "live",
    liveUrl: "https://pulseticker-flame.vercel.app",
    repoUrl: "https://github.com/DON-008/pulseticker",
    stack: ["Angular 22", "Signals", "RxJS", "WebSocket", "Binance streams"],
    highlight:
      "WebSocket backpressure handled with bufferTime/auditTime between socket messages and signal writes to prevent rendering thrash.",
    problem:
      "High-frequency market data (multiplexed Binance streams) pushed straight into a UI will thrash the renderer; the challenge is a smooth real-time dashboard with strictly client-side architecture.",
    architecture: [
      "Direct connection to Binance public combined WebSocket streams — zero backend, zero API keys",
      "Typed stream models with a resilient socket layer (HTTP upgrade, keepalive, silent-failure detection, reconnection)",
      "bufferTime/auditTime backpressure stage between socket messages and signal writes",
      "Signal-driven rendering with zoneless change detection",
    ],
    decisions: [
      {
        title: "Backpressure before rendering",
        body: "Raw tick streams are batched/audited before touching Signals, decoupling network frequency from render frequency and keeping frame times stable.",
      },
      {
        title: "No-backend by design",
        body: "Consuming public streams directly keeps the project deployable anywhere as a static site and makes the reactive architecture the entire story.",
      },
    ],
    featured: true,
  },
];

export interface WorkProject {
  name: string;
  description: string;
  stack: string[];
  url?: string;
}

export const professionalWork: WorkProject[] = [
  {
    name: "HRMS — Human Resource Management System",
    description:
      "Angular HRMS covering employee management, payroll, attendance, shift and leave management, and recruitment.",
    stack: ["Angular", "Bootstrap", "Tailwind CSS"],
    url: "https://mygian.mygoal.biz",
  },
  {
    name: "POS — Point of Sale & BI Suite",
    description:
      "End-to-end sales platform (stock, invoicing, payments, reporting, analytics dashboard) plus an enquiry-driven BI web app with multi-dimensional reporting and Highcharts dashboards.",
    stack: ["Angular", "REST APIs", "Highcharts"],
    // No url: the demo site is no longer live (confirmed by Don).
  },
  {
    name: "Universal AI Chatbot Suite",
    description:
      "Plug-and-play chatbot UI for third-party website integration with an admin dashboard for bot training and analytics; built with Angular Material at ThinkPalm Technologies.",
    stack: ["Angular", "Angular Material"],
    // No url: only a company homepage exists, which adds no value as a demo link.
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    company: "The Elms",
    role: "Digital Analyst",
    period: "Feb 2024 – Jan 2026",
    location: "Retford, United Kingdom",
    points: [
      "Analysed website performance and user behaviour, updating site content and structure to align with evolving business goals.",
      "Implemented on-page SEO improvements — keyword optimisation, metadata and content updates — increasing search visibility and organic traffic.",
      "Produced data-driven business improvement plans and reported prioritised recommendations to stakeholders, verifying impact after release.",
    ],
  },
  {
    company: "ThinkPalm Technologies Pvt. Ltd",
    role: "Software Engineer",
    period: "Feb 2021 – Sep 2022",
    location: "Kerala, India",
    points: [
      "Led design and development of high-performance Angular applications, enforcing SOLID principles, component reusability and best practices.",
      "Architected reusable Angular components and shared modules, accelerating delivery across multiple projects.",
      "Spearheaded code reviews and Agile ceremonies; acted as technical liaison between product managers and engineering; optimized AWS auto-scaling to improve availability.",
    ],
  },
  {
    company: "CIED Group Pvt. Ltd",
    role: "Angular Developer",
    period: "Aug 2020 – Dec 2020",
    location: "Kerala, India",
    points: [
      "Led frontend development of a Human Resource Management System in Angular 10, applying core design patterns to streamline staff workflows.",
      "Built clean, responsive, mobile-first interfaces with Bootstrap and Tailwind CSS, driving a 40% improvement in user experience, delivered on schedule in Agile/Scrum.",
    ],
  },
  {
    company: "Travidux Technologies Pvt. Ltd",
    role: "Software Developer",
    period: "Nov 2018 – Aug 2020",
    location: "Kerala, India",
    points: [
      "Engineered data flows for a Point of Sale application, designing and integrating backend functionality through REST APIs, increasing client sales by 15%.",
      "Built interactive real-time dashboards and reports with Highcharts; refined UI/UX for data accuracy and visual clarity.",
    ],
  },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Angular",
    skills: [
      "Angular v10–v22",
      "Standalone Components",
      "Signals",
      "Zoneless CD",
      "Angular Material",
      "Angular Universal (SSR)",
      "Reactive Forms",
    ],
  },
  {
    label: "State & Reactivity",
    skills: ["NgRx Store", "NgRx Effects", "NgRx Entity", "Selectors", "RxJS", "Observables", "Angular Signals"],
  },
  {
    label: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SCSS/SASS", "SQL", "Python"],
  },
  {
    label: "API & Backend",
    skills: ["REST APIs", "HttpClient", "HTTP Interceptors", "JWT + Silent Refresh", "NestJS", "Express.js"],
  },
  {
    label: "UI & Performance",
    skills: [
      "Mobile-first Responsive",
      "Tailwind CSS",
      "Bootstrap",
      "Accessibility",
      "Figma-to-code",
      "Lazy Loading",
      "OnPush CD",
      "Code Splitting",
      "Core Web Vitals",
    ],
  },
  {
    label: "Testing & Quality",
    skills: ["Jasmine", "Karma", "Jest", "Cypress", "ESLint", "SOLID", "Code Reviews"],
  },
  {
    label: "DevOps & Tools",
    skills: ["Git/GitHub", "GitHub Actions CI/CD", "Azure DevOps", "Docker", "AWS", "Webpack", "JIRA", "Agile/Scrum"],
  },
];

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  note?: string;
}

export const education: Education[] = [
  {
    degree: "M.Sc. Computing",
    institution: "De Montfort University",
    location: "Leicester, UK",
    year: "2024",
    note: "Distinction",
  },
  {
    degree: "B.Tech in Computer Science",
    institution: "Mahatma Gandhi University",
    location: "Kottayam, India",
    year: "2018",
  },
];

export const certifications: string[] = [
  "IBM Full Stack Software Developer Professional Certificate",
  "Angular (Basic) — HackerRank",
  "Introduction to Containers with Docker, Kubernetes & OpenShift — IBM",
  "Python for Data Science, AI & Development — IBM / Coursera",
];
