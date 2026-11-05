import { access, copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const webDir = resolve(root, 'www');
const files = [
  'index.html',
  'style.css',
  'manifest.json',
  'sw.js',
  'icon.svg'
];

await mkdir(webDir, { recursive: true });

for (const file of files) {
  const source = resolve(root, file);
  const destination = resolve(webDir, file);

  await access(source);
  await copyFile(source, destination);
}

console.log('TengHisob web fayllari www papkasiga tayyorlandi.');
