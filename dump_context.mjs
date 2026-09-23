import fs from 'fs';

function dump(path, lines) {
  const text = fs.readFileSync(path, 'utf8');
  const rows = text.split('\n');
  for (const n of lines) {
    console.log('L' + String(n + 1).padStart(4) + ': ' + rows[n]);
  }
  console.log('---');
}

dump('src/pages/ServicesPage.tsx', [66, 70, 74, 78, 80, 99, 101]);
dump('src/pages/ProjectsPage.tsx', [120, 122, 124, 126, 128, 130, 132, 134]);
dump('src/pages/InsightsPage.tsx', [20, 22, 24, 26, 28, 30, 38, 40, 42]);
dump('src/pages/CareersPage.tsx', [18, 20, 22, 24, 26, 28, 72, 74, 76, 78, 80]);
