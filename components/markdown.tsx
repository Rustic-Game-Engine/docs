"use client";

import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { type ReactNode, useMemo, useState } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveDocHref as resolveSourceHref } from "../lib/docs-markdown";
import { remarkDocumentation } from "../lib/markdown-model";
import { highlightCode, type SyntaxNode } from "../lib/syntax-highlighting";
import { LanguageTabs } from "./language-tabs";

export function resolveDocHref(href: string, sourcePath?: string) {
  return resolveSourceHref(defaultUrlTransform(href), sourcePath);
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
  const [status, setStatus] = useState("");
  const highlighted = useMemo(() => syntaxNodes(highlightCode(code, language)), [code, language]);
  async function copy() {
    try { await navigator.clipboard.writeText(code); setStatus("Copied"); window.setTimeout(() => setStatus(""), 1500); }
    catch { setStatus("Copy unavailable; select the code to copy it."); }
  }
  return <div className="doc-code"><div><span>{language}</span><button onClick={copy} aria-label={`Copy ${language} code`}>{status === "Copied" ? <Check size={14} /> : <Copy size={14} />}{status === "Copied" ? "Copied" : "Copy"}</button><span role="status">{status !== "Copied" ? status : ""}</span></div><pre><code>{highlighted}</code></pre></div>;
}
export function Markdown({ source, sourcePath }: { source: string; sourcePath?: string }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm, remarkDocumentation]} skipHtml components={{
    a: ({ href = "", children }) => {
      const target = resolveDocHref(href, sourcePath);
      return target.startsWith("/docs") ? <Link href={target}>{children}</Link> : <a href={target}>{children}</a>;
    },
    pre: ({ node }) => {
      const code = node?.children.find((child) => child.type === "element" && child.tagName === "code");
      if (!code || code.type !== "element") return null;
      const language = String(code.properties.className ?? "").replace("language-", "") || "text";
      const value = code.children.map((child) => child.type === "text" ? child.value : "").join("").replace(/\n$/, "");
      return <CodeBlock code={value} language={language} />;
    },
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Horizontal table scrolling needs keyboard access.
    table: ({ children }) => <div className="table-wrap" role="region" tabIndex={0} aria-label="Scrollable reference table"><table>{children}</table></div>,
    th: ({ children }) => <th scope="col">{children}</th>,
    // Native images are compatible with static export; captions use Markdown's title.
    img: ({ src, alt, title }) => <span className="doc-image"><img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />{title && <span className="doc-image-caption">{title}</span>}</span>,
    div: ({ node, children, ...props }) => node?.properties["data-language-group"] ? <LanguageTabs>{children}</LanguageTabs> : <div {...props}>{children}</div>,
  }}>{source}</ReactMarkdown>;
}
