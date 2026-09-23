const lucide = require('lucide-react');

const want = [
  'Beaker',
  'FlaskConical',
  'FlaskRound',
  'Activity',
  'Hexagon',
  'ShieldCheck',
  'ShieldAlert',
  'Shield',
  'BarChart2',
  'Columns3',
  'Columns4',
  'Network',
  'Server',
  'Layers',
  'PieChart',
  'Cog',
];

const present = want.filter((k) => lucide[k]);
const missing = want.filter((k) => !lucide[k]);

console.log('PRESENT:');
present.forEach((k) => console.log('  ' + k));
console.log('MISSING:');
missing.forEach((k) => console.log('  ' + k));
