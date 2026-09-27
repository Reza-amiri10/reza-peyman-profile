import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StatusBar } from "@/components/StatusBar";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getAllArticlesMeta } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Reza Peyman Amiri — Full-Stack Software Developer",
    template: "%s",
  },
  description:
    "Reza Peyman Amiri is a Full-Stack Software Developer and final-year Computer Science student building modern, scalable web, mobile, and AI-powered applications.",
  applicationName: "Reza Peyman Amiri — Portfolio",
  keywords: [
    // Name variations
    "Reza Peyman Amiri",
    "Reza Amiri",
    "Reza Peyman",
    "Reza-amiri10",
    "Peyman amiri",
    "رضا پیمان امیری",

    // Roles / titles
    "Full-Stack Developer",
    "Full-Stack Software Developer",
    "Software Engineer",
    "Software Developer",
    "Web Developer",
    "Mobile Developer",
    "Backend Developer",
    "Frontend Developer",
    "AI Developer",
    "AI Engineer",
    "Computer Science Student",
    "Computer Science Engineering Student",
    "Software Developer Portfolio",

    // Frontend
    "React Developer",
    "Next.js Developer",
    "React",
    "Next.js",
    "Vue",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Responsive Web Design",

    // Backend
    "Node.js",
    "NestJS",
    "Express.js",
    "Python",
    "Java",
    "Go",
    "REST API",
    "GraphQL",
    "Microservices",
    "Serverless Architecture",
    "Backend Development",

    // Mobile
    "React Native",
    "Flutter",
    "Dart",
    "Android Developer",
    "iOS Developer",
    "Cross-Platform App Development",
    "Mobile App Development",

    // Databases
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "Pinecone",
    "pgvector",
    "Vector Databases",
    "Database Design",

    // AI / LLM
    "AI-Powered Applications",
    "LLM Integration",
    "OpenAI",
    "Anthropic",
    "RAG",
    "Retrieval-Augmented Generation",
    "Prompt Engineering",
    "AI Agents",
    "Machine Learning",

    // DevOps / Cloud
    "Docker",
    "AWS",
    "Google Cloud",
    "Vercel",
    "CI/CD",
    "GitHub Actions",
    "Cloud Computing",
    "DevOps",

    // General
    "Full-Stack Software Development",
    "Web Application Development",
    "Scalable Software",
    "Software Development Portfolio",
    "Turkey Software Developer",
  ],
  authors: [{ name: "Reza Peyman Amiri", url: SITE_URL }],
  creator: "Reza Peyman Amiri",
  publisher: "Reza Peyman Amiri",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Once you verify ownership in Google Search Console, paste the
  // verification code here (Search Console -> Settings -> Ownership
  // verification -> HTML tag -> copy just the content="..." value):
  verification: { google: "CB5jL8jszLlnRblJp--CWZ31rJtPNqoGJ-7352QIeTE" },
  openGraph: {
    title: "Reza Peyman Amiri — Full-Stack Software Developer",
    description:
      "Building modern, scalable, and user-focused software — from interface to infrastructure.",
    type: "website",
    url: SITE_URL,
    siteName: "Reza Peyman Amiri",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reza Peyman Amiri — Full-Stack Software Developer",
    description:
      "Building modern, scalable, and user-focused software — from interface to infrastructure.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#090a0c" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articles = getAllArticlesMeta().map(({ slug, title }) => ({ slug, title }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body id="top" className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar articles={articles} />
          {children}
          <Footer />
          <StatusBar />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
