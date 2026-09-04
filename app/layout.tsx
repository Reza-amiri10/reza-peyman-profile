import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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
    "Reza Peyman Amiri",
    "Reza Amiri",
    "Full-Stack Developer",
    "Software Engineer",
    "Computer Science Student",
    "Software Developer Portfolio",
    "React Developer",
    "Next.js Developer",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "AI Developer",
    "Backend Developer",
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
  // verification: { google: "your-verification-code" },
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
      </body>
    </html>
  );
}
