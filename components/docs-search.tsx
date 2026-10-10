"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { allDocs, routeFor } from "@/lib/docs-catalog";

export function DocsSearch() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = allDocs.filter((doc) => `${doc.title} ${doc.description} ${doc.group} ${doc.project}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setQuery(""); inputRef.current?.focus(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return <>
      <main className="content doc-content search-page">
        <div className="breadcrumbs"><Link href="/docs">DOCS</Link><ArrowRight size={13} /><span>SEARCH</span></div>
        <section className="search-hero" aria-labelledby="search-title">
          <div className="search-hero-copy"><p><span /> DOCUMENT INDEX</p><h1 id="search-title">Search documentation</h1><div className="search-lede">Find engine APIs, gameplay guides, and website contributor documentation.</div></div>
          <div className="search-field"><Search size={21} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by API, concept, or guide…" aria-label="Search Rustic documentation" /></div>
        </section>
        <section className="search-index" aria-label="Documentation index">
          <div className="search-index-head"><div><span>INDEX</span><h2>{query ? "Matching documentation" : "Browse all documentation"}</h2></div><p><strong>{String(results.length).padStart(2, "0")}</strong> / {String(allDocs.length).padStart(2, "0")} ENTRIES</p></div>
          <div className="search-index-list">{results.map((doc, index) => <Link href={routeFor(doc.slug)} key={doc.slug}><span className="result-number">{String(index + 1).padStart(2, "0")}</span><span className="result-copy"><span className="result-title">{doc.title}</span><small><b>{doc.project} / {doc.group}</b><span>{doc.description}</span></small></span><span className="result-arrow"><ArrowRight size={18} /></span></Link>)}{results.length === 0 && <div className="no-results"><span>404</span><strong>Nothing in the index</strong><small>Try a system name like “entity”, “time”, or “transform”.</small></div>}</div>
        </section>
        <footer className="search-page-footer"><span><i /> LIVE DOC INDEX</span><span>LOCAL CATALOG / NO AI GUESSWORK</span></footer>
      </main>
    <aside className="on-page"><div className="search-on-page"><p>SEARCH TIPS</p><span>Try an API name</span><code>transforms</code><span>Try a project</span><code>website</code><span>Try a workflow</span><code>gameplay</code></div></aside>
  </>;
}
