import { execFileSync } from 'node:child_process';

const result = execFileSync('npm', ['pack', '--dry-run', '--json', '--cache', '/tmp/sport-club-manager-npm-cache'], {
  encoding: 'utf8'
});
const [packageReport] = JSON.parse(result);
const unexpectedFiles = packageReport.files
  .map((file) => file.path)
  .filter((path) => path !== 'package.json' && path !== 'README.md' && !path.startsWith('dist/'));

if (unexpectedFiles.length > 0) {
  throw new Error(`Package contains unexpected files: ${unexpectedFiles.join(', ')}`);
}

console.log(`Package contents verified (${packageReport.files.length} files).`);
