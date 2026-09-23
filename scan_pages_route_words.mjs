const fs = require('fs');
const d = 'src/pages';

const tokens = /route|navigate|terrain|destination|frontier/i;

fs.readdirSync(d)
  .filter((f) => f.endsWith('.tsx'))
  .forEach((f) => {
    const c = fs.readFileSync(d + '/' + f, 'utf8');
    const lines = c.split('\n');
    let hit = false;
    lines.forEach((l, i) => {
      if (tokens.test(l)) {
        hit = true;
        console.log(f + ':' + (i + 1) + ': ' + l.trim().slice(0, 160));
      }
    });
    if (!hit) console.log(f + ' -> no map-coded tokens');
  });
