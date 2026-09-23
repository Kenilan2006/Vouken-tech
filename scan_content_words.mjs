import fs from 'fs';

const pages = {
  HomePage: 'src/pages/HomePage.tsx',
  AboutPage: 'src/pages/AboutPage.tsx',
  ServicesPage: 'src/pages/ServicesPage.tsx',
  ProjectsPage: 'src/pages/ProjectsPage.tsx',
  ContactPage: 'src/pages/ContactPage.tsx',
  InsightsPage: 'src/pages/InsightsPage.tsx',
  CareersPage: 'src/pages/CareersPage.tsx',
};

const pattern = /\b(route|routes|navigation|navigate|navigating|compass|map|terrain|frontier|destination|journey|trip|voyage|waypoint|beacon|target)\b/i;

for (const [name, path] of Object.entries(pages)) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split('\n');
  console.log('\n=== ' + name + ' ===');
  let any = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i < 3) continue; // skip import header block
    if (pattern.test(line)) {
      any = true;
      console.log('L' + String(i + 1).padStart(4) + ': ' + line.trim());
      pattern.lastIndex = 0;
    }
  }
  if (!any) console.log('  (no later-line matches)');
}
