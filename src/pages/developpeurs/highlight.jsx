// Coloration du code des exemples (curl, JSON, Node.js, PHP, HTTP) — petit
// découpage maison, sans bibliothèque : la page reste légère. Pas un vrai
// analyseur : assez juste pour nos exemples, jamais faux au point de gêner.

const COLORS = {
  comment: 'text-white/40 italic',
  string:  'text-[#7EE787]',
  key:     'text-[#79C0FF]',
  number:  'text-[#FFA657]',
  keyword: 'text-[#FF7B72]',
  flag:    'text-[#D2A8FF]',
  url:     'text-[#00D2FF]',
  header:  'text-[#79C0FF]',
  status:  'text-[#00E08C] font-semibold',
  var:     'text-[#FFA657]',
}

const KEYWORDS = {
  js:   ['const', 'let', 'await', 'async', 'import', 'from', 'return', 'if', 'new', 'throw', 'function', 'true', 'false', 'null'],
  php:  ['echo', 'if', 'exit', 'true', 'false', 'null', 'function', 'return'],
  json: ['true', 'false', 'null'],
  bash: ['curl'],
  http: [],
}

// Ordre = priorité : le premier motif qui commence le plus tôt l'emporte
function buildRegex(lang) {
  const parts = [
    // Sans « lookbehind » (absent des Safari d'avant iOS 16.4) : l'espace
    // qui précède est inclus dans le jeton, sans effet visible
    ['comment', lang === 'json' ? null : String.raw`(?:^|\s)(?:\/\/|#)[^\n]*`],
    ['status',  lang === 'http' ? String.raw`^HTTP\/1\.1 \d{3}[^\n]*` : null],
    ['header',  lang === 'http' ? String.raw`^[A-Za-z][A-Za-z0-9-]*(?=:)` : null],
    ['key',     String.raw`"(?:[^"\\\n]|\\.)*"(?=\s*:)`],
    ['string',  lang === 'bash' ? String.raw`"(?:[^"\\\n]|\\.)*"` : String.raw`"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|\x60(?:[^\x60\\]|\\.)*\x60`],
    ['url',     String.raw`https?:\/\/[^\s'"\\)]+`],
    ['var',     lang === 'php' ? String.raw`\$\w+|<\?php` : null],
    ['flag',    lang === 'bash' ? String.raw`\s-{1,2}[A-Za-z][\w-]*` : null],
    ['number',  String.raw`\b\d+(?:\.\d+)?\b`],
    ['keyword', KEYWORDS[lang]?.length ? String.raw`\b(?:${KEYWORDS[lang].join('|')})\b` : null],
  ].filter(([, re]) => re)
  return {
    names: parts.map(([n]) => n),
    re: new RegExp(parts.map(([, re]) => `(${re})`).join('|'), 'gm'),
  }
}

const cache = {}

export function highlight(code, lang = 'bash') {
  const { names, re } = (cache[lang] ??= buildRegex(lang))
  const out = []
  let last = 0
  re.lastIndex = 0
  let m
  while ((m = re.exec(code))) {
    if (m[0] === '') { re.lastIndex++; continue }
    if (m.index > last) out.push(code.slice(last, m.index))
    const group = m.slice(1).findIndex(g => g !== undefined)
    out.push(<span key={m.index} className={COLORS[names[group]]}>{m[0]}</span>)
    last = m.index + m[0].length
  }
  if (last < code.length) out.push(code.slice(last))
  return out
}

// Langage deviné d'après le contenu, quand l'exemple ne le précise pas
export function guessLang(code) {
  const c = code.trimStart()
  if (c.startsWith('curl')) return 'bash'
  if (c.startsWith('<?php')) return 'php'
  if (c.startsWith('HTTP/') || /^(POST|GET) \//.test(c)) return 'http'
  if (c.startsWith('{') || c.startsWith('[')) return 'json'
  if (/^(import|const|let|await)\b/.test(c)) return 'js'
  if (/^[A-Za-z-]+: /.test(c)) return 'http'
  return 'bash'
}

export const LANG_LABELS = { bash: 'Terminal', json: 'JSON', js: 'Node.js', php: 'PHP', http: 'HTTP' }
