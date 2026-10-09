"use client";

import { ChevronDown, Github, Menu, Moon, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { docSections, routeFor } from "@/lib/docs-catalog";

export function SiteFrame({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isIndex = pathname === "/" || pathname === "/docs" || pathname === "/docs/search";
  const project = pathname.startsWith("/docs/website") ? "Website" : "Engine";
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (pathname === "/docs/search") document.querySelector<HTMLInputElement>(".search-field input")?.focus();
        else router.push("/docs/search");
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pathname, router]);

  return <div className={dark ? "site dark" : "site"}>
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Rustic docs home"><span className="brand-mark"><span /></span><span>RUSTIC</span><span className="brand-division">DOCS</span></Link>
      <Link className="search-trigger" href="/docs/search"><Search size={17} /><span>Search documentation</span></Link>
      <nav className="top-actions" aria-label="Site links"><span className="version-button">v0.1 <ChevronDown size={14} /></span><a href="https://github.com/Rustic-Game-Engine/engine" aria-label="Rustic Engine on GitHub"><Github size={19} /></a><button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="docs-sidebar"><Menu /></button></nav>
    </header>
    <div className="docs-shell article-shell">
      <aside id="docs-sidebar" className={menuOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-mobile-head"><span>Documentation</span><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav className="sidebar-content" aria-label="Documentation">
          <Link className="home-link" href="/" onClick={() => setMenuOpen(false)} aria-current={pathname === "/" || pathname === "/docs" ? "page" : undefined}>Welcome to Rustic</Link>
          <div className="project-switcher" aria-label="Documentation projects">{docSections.map((section) => <Link href={section.href} key={section.title} className={!isIndex && project === section.title ? "active" : ""} onClick={() => setMenuOpen(false)}>{section.title}</Link>)}</div>
          {docSections.filter((section) => isIndex || section.title === project).map((section) => <div className="nav-project" key={section.title}>
            <Link className="nav-project-title" href={section.href} onClick={() => setMenuOpen(false)}>{section.title}<span>{section.title === "Engine" ? "Engine/" : "docs repo"}</span></Link>
            {(isIndex ? section.groups.slice(0, 1) : section.groups).map((group) => <section className="nav-section" key={group.label}>
              <p>{group.label === section.title ? "Contributor guides" : group.label}</p>
              {group.docs.map((doc) => <Link className={routeFor(doc.slug) === pathname ? "active" : ""} aria-current={routeFor(doc.slug) === pathname ? "page" : undefined} href={routeFor(doc.slug)} key={doc.slug} onClick={() => setMenuOpen(false)}>{doc.title}</Link>)}
            </section>)}
          </div>)}
        </nav>
      </aside>
      {menuOpen && <button className="sidebar-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      {children}
      <aside className="on-page">{aside}</aside>
    </div>
  </div>;
}
