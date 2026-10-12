"use client";

import { Children, isValidElement, type ReactNode, useEffect, useId, useSyncExternalStore } from "react";
import { exampleLanguages } from "../lib/script-languages";

const storageKey = "rustic-docs-example-language";
let selection: string = exampleLanguages[0];
let initialized = false;
const listeners = new Set<() => void>();
function valid(value: string | null): value is string {
  return value === "all" || exampleLanguages.some((language) => language === value);
}
function publish(value: string) {
  selection = value;
  for (const listener of listeners) listener();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!initialized) {
    initialized = true;
    try { const saved = localStorage.getItem(storageKey); if (valid(saved)) publish(saved); } catch { /* Memory preference remains available. */ }
  }
  const onStorage = (event: StorageEvent) => { if (event.key === storageKey && valid(event.newValue)) publish(event.newValue); };
  window.addEventListener("storage", onStorage);
  return () => { listeners.delete(listener); window.removeEventListener("storage", onStorage); };
}
function choose(value: string) {
  publish(value);
  try { localStorage.setItem(storageKey, value); } catch { /* Storage may be disabled. */ }
}
export function LanguageTabs({ children }: { children: ReactNode }) {
  const selected = useSyncExternalStore(subscribe, () => selection, () => exampleLanguages[0]);
  const id = useId();
  const panels = Children.toArray(children).filter(isValidElement<{ node?: { properties?: Record<string, unknown> }; children?: ReactNode }>);
  const languages = panels.map((panel) => String(panel.props.node?.properties?.["data-language"]));
  useEffect(() => {
    const reveal = () => {
      let fragment: string;
      try { fragment = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(fragment);
      const section = target?.closest<HTMLElement>("[data-language]");
      const language = section?.dataset.language;
      if (section?.closest(".language-examples")?.id === `${id}-examples` && language && valid(language)) {
        choose(language);
        requestAnimationFrame(() => target?.scrollIntoView());
      }
    };
    reveal(); window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [id]);
  const choices = [...exampleLanguages, "all"];
  const selectedIndex = choices.indexOf(selected);
  const available = languages.includes(selected);
  return <section id={`${id}-examples`} className="language-examples" aria-label="Scripting examples">
    <div className="language-tabs" role="tablist" aria-label="Example language">{choices.map((language, index) => <button
      key={language} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={selected === language}
      tabIndex={selected === language ? 0 : -1} onClick={() => choose(language)}
      onKeyDown={(event) => {
        const target = event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1
          : event.key === "ArrowRight" ? (index + 1) % choices.length : event.key === "ArrowLeft" ? (index + choices.length - 1) % choices.length : -1;
        if (target < 0) return;
        event.preventDefault(); choose(choices[target]);
        document.getElementById(`${id}-tab-${target}`)?.focus();
      }}>{language === "all" ? "Show All Languages" : language}</button>)}</div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${selectedIndex}`} tabIndex={0}>
      {!available && selected !== "all" && <p role="status">No {selected} example is provided for this API. Documented language support for these examples: {languages.join(", ")}. Choose a listed language or Show All Languages.</p>}
      {panels.map((panel, index) => <div key={languages[index]} hidden={selected !== "all" && selected !== languages[index]}>{panel}</div>)}
    </div>
  </section>;
}
