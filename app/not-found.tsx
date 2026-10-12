import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="content doc-content">
    <article className="markdown"><h1>Page not found</h1><p>This documentation route is unavailable. Browse the <Link href="/docs/engine">engine guides</Link> or <Link href="/docs/search">search the documentation</Link>.</p></article>
  </main>;
}
