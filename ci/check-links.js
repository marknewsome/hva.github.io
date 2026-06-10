// Checks that internal href links in all HTML files resolve to real files.
const fs   = require('fs');
const path = require('path');
const { globSync } = require('fs') ;

const ROOT = path.resolve('.');
const HTML_FILES = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['hvaastronomy.com', '.git', 'node_modules', 'ci', '.github'].includes(entry.name)) continue;
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      HTML_FILES.push(full);
    }
  }
}
walk(ROOT);

// Match href="..." and src="..." values that look like internal paths
const LINK_RE = /(?:href|src)="([^"#?]+)"/g;
// Skip external URLs, mailto, JS/data loader paths, and downloadable binaries
const SKIP_RE = /^(https?:|mailto:|tel:|data:|#|js\/|data\/)|\.(ppt|pptx|pdf|zip|docx?)$/i;

let errors = 0;

for (const file of HTML_FILES) {
  const content = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  let m;
  while ((m = LINK_RE.exec(content)) !== null) {
    const href = m[1];
    if (SKIP_RE.test(href)) continue;
    const target = path.resolve(dir, href);
    if (!fs.existsSync(target)) {
      console.error(`BROKEN: ${path.relative(ROOT, file)} → ${href}`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`\n${errors} broken internal link(s) found.`);
  process.exit(1);
}
console.log(`Internal links OK — checked ${HTML_FILES.length} files`);
