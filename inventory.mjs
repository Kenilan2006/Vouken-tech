import fs from 'fs';

const names = [
  'HomePage',
  'AboutPage',
  'ServicesPage',
  'ProjectsPage',
  'ContactPage',
  'InsightsPage',
  'CareersPage',
  'SolutionsPage',
  'InnovationPage',
  'FuturePage',
  'ServiceDetailPage',
  'ProjectDetailPage',
  'NotFoundPage',
  'AdminPage',
  'LoginPage',
];

const routePattern = /(RouteArtwork|route[-_]|compass|Compass|index-number|label-mono|topography|beacon|route-target|marquee|Marquee|grid-veil)/i;

names.forEach((name) => {
  const text = fs.readFileSync('src/pages/' + name + '.tsx', 'utf8');
  const lines = text.split('\n').length;

  const imports = [];
  const importRe = /import\s+{([^}]+)}\s+from\s+"([^"]+)"/g;
  let m;
  while ((m = importRe.exec(text)) !== null) {
    const symbols = m[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    imports.push({ from: m[2], symbols });
  }

  console.log('\n=== ' + name + '.tsx ===');
  console.log('lines        : ' + lines);
  console.log('route-ish    : ' + (routePattern.test(text) ? 'yes' : 'no'));
  console.log('imports      :');
  imports.forEach((imp) => console.log('   from ' + imp.from + ' -> ' + imp.symbols.join(', ')));
});
