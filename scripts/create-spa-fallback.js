import { readFile, writeFile } from 'node:fs/promises';

const repositoryName = 'ra16-homeworks-router';
const indexPath = new URL('../dist/index.html', import.meta.url);
const fallbackPath = new URL('../dist/404.html', import.meta.url);
const indexHtml = await readFile(indexPath, 'utf8');
const fallbackHtml = indexHtml.replace(
  '<head>',
  `<head>\n  <base href="/${repositoryName}/">`,
);

await writeFile(fallbackPath, fallbackHtml);
