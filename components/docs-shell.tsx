"use client";

import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useMemo, useState } from "react";
import { allDocs, canonicalDocPath, docSections, routeFor } from "@/lib/docs-catalog";
import { highlightCode, type SyntaxNode } from "@/lib/syntax-highlighting";

import { markdownHeadings, resolveDocHref } from "@/lib/docs-markdown";

import { RepositoryCards } from "./repository-cards";

function inline(text: string, sourcePath: string): ReactNode[] {
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g;
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    if (match[2] && match[3]) {
      const href = resolveDocHref(match[3], sourcePath);
      nodes.push(/^https?:/.test(href) ? <a href={href} target="_blank" rel="noreferrer" key={`${match.index}-a`}>{match[2]}</a> : <Link href={href} key={`${match.index}-l`}>{match[2]}</Link>);
    } else if (match[4]) nodes.push(<code key={`${match.index}-c`}>{match[4]}</code>);
    else if (match[5]) nodes.push(<strong key={`${match.index}-s`}>{match[5]}</strong>);
    cursor = pattern.lastIndex;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function syntaxNodes(nodes: SyntaxNode[]): ReactNode[] {
  return nodes.map((node, index) => {
    if (node.type === "text") return node.value;
    if (node.type !== "element") return null;
    const classes = node.properties.className;
    return <span className={Array.isArray(classes) ? classes.join(" ") : undefined} key={index}>{syntaxNodes(node.children)}</span>;
  });
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copyState, setCopyState] = useState("Copy");
  const highlighted = useMemo(() => syntaxNodes(highlightCode(code, language)), [code, language]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("Copied");
    } catch { setCopyState("Select code to copy"); }
    window.setTimeout(() => setCopyState("Copy"), 1500);
  };
  return <div className="doc-code"><div><span>{language}</span><button onClick={copy} aria-label={`Copy ${language} code`}>{copyState === "Copied" ? <Check size={14} /> : <Copy size={14} />}<span aria-live="polite">{copyState}</span></button></div><pre><code>{highlighted}</code></pre></div>;
}

function Markdown({ source, sourcePath }: { source: string; sourcePath: string }) {
  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const output: ReactNode[] = [];
  const headings = new Map(markdownHeadings(source).map((heading) => [heading.line, heading]));
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }
    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || "text";
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) code.push(lines[index++]);
      index += 1;
      output.push(<CodeBlock code={code.join("\n")} language={language} key={`code-${index}`} />);
      continue;
    }
    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      const Tag = `h${heading[1].length}` as "h1" | "h2" | "h3" | "h4";
      const text = heading[2].replace(/`/g, "");
      output.push(<Tag id={headings.get(index)?.id} key={`h-${index}`}>{inline(text, sourcePath)}</Tag>);
      index += 1;
      continue;
    }
    if (line.startsWith("| ") && lines[index + 1]?.match(/^\|?\s*:?-+/)) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) rows.push(lines[index++].split("|").slice(1, -1).map((cell) => cell.trim()));
      const [head, , ...body] = rows;
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Horizontal table scrolling needs keyboard access.
      output.push(<div className="table-wrap" role="region" tabIndex={0} aria-label="Scrollable reference table" key={`table-${index}`}><table><thead><tr>{head.map((cell, i) => <th scope="col" key={i}>{inline(cell, sourcePath)}</th>)}</tr></thead><tbody>{body.map((row, r) => <tr key={r}>{row.map((cell, c) => <td key={c}>{inline(cell, sourcePath)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) items.push(lines[index++].replace(/^[-*]\s+/, ""));
      output.push(<ul key={`ul-${index}`}>{items.map((item, i) => <li key={i}>{inline(item, sourcePath)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) items.push(lines[index++].replace(/^\d+\.\s+/, ""));
      output.push(<ol key={`ol-${index}`}>{items.map((item, i) => <li key={i}>{inline(item, sourcePath)}</li>)}</ol>);
      continue;
    }
    if (line.startsWith("> ")) { output.push(<blockquote key={`quote-${index}`}>{inline(line.slice(2), sourcePath)}</blockquote>); index += 1; continue; }
    if (/^---+$/.test(line.trim())) { output.push(<hr key={`hr-${index}`} />); index += 1; continue; }
    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#{1,4})\s|^```|^[-*]\s+|^\d+\.\s+|^>\s|^\|/.test(lines[index])) paragraph.push(lines[index++].trim());
    output.push(<p key={`p-${index}`}>{inline(paragraph.join(" "), sourcePath)}</p>);
  }
  return <>{output}</>;
}

export function DocsShell({ markdown, title, group }: { markdown: string; title: string; group: string }) {
  const pathname = canonicalDocPath(usePathname());
  const headings = useMemo(() => markdownHeadings(markdown).filter((heading) => heading.level === 2 || heading.level === 3), [markdown]);
  const currentDoc = allDocs.find((doc) => routeFor(doc.slug) === pathname);
  const sourcePath = currentDoc?.sourcePath ?? currentDoc?.source ?? "";
  const parentDoc = allDocs.find((doc) => doc.slug === currentDoc?.parent);
  const projectDocs = allDocs.filter((doc) => doc.project === currentDoc?.project);
  const currentIndex = projectDocs.findIndex((doc) => routeFor(doc.slug) === pathname);

  return <>
      <main id="main-content" tabIndex={-1} className="content doc-content"><div className="breadcrumbs"><Link href="/docs">DOCS</Link><ArrowRight size={13} /><Link href={docSections.find((section) => section.title === currentDoc?.project)?.href ?? "/docs/open-source"}>{currentDoc?.project.toUpperCase()}</Link><ArrowRight size={13} /><span>{group.toUpperCase()}</span><ArrowRight size={13} />{parentDoc ? <><Link href={routeFor(parentDoc.slug)}>{parentDoc.title.toUpperCase()}</Link><ArrowRight size={13} /></> : null}<span>{title.toUpperCase()}</span></div>{currentDoc?.slug === "open-source" ? <><article className="markdown"><Markdown sourcePath={sourcePath} source={markdown.split("## Choose a repository")[0]} /></article><RepositoryCards /><article className="markdown"><Markdown sourcePath={sourcePath} source={`## Choose a repository${markdown.split("## Choose a repository").slice(1).join("## Choose a repository")}`} /></article></> : <article className="markdown"><Markdown sourcePath={sourcePath} source={markdown} /></article>}<nav className="page-pagination" aria-label="Documentation pages">{currentIndex > 0 ? <Link href={routeFor(projectDocs[currentIndex - 1].slug)}><ArrowLeft size={16} /><span><small>PREVIOUS</small>{projectDocs[currentIndex - 1].title}</span></Link> : <span />}{currentIndex < projectDocs.length - 1 ? <Link className="next" href={routeFor(projectDocs[currentIndex + 1].slug)}><span><small>NEXT</small>{projectDocs[currentIndex + 1].title}</span><ArrowRight size={16} /></Link> : null}</nav></main>
    <aside className="on-page"><p>ON THIS PAGE</p>{headings.map((heading) => <a className={heading.level === 3 ? "nested" : ""} href={`#${heading.id}`} key={heading.id}>{heading.text}</a>)}</aside>
  </>;
}
