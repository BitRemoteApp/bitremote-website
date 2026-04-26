import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const exportDir = 'out';

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.isFile() && entry.name.endsWith('.html') ? [path] : [];
    }),
  );

  return files.flat();
}

function hardenHeadScripts(html) {
  const headEnd = html.indexOf('</head>');
  if (headEnd === -1) return html;

  const head = html.slice(0, headEnd);
  const rest = html.slice(headEnd);
  const hardenedHead = head.replace(/<script\b(?![^>]*(?:\basync\b|\bdefer\b|\btype=))([^>]*)>/g, '<script defer$1>');

  return `${hardenedHead}${rest}`;
}

for (const file of await htmlFiles(exportDir)) {
  const html = await readFile(file, 'utf8');
  const hardened = hardenHeadScripts(html);

  if (hardened !== html) {
    await writeFile(file, hardened);
  }
}
