import fs from 'fs';

const pages = ['HomePage', 'AboutPage', 'ServicesPage', 'ProjectsPage', 'ContactPage', 'InsightsPage', 'CareersPage'];

pages.forEach(function (n) {
  const src = fs.readFileSync('src/pages/' + n + '.tsx', 'utf8');
  const t = src.match(/title="([^"]+)"/);
  const d = src.match(/description="([^"]+)"/);
  console.log(n);
  console.log('  title=' + (t ? t[1] : '(none)'));
  console.log('  desc =' + (d ? d[1] : '(none)'));
  console.log('  ---');
});

console.log('\nSection labels:');
function labels(p) {
  const src = fs.readFileSync(p, 'utf8');
  const r = /<Section[^>]*label="([^"]+)"/g;
  const out = [];
  let m;
  while ((m = r.exec(src)) !== null) out.push(m[1]);
  return out;
}

console.log('HomePage     :', labels('src/pages/HomePage.tsx'));
console.log('AboutPage    :', labels('src/pages/AboutPage.tsx'));
console.log('ServicesPage :', labels('src/pages/ServicesPage.tsx'));
console.log('ProjectsPage :', labels('src/pages/ProjectsPage.tsx'));
console.log('ContactPage  :', labels('src/pages/ContactPage.tsx'));
console.log('InsightsPage :', labels('src/pages/InsightsPage.tsx'));
console.log('CareersPage  :', labels('src/pages/CareersPage.tsx'));

console.log('\nindex.html title :', /<title>([^<]+)<\/title>/.exec(fs.readFileSync('index.html', 'utf8'))[1]);
console.log('index.html desc  :', /<meta name="description" content="([^"]+)"/.exec(fs.readFileSync('index.html', 'utf8'))[1]);
