// Full PHP examples already carry their opening tag; fragments need one for php -l.
export function phpSource(code) {
  return /^\s*<\?php(?:\s|$)/i.test(code) ? code : `<?php\n${code}\n`;
}
