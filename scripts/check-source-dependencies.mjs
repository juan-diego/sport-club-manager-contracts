import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const allowedExternalModules = new Set(['rxjs']);

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return entry.isFile() && path.endsWith('.ts') ? [path] : [];
  });
}

const disallowedImports = sourceFiles('src').flatMap((path) => {
  const content = readFileSync(path, 'utf8');
  return [...content.matchAll(/\bfrom\s+['"]([^'"]+)['"]/g)]
    .map((match) => match[1])
    .filter((moduleName) => !moduleName.startsWith('.') && !allowedExternalModules.has(moduleName))
    .map((moduleName) => `${path}: ${moduleName}`);
});

if (disallowedImports.length > 0) {
  throw new Error(`Disallowed source dependencies:\n${disallowedImports.join('\n')}`);
}

console.log('Source dependencies are limited to RxJS.');
