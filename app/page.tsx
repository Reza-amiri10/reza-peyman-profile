import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Approach } from "@/components/Approach";
import { Projects } from "@/components/Projects";
import { ArticlesTeaser } from "@/components/ArticlesTeaser";
import { Contact } from "@/components/Contact";
import { JsonLd } from "@/components/JsonLd";
import { profile } from "@/lib/data";

const SITE_URL = "https://peymanamiri.com";

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.role,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    sameAs: [
      "https://github.com/Reza-amiri10",
      "https://www.linkedin.com/in/reza-peyman-amiri-4362b8335/",
    ],
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
      <main>
        <Hero />
        <About />
        <Skills />
        <Approach />
        <Projects />
        <ArticlesTeaser />
        <Contact />
      </main>
    </>
  );
}
