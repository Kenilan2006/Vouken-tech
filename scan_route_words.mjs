import fs from 'fs';

const targets = [
  ['src/pages/AboutPage.tsx', 'About'],
  ['src/pages/ProjectsPage.tsx', 'Projects'],
  ['src/pages/InsightsPage.tsx', 'Insights'],
  ['src/pages/HomePage.tsx', 'Home'],
  ['src/components/Footer.tsx', 'Footer'],
  ['src/components/Header.tsx', 'Header'],
  ['src/components/Marquee.tsx', 'Marquee'],
];

const routeOnly = (line) =>
  /\broute\b/i.test(line) &&
  !/react-router-dom/.test(line) &&
  !/routers?\//.test(line) &&
  !/route:/i.test(line) &&
  !/route\.tsx/i.test(line) &&
  !/routes? /i.test(line) &&
  !/^import /.test(line) &&
  !/from ".+routes?/.test(line) &&
  !/\.route/i.test(line) &&
  !/routeName/i.test(line) &&
  !/Router/i.test(line) &&
  !/location\.pathname/i.test(line) &&
  !/navigation/.test(line) &&
  !/\broutes\b/i.test(line);

targets.forEach(([path, label]) => {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split('\n');
  const hits = lines
    .map((l, i) => ({ line: i + 1, text: l.trim() }))
    .filter(({ text }) => routeOnly(text));

  console.log(`\n=== ${label} (${path}) — bare "route" lines: ${hits.length} ===`);
  hits.slice(0, 10).forEach((h) => console.log(`  L${h.line}: ${h.text}`));
});

// Also report compass / map-coded chrome
console.log('\n=== compass / map-coded chrome ===\n');
const compassCheck = [
  ['src/components/Logo.tsx', 'Logo'],
  ['src/components/Footer.tsx', 'Footer'],
  ['src/pages/HomePage.tsx', 'Home'],
];
compassCheck.forEach(([path, label]) => {
  const text = fs.readFileSync(path, 'utf8');
  const hasCompass = /Compass/.test(text);
  const hasMapPin = /MapPin/.test(text);
  const hasNextCoordinate = /next coordinate/i.test(text);
  console.log(`${label}: compass=${hasCompass}  mapPin=${hasMapPin}  nextCoordinate=${hasNextCoordinate}`);
});
