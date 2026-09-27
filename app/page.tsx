import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Approach } from "@/components/Approach";
import { Projects } from "@/components/Projects";
import { Feedback } from "@/components/Feedback";
import { ArticlesTeaser } from "@/components/ArticlesTeaser";
import { Contact } from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";
import { profile, socialLinks } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    sameAs: socialLinks.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    knowsAbout: [
      "Full-Stack Development",
      "React",
      "Next.js",
      "Node.js",
      "React Native",
      "Cloud Computing",
      "Artificial Intelligence",
    ],
  };

  return (
    <>
      <JsonLd data={personJsonLd} />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Approach />
        <Projects />
        <Feedback />
        <ArticlesTeaser />
        <Contact />
      </main>
    </>
  );
}
