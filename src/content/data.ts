// Education and SiteProfile aren't in tech doc §6's three named interfaces,
// but the folder-structure rule ("data.ts — ALL site content") and the
// no-copy-in-components rule require hero/contact/footer/education strings
// to live here too, not in component files. Flagged for Don's review.

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
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
}

export interface SiteProfile {
  name: string;
  role: string;
  yearsExperience: number;
  eyebrow: string;
  pitch: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  cvUrl: string;
  contactInvitation: string;
  footerTagline: string;
}

export const siteProfile: SiteProfile = {
  name: "Don Davis",
  role: "Angular Developer",
  yearsExperience: 4,
  eyebrow: "ANGULAR · TYPESCRIPT · NGRX",
  // DRAFT, synthesized only from facts already stated in the tech doc
  // (Angular/TS/NgRx, 4 yrs experience, enterprise-grade systems). Don to
  // review and correct wording at the Step 3 checkpoint.
  pitch:
    "Angular developer with 4 years building enterprise-grade frontend systems — NgRx, Signals, and real-time data at scale.",
  email: "TODO: Don's email address (mailto: link target)",
  linkedinUrl: "TODO: Don's LinkedIn profile URL",
  // Derived from the ESMP/PulseTicker repo owner (github.com/DON-008) —
  // confirm this is the right profile URL for the navbar/contact icon.
  githubUrl: "https://github.com/DON-008",
  cvUrl: "/cv/Don-Davis-CV.pdf",
  // DRAFT, Don to review and correct wording at the Step 3 checkpoint.
  contactInvitation:
    "Building something that needs a frontend engineer who thinks in systems? Let's talk.",
  footerTagline: "Built with Next.js — projects built with Angular",
};

export const education: Education = {
  degree: "M.Sc. Computing (Distinction)",
  institution: "De Montfort University",
  location: "UK",
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: ["Angular", "TypeScript", "Signals", "RxJS"],
  },
  {
    label: "State & Reactivity",
    skills: ["NgRx", "Signals", "RxJS"],
  },
  {
    label: "Backend",
    skills: ["NestJS", "TypeORM", "SQLite", "JWT"],
  },
  {
    label: "Testing",
    skills: ["TODO: Don to confirm testing tools/frameworks used"],
  },
  {
    label: "Tooling",
    skills: ["TODO: Don to confirm tooling (Git, CI/CD, etc.)"],
  },
];

export const experience: Experience[] = [
  {
    company: "The Elms",
    role: "TODO: confirm job title",
    period: "TODO: confirm employment period",
    location: "United Kingdom",
    points: [
      "TODO: Don to supply 2-3 impact bullets at the Step 3 checkpoint (do not invent metrics)",
    ],
  },
  {
    company: "ThinkPalm Technologies",
    role: "TODO: confirm job title",
    period: "TODO: confirm employment period",
    location: "TODO: confirm location",
    points: [
      "TODO: Don to supply 2-3 impact bullets at the Step 3 checkpoint (do not invent metrics)",
    ],
  },
  {
    company: "CIED Group",
    role: "TODO: confirm job title",
    period: "TODO: confirm employment period",
    location: "TODO: confirm location",
    points: [
      "TODO: Don to supply 2-3 impact bullets at the Step 3 checkpoint (do not invent metrics)",
    ],
  },
  {
    company: "Travidux Technologies",
    role: "TODO: confirm job title",
    period: "TODO: confirm employment period",
    location: "TODO: confirm location",
    points: [
      "TODO: Don to supply 2-3 impact bullets at the Step 3 checkpoint (do not invent metrics)",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "esmp",
    name: "ESMP",
    // DRAFT — "case-management" inferred from the caseId decision below;
    // the acronym itself is never expanded since that's not stated anywhere.
    tagline:
      "Enterprise case-management platform built on a fully reactive Angular + NgRx + Signals + NestJS stack.",
    status: "live",
    liveUrl: "https://esmp-gnp8.onrender.com/",
    repoUrl: "https://github.com/DON-008/esmp",
    stack: [
      "Angular 22",
      "NgRx",
      "Signals",
      "NestJS",
      "TypeORM",
      "SQLite",
      "JWT (HTTP-only refresh cookies)",
    ],
    highlight:
      "Template → Store → Effect → API → back — a full reactive case-management dataflow.",
    problem:
      "TODO: Don to write a 2-3 sentence problem statement — what real-world problem does ESMP solve, and for whom? (What does the ESMP acronym stand for?)",
    architecture: [
      "Reactive dataflow: template → NgRx store → effect → NestJS API → back, visualized in the hero constellation.",
      "TODO: Don to describe the Signals-vs-NgRx split — which state lives where, and why.",
      "JWT auth via HTTP-only refresh cookies with a refresh interceptor.",
      "Deployed on Render free tier — demo may cold-start (~30s) on first load.",
    ],
    decisions: [
      {
        title: "Signals-vs-NgRx split rule",
        body: "TODO: Don to explain the rule for when state lives in Signals vs NgRx.",
      },
      {
        title: "concatMap for status updates",
        body: "TODO: Don to explain why concatMap (vs switchMap/mergeMap) was chosen for status updates.",
      },
      {
        title: "optimisticBackup keyed by caseId",
        body: "TODO: Don to explain the optimistic-update/rollback strategy keyed by caseId.",
      },
      {
        title: "provideAppInitializer session restore",
        body: "TODO: Don to explain the app-initializer session-restore flow.",
      },
      {
        title: "JWT refresh interceptor",
        body: "TODO: Don to explain the HTTP interceptor's refresh-token flow.",
      },
    ],
    featured: true,
  },
  {
    slug: "pulseticker",
    name: "PulseTicker",
    tagline:
      "Real-time crypto market ticker streamed directly from Binance — no backend.",
    status: "in-development",
    repoUrl: "TODO: PulseTicker repo URL to be added",
    stack: ["Angular 22", "Signals", "RxJS", "Binance WebSocket streams"],
    highlight: "Live market data via public WebSocket streams, zero backend.",
    problem:
      "A real-time market-data dashboard that stays live and responsive under a high-frequency WebSocket feed, with no backend to buffer or throttle the stream.",
    architecture: [
      "Direct client connection to Binance public WebSocket streams — no backend proxy.",
      "Client-side backpressure handling (see decisions below).",
      "TODO: Don to expand with component/state layout bullets.",
    ],
    decisions: [
      {
        title: "WebSocket backpressure via bufferTime/auditTime",
        body: "TODO: Don to explain how bufferTime/auditTime tame the high-frequency Binance stream.",
      },
      {
        title: "No-backend design",
        body: "TODO: Don to explain the tradeoffs of a fully client-side, no-backend architecture.",
      },
    ],
    featured: false,
  },
];
