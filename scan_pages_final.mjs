import fs from 'fs';

const pages = {
  NotFoundPage: 'src/pages/NotFoundPage.tsx',
  ServiceDetailPage: 'src/pages/ServiceDetailPage.tsx',
  HomePage: 'src/pages/HomePage.tsx',
  AboutPage: 'src/pages/AboutPage.tsx',
  SolutionsPage: 'src/pages/SolutionsPage.tsx',
  InnovationPage: 'src/pages/InnovationPage.tsx',
  FuturePage: 'src/pages/FuturePage.tsx',
  ContactPage: 'src/pages/ContactPage.tsx',
};

const patterns = [
  'route',
  'navigate',
  'terrain',
  'destination',
  'frontier',
  'map',
  'compass',
];

function lineMatches(text, pattern) {
  return text
    .split(/\r?\n/)
    .map((line, idx) => ({ idx: idx + 1, line }))
    .filter(({ line }) => new RegExp(pattern, 'i').test(line));
}

Object.entries(pages).forEach(([name, path]) => {
  const text = fs.readFileSync(path, 'utf8');
  console.log('\n==============================');
  console.log(name);
  console.log('==============================');
  patterns.forEach((p) => {
    const matches = lineMatches(text, p);
    if (!matches.length) return;
    console.log('\n  [' + p + '] ' + matches.length + ' line(s):');
    matches.forEach((m) => {
      const t = m.line
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 150);
      console.log('    L' + String(m.idx).padStart(3, ' ') + '  ' + t);
    });
  });
});
