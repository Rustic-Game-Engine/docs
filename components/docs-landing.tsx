import { ArrowRight, BookOpen, Code2, Globe, Layers, Search } from "lucide-react";
import Link from "next/link";
import { SiteFrame } from "./site-frame";

export function DocsLanding() {
  return <SiteFrame aside={<><p>ON THIS PAGE</p><a href="#welcome">Welcome</a><a href="#choose-your-path">Choose your path</a><a href="#start-building">Start building</a></>}>
    <main className="content landing-content">
      <div className="breadcrumbs">RUSTIC / DOCUMENTATION</div>
      <section className="intro" id="welcome" aria-labelledby="welcome-title">
        <div className="release-stamp"><span /> WELCOME TO RUSTIC</div>
        <h1 id="welcome-title">Your next game<br />starts <em>here.</em></h1>
        <p className="lede">Welcome to the Rustic Engine docs. Find your footing, bring a scene to life, and build something of your own—with guides and a reference to help along the way.</p>
        <div className="intro-actions"><Link className="primary-action" href="/docs/engine">Explore the engine <ArrowRight size={17} /></Link><Link className="secondary-action" href="/docs/api/overview">Read the API reference <BookOpen size={17} /></Link></div>
      </section>
      <section className="path-section" id="choose-your-path" aria-labelledby="path-title">
        <div className="section-heading"><div><span className="section-number">01</span><h2 id="path-title">Choose your path</h2></div><p>Two projects, one place to find your way. Start with the part you want to work on.</p></div>
        <div className="card-grid project-card-grid">
          <Link className="guide-card" href="/docs/engine"><div className="card-icon"><Layers size={23} /></div><p className="eyebrow">ENGINE/</p><h3>Build with Rustic Engine</h3><p>Get to know the native editor, write gameplay scripts, and explore scene, physics, and animation APIs.</p><span>ENGINE GUIDES & API <ArrowRight size={17} /></span></Link>
          <Link className="guide-card" href="/docs/website"><div className="card-icon"><Globe size={23} /></div><p className="eyebrow">DOCS REPOSITORY</p><h3>Work on the docs site</h3><p>Run the Next.js website, write helpful documentation, and learn how the site is built and deployed.</p><span>WEBSITE CONTRIBUTOR GUIDES <ArrowRight size={17} /></span></Link>
        </div>
      </section>
      <section className="browse-section" id="start-building" aria-labelledby="building-title">
        <div className="section-heading"><div><span className="section-number">02</span><h2 id="building-title">Start building</h2></div><p>A few good places to begin, whether this is your first script or your next contribution.</p></div>
        <div className="link-grid">
          <Link href="/docs/guides/gameplay-programming"><BookOpen size={24} /><span><strong>Your first gameplay script</strong><small>Create a behavior, attach it, and try it in Play.</small></span><ArrowRight size={18} /></Link>
          <Link href="/docs/scripting/lua"><Code2 size={24} /><span><strong>Choose a scripting language</strong><small>Start with Lua, or explore the other language guides.</small></span><ArrowRight size={18} /></Link>
          <Link href="/docs/website/documentation"><Globe size={24} /><span><strong>Contribute a guide</strong><small>Find the sources and make your page easy to discover.</small></span><ArrowRight size={18} /></Link>
          <Link href="/docs/search"><Search size={24} /><span><strong>Find what you need</strong><small>Search APIs, engine guides, and website documentation.</small></span><ArrowRight size={18} /></Link>
        </div>
      </section>
      <footer className="page-footer"><span>Rustic Engine · Built in Rust. Made for your ideas.</span><Link href="https://github.com/Rustic-Game-Engine/engine">Explore the repository <ArrowRight size={14} /></Link></footer>
    </main>
  </SiteFrame>;
}
