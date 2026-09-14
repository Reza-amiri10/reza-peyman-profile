import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const SITE_URL = "https://peymanamiri.com";

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
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#080b12" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
