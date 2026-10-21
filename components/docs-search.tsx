"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { docSections, routeFor } from "@/lib/docs-catalog";

import { searchDocs, searchKind, type SearchEntry } from "@/lib/docs-search";

export function DocsSearch({ project, entries }: { project: string; entries: SearchEntry[] }) {
  const [kind, setKind] = useState("All");
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchDocs(entries, query).filter((entry) => kind === "All" || searchKind(entry) === kind);
  const section = docSections.find((section) => section.title === project);
  const isEngine = project === "Engine";

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setQuery(""); inputRef.current?.focus(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return <>
      <main id="main-content" tabIndex={-1} className="content doc-content search-page">
        <div className="breadcrumbs"><Link href="/docs">DOCS</Link><ArrowRight size={13} /><Link href={section?.href ?? "/docs/engine"}>{project.toUpperCase()}</Link><ArrowRight size={13} /><span>SEARCH</span></div>
        <section className="search-hero" aria-label={`Search ${project} documentation`}>
          <div className="search-field"><Search size={21} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by API, concept, or guide…" aria-label={`Search ${project} documentation`} /></div>
          <label className="search-filter">Page type<select value={kind} onChange={(event) => setKind(event.target.value)}>{["All", "Tutorial", "Guide", "API reference"].map((value) => <option key={value}>{value}</option>)}</select></label>
        </section>
        <section className="search-index" aria-label="Documentation index">
          <div className="search-index-head"><div><span>INDEX</span><h2>{query ? "Matching documentation" : "Browse all documentation"}</h2></div><p aria-live="polite"><strong>{String(results.length).padStart(2, "0")}</strong> / {String(entries.length).padStart(2, "0")} ENTRIES</p></div>
          <div className="search-index-list">{results.map((doc, index) => <Link href={routeFor(doc.slug)} key={doc.slug}><span className="result-number">{String(index + 1).padStart(2, "0")}</span><span className="result-copy"><span className="result-title">{doc.title}</span><small><b>{searchKind(doc)} / {doc.group}</b><span>{doc.description}</span></small></span><span className="result-arrow"><ArrowRight size={18} /></span></Link>)}{results.length === 0 && <div className="no-results"><span>404</span><strong>Nothing in the index</strong><small>{isEngine ? "Try a system name like “entity”, “time”, or “transform”." : "Try a repository or workflow like “docs”, “build”, or “deployment”."}</small></div>}</div>
        </section>
        <footer className="search-page-footer"><span><i /> LIVE DOC INDEX</span><span>LOCAL CATALOG / NO AI GUESSWORK</span></footer>
      </main>
    <aside className="on-page"><div className="search-on-page"><p>SEARCH TIPS</p><span>Try a name</span><code>{isEngine ? "transforms" : "website"}</code><span>Try a workflow</span><code>{isEngine ? "gameplay" : "deployment"}</code><span>Try a term from a page</span><code>{isEngine ? "set_translation" : "npm"}</code></div></aside>
  </>;
}
