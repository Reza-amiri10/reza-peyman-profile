import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reza Peyman Amiri — Full-Stack Software Developer",
  description:
    "Reza Peyman Amiri is a Full-Stack Software Developer and final-year Computer Science student building modern, scalable web, mobile, and AI-powered applications.",
  keywords: [
    "Reza Peyman Amiri",
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "React Native",
    "AI Developer",
  ],
  authors: [{ name: "Reza Peyman Amiri" }],
  openGraph: {
    title: "Reza Peyman Amiri — Full-Stack Software Developer",
    description:
      "Building modern, scalable, and user-focused software — from interface to infrastructure.",
    type: "website",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
