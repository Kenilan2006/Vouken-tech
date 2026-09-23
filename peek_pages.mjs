import fs from 'fs';

const names = ['AboutPage','ServicesPage','ContactPage'];

names.forEach((name) => {
  const text = fs.readFileSync('src/pages/' + name + '.tsx', 'utf8');

  const m = text.match(
    /return\s*\(\s*<>\s*\n\s*<PageMeta\s+title="([^"]+)"\s+description="([^"]+)"\s*\/>/s
  );
  if (!m) {
    console.log('\n=== ' + name + ' ===\nNO MATCH');
    return;
  }

  console.log('\n=== ' + name + ' ===');
  console.log('OLD_TITLE:', m[1]);
  console.log('OLD_DESC :', m[2]);
  console.log('OLD_BLOCK:');
  console.log(m[0]);
});
