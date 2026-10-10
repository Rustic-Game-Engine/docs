import { ArrowRight, Cloud, Gamepad2, Globe, Layers } from "lucide-react";
import Link from "next/link";

const repositories = [
  { slug: "engine", title: "Engine", language: "RUST · WGSL · POWERSHELL", description: "Build and modify the engine itself. Explore architecture, prerequisites, Rust crates, build commands, and installer scripts.", icon: Layers },
  { slug: "docs", title: "Docs", language: "TYPESCRIPT · NEXT.JS", description: "Develop your own documentation site. Explore source files, prerequisites, npm scripts, content authoring, and deployment.", icon: Globe },
  { slug: "examples", title: "Examples", language: "REPOSITORY FOUNDATION", description: "Understand the sample repository's current contents and learn how to create and contribute your own game example.", icon: Gamepad2 },
  { slug: "hosting-sdk", title: "Hosting SDK", language: "REPOSITORY FOUNDATION", description: "Explore the intended SDK scope, current source availability, and development starting points for your own implementation.", icon: Cloud },
];

export function RepositoryCards() {
  return <nav className="card-grid project-card-grid repository-cards" aria-label="Open-Sourced Docs repositories">
    {repositories.map(({ slug, title, language, description, icon: Icon }) => <Link className="guide-card" href={`/docs/open-source/${slug}`} key={slug}>
      <div className="card-icon"><Icon size={23} /></div><p className="eyebrow">OPEN-SOURCED DOCS / {title.toUpperCase()}</p><h2>{title}</h2><p>{description}</p><span>{language}<ArrowRight size={17} /></span>
    </Link>)}
  </nav>;
}
