"use client";

import { Github, Menu, Moon, Search, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { canonicalDocPath, docSections, projectForPath, routeFor, searchRouteFor, type DocEntry } from "@/lib/docs-catalog";

function DocNavigation({ doc, docs, pathname, onNavigate }: { doc: DocEntry; docs: DocEntry[]; pathname: string; onNavigate: () => void }) {
  const children = docs.filter((entry) => entry.parent === doc.slug);
  const href = routeFor(doc.slug);
  const activeCategory = pathname === href || pathname.startsWith(`${href}/`);
  const [navigation, setNavigation] = useState({ pathname, expanded: activeCategory });
  const expanded = navigation.pathname === pathname ? navigation.expanded : activeCategory || navigation.expanded;
  const link = <Link className={href === pathname ? "active" : ""} aria-current={href === pathname ? "page" : undefined} href={href} onClick={onNavigate}>{children.length ? "Overview" : doc.title}</Link>;
  if (!children.length) return link;
  return <details className="nav-guide" open={expanded} onToggle={(event) => setNavigation({ pathname, expanded: event.currentTarget.open })}>
    <summary>{doc.title}</summary>
    <div className="nav-subpages">{link}{children.map((child) => <DocNavigation key={child.slug} doc={child} docs={docs} pathname={pathname} onNavigate={onNavigate} />)}</div>
  </details>;
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const canonicalPath = canonicalDocPath(pathname);
  const isIndex = pathname === "/" || pathname === "/docs";
  const project = projectForPath(pathname);
  const searchHref = searchRouteFor(project);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const sidebar = sidebarRef.current;
    const menuButton = menuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sidebar?.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(sidebar?.querySelectorAll<HTMLElement>("a, button, summary") ?? []);
      const visible = items.filter((item) => item.getClientRects().length > 0);
      const first = visible[0], last = visible[visible.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", trapFocus);
      menuButton?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (pathname === searchHref) document.querySelector<HTMLInputElement>(".search-field input")?.focus();
        else router.push(searchHref);
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [pathname, router, searchHref]);

  return <div className={dark ? "site dark" : "site"}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Rustic docs home"><span className="brand-mark"><span /></span><span>RUSTIC</span><span className="brand-division">DOCS</span></Link>
      <Link className="search-trigger" href={searchHref}><Search size={17} /><span>Search documentation</span></Link>
      <nav className="top-actions" aria-label="Site links"><span className="version-button">Docs v0.1</span><a href="https://github.com/Rustic-Game-Engine" aria-label="Rustic repositories on GitHub"><Github size={19} /></a><button className="icon-button" onClick={() => setDark((value) => !value)} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button ref={menuRef} className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="docs-sidebar"><Menu /></button></nav>
    </header>
    <div className="docs-shell article-shell">
      <aside ref={sidebarRef} id="docs-sidebar" role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen || undefined} aria-label="Documentation navigation" className={menuOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-mobile-head"><span>Documentation</span><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button></div>
        <nav className="sidebar-content" aria-label="Documentation">
          <Link className="home-link" href="/" onClick={() => setMenuOpen(false)} aria-current={pathname === "/" || pathname === "/docs" ? "page" : undefined}>Welcome to Rustic</Link>
          <div className="project-switcher" aria-label="Documentation projects">{docSections.map((section) => <Link href={section.href} key={section.title} className={!isIndex && project === section.title ? "active" : ""} onClick={() => setMenuOpen(false)}>{section.title}</Link>)}</div>
          {docSections.filter((section) => isIndex || section.title === project).map((section) => <div className="nav-project" key={section.title}>
            <Link className="nav-project-title" href={section.href} onClick={() => setMenuOpen(false)}>{section.title}</Link>
            {(isIndex && section.title === "Engine" ? section.groups.slice(0, 1) : section.groups).map((group) => <section className="nav-section" key={group.label}>
              <p>{group.label === "Open Source Development" ? "Overview" : group.label === "Engine source" ? "Engine" : group.label}</p>
              {group.docs.filter((doc) => !doc.parent).map((doc) => <DocNavigation key={doc.slug} doc={doc} docs={group.docs} pathname={canonicalPath} onNavigate={() => setMenuOpen(false)} />)}
            </section>)}
          </div>)}
        </nav>
      </aside>
      {menuOpen && <button className="sidebar-scrim" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}
      {children}
    </div>
  </div>;
}
