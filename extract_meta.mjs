import fs from 'fs';
import path from 'path';

const pages = ['HomePage','AboutPage','ServicesPage','ProjectsPage','ContactPage','InsightsPage','CareersPage'];

function extractMeta(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const m = text.match(/<PageMeta\s+title="([^"]+)"\s*description="([^"]+)"/);
  if (!m) throw new Error(`No PageMeta in ${filePath}`);
  return { title: m[1], description: m[2] };
}

function extractHeadings(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const out = [];
  const re = /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const level = parseInt(m[1], 10);
    const attrs = m[2];
    const innerHtml = m[3];
    const innerText = innerHtml
      .replace(/<g>/g, '')
      .replace(/<\/g>/g, '')
      .replace(/<span[^>]*>/g, '')
      .replace(/<\/span>/g, '')
      .replace(/<br\s*\/?>/gi, ' ')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    out.push({ level, text: innerText || '(empty heading)' });
  }
  return out;
}

pages.forEach((name) => {
  const filePath = path.join(process.cwd(), 'src/pages', name + '.tsx');
  console.log('\n==============================');
  console.log(name + '.tsx');
  console.log('==============================');
  const { title, description } = extractMeta(filePath);
  console.log('\nCURRENT TITLE :', title);
  console.log('CURRENT DESC  :', description);
  console.log('\nHEADINGS (source order):');
  const heads = extractHeadings(filePath);
  heads.forEach((h, i) => console.log(`  ${String(i + 1).padStart(2, '0')}. h${h.level}  ::  ${h.text}`));
  console.log('  total headings :', heads.length);
});

// index.html fallback
console.log('\n==============================');
console.log('index.html fallback');
console.log('==============================');
const indexHtml = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');
const descMeta = indexHtml.match(/<meta name="description" content="([^"]+)"/);
const titleTag = indexHtml.match(/<title>([^<]+)<\/title>/);
console.log('FALLBACK TITLE:', titleTag ? titleTag[1] : '(none)');
console.log('FALLBACK DESC :', descMeta ? descMeta[1] : '(none)');
