import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Server,
  Database,
  Smartphone,
  Sparkles,
  Cloud,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
} from "lucide-react";

export const profile = {
  name: "Reza Peyman Amiri",
  role: "Full-Stack Software Developer",
  subrole: "Computer Science Student",
  location: "Available for remote & on-site opportunities",
  tagline:
    "Building modern, scalable, and user-focused software — from interface to infrastructure.",
  summary:
    "I'm Reza Peyman Amiri, a final-year Computer Science student and Full-Stack Software Developer with hands-on experience building modern, scalable, and user-focused software applications. I work across the full development lifecycle — from designing responsive user interfaces and building backend services to developing mobile applications for Android and iOS. I enjoy solving complex problems, learning new technologies, and turning ideas into reliable, production-ready products.",
  focusStatement:
    "My primary focus is on modern web development, backend engineering, mobile development, cloud technologies, and AI-powered applications.",
  email: "gholam2015m@gmail.com",
};

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Reza-amiri10",
    icon: Github,
    handle: "@Reza-amiri10",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/reza-peyman-amiri-4362b8335/",
    icon: Linkedin,
    handle: "Reza Peyman Amiri",
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: Twitter,
    handle: "@reza_amiri",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/?hl=en",
    icon: Instagram,
    handle: "@reza.amiri",
  },
  {
    label: "Email",
    href: "mailto:gholam2015m@gmail.com",
    icon: Mail,
    handle: "gholam2015m@gmail.com",
  },
] satisfies {
  label: string;
  href: string;
  icon: LucideIcon;
  handle: string;
}[];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Approach", href: "#approach" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export type SkillCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    icon: Code2,
    title: "Front-End Development",
    description:
      "I build modern, responsive, and accessible interfaces with a strong focus on performance and user experience.",
    items: [
      "React, Next.js, Vue",
      "TypeScript, JavaScript, HTML, CSS",
      "Responsive design & component-based architecture",
      "Tailwind CSS & modern CSS",
      "AI-assisted development with careful code review",
    ],
  },
  {
    icon: Server,
    title: "Back-End Development",
    description:
      "I develop secure and scalable backend systems that power modern applications.",
    items: [
      "RESTful APIs and GraphQL",
      "Node.js, Python, Go",
      "Serverless, modular & microservice architectures",
      "Secure authentication and authorization",
      "Third-party API & platform integration",
    ],
  },
  {
    icon: Database,
    title: "Databases & Data Storage",
    description:
      "I work with both relational and non-relational databases depending on application requirements.",
    items: [
      "PostgreSQL, MySQL",
      "MongoDB, Redis",
      "Vector databases: Pinecone, pgvector",
      "Database design & data modeling",
      "Efficient queries & indexing",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "I develop cross-platform mobile applications with a focus on native-like performance and user experience.",
    items: [
      "Android applications",
      "iOS applications",
      "React Native",
      "API and backend integration",
      "Responsive mobile interfaces",
    ],
  },
  {
    icon: Sparkles,
    title: "AI & LLM Integration",
    description:
      "I'm interested in building practical applications powered by modern AI technologies.",
    items: [
      "OpenAI, Anthropic & open-source models",
      "LLM integration into real-world apps",
      "Prompt engineering & structured AI workflows",
      "RAG & private knowledge retrieval",
      "Multi-step AI agent workflows",
    ],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    description:
      "I use modern development and deployment practices to build reliable software and streamline delivery.",
    items: [
      "Docker containerization",
      "AWS, Google Cloud, Vercel",
      "CI/CD with GitHub Actions",
      "Production deployment & monitoring",
      "Git-based version control",
    ],
  },
];

export const engineeringPractices = [
  "Clean and maintainable code",
  "Component-based architecture",
  "Git-based development workflows",
  "Code reviews and debugging",
  "Authentication and data security",
  "Secure API development",
  "Performance optimization",
  "Testing and error handling",
  "Responsible use of AI-assisted development tools",
  "Awareness of AI-specific security risks, including prompt injection",
];

export type ApproachItem = {
  title: string;
  description: string;
};

export const approachItems: ApproachItem[] = [
  {
    title: "Build with Purpose",
    description:
      "I believe good software is more than code. It should solve a real problem, provide an excellent user experience, and remain maintainable as it grows.",
  },
  {
    title: "Learn Continuously",
    description:
      "Technology evolves quickly, so I continuously explore new frameworks, tools, architectures, and AI technologies to improve the way I build software.",
  },
  {
    title: "Think Full-Stack",
    description:
      "I enjoy understanding the entire system — from the interface a user interacts with to the APIs, databases, infrastructure, and services running behind it.",
  },
  {
    title: "Use AI, But Understand the Code",
    description:
      "AI is a powerful development tool, but I believe developers should understand, review, test, and take responsibility for the code they ship.",
  },
];

export const currentFocus = [
  "Building modern full-stack web applications",
  "Developing mobile applications with React Native",
  "Exploring AI and LLM-powered applications",
  "Improving cloud and DevOps skills",
  "Designing scalable backend architectures",
  "Building products that combine software engineering with AI",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AI-Powered Knowledge Assistant",
    description:
      "A retrieval-augmented generation (RAG) app that lets teams query private documents in natural language, with source citations and a multi-step agent workflow for follow-up tasks.",
    tags: ["Next.js", "TypeScript", "OpenAI", "pgvector", "Node.js"],
    href: "#",
    repo: "#",
    featured: true,
  },
  {
    title: "Cross-Platform Field Ops App",
    description:
      "A React Native app for field teams to log tasks offline and sync with a Go backend, with role-based auth and real-time status updates.",
    tags: ["React Native", "Go", "PostgreSQL", "REST API"],
    href: "#",
    repo: "#",
  },
  {
    title: "Serverless SaaS Starter",
    description:
      "A production-ready boilerplate combining Next.js, serverless functions, and CI/CD pipelines for shipping SaaS products fast without sacrificing security.",
    tags: ["Next.js", "AWS", "Docker", "GitHub Actions"],
    href: "#",
    repo: "#",
  },
  {
    title: "Realtime Collaboration Dashboard",
    description:
      "A component-driven analytics dashboard with live data sync via WebSockets, built for performance on large, frequently updating datasets.",
    tags: ["React", "GraphQL", "Redis", "Tailwind CSS"],
    href: "#",
    repo: "#",
  },
];
