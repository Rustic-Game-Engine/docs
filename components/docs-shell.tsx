"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { allDocs, canonicalDocPath, docSections, routeFor } from "@/lib/docs-catalog";
import { headingIndex, parseMarkdown } from "@/lib/markdown-model";
import { Markdown } from "./markdown";
import { exampleLanguages } from "@/lib/script-languages";

import { RepositoryCards } from "./repository-cards";

export function DocsShell({ markdown, title, group }: { markdown: string; title: string; group: string }) {
  const pathname = canonicalDocPath(usePathname());
  const headings = useMemo(() => headingIndex(parseMarkdown(markdown)).filter((heading) => (heading.level === 2 || heading.level === 3) && !exampleLanguages.some((language) => language === heading.text)), [markdown]);
  const currentDoc = allDocs.find((doc) => routeFor(doc.slug) === pathname);
  const parentDoc = allDocs.find((doc) => doc.slug === currentDoc?.parent);
  const projectDocs = allDocs.filter((doc) => doc.project === currentDoc?.project && doc.group === currentDoc?.group);
  const currentIndex = projectDocs.findIndex((doc) => routeFor(doc.slug) === pathname);

  return <>
      <main className="content doc-content"><div className="breadcrumbs"><Link href="/docs">DOCS</Link><ArrowRight size={13} /><Link href={docSections.find((section) => section.title === currentDoc?.project)?.href ?? "/docs/open-source"}>{currentDoc?.project.toUpperCase()}</Link><ArrowRight size={13} /><span>{group.toUpperCase()}</span><ArrowRight size={13} />{parentDoc ? <><Link href={routeFor(parentDoc.slug)}>{parentDoc.title.toUpperCase()}</Link><ArrowRight size={13} /></> : null}<span>{title.toUpperCase()}</span></div>{currentDoc?.slug === "open-source" ? <><article className="markdown"><Markdown source={markdown.split("## Choose a repository")[0]} /></article><RepositoryCards /><article className="markdown"><Markdown source={`## Choose a repository${markdown.split("## Choose a repository").slice(1).join("## Choose a repository")}`} /></article></> : <article className="markdown"><Markdown source={markdown} sourcePath={currentDoc?.sourcePath ?? currentDoc?.source} /></article>}<nav className="page-pagination" aria-label="Documentation pages">{currentIndex > 0 ? <Link href={routeFor(projectDocs[currentIndex - 1].slug)}><ArrowLeft size={16} /><span><small>PREVIOUS</small>{projectDocs[currentIndex - 1].title}</span></Link> : <span />}{currentIndex < projectDocs.length - 1 ? <Link className="next" href={routeFor(projectDocs[currentIndex + 1].slug)}><span><small>NEXT</small>{projectDocs[currentIndex + 1].title}</span><ArrowRight size={16} /></Link> : null}</nav></main>
    <aside className="on-page"><p>ON THIS PAGE</p>{headings.map((heading) => <a className={heading.level === 3 ? "nested" : ""} href={`#${heading.id}`} key={heading.id}>{heading.text}</a>)}</aside>
  </>;
}
