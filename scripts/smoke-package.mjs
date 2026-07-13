import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = mkdtempSync(join(tmpdir(), 'sport-club-manager-contracts-smoke-'));
const consumer = join(root, 'consumer');

try {
  const [packageReport] = JSON.parse(
    execFileSync('npm', ['pack', '--json', '--pack-destination', root, '--cache', '/tmp/sport-club-manager-npm-cache'], {
      encoding: 'utf8'
    })
  );
  mkdirSync(consumer);
  writeFileSync(join(consumer, 'package.json'), '{"private":true,"type":"module"}\n');
  execFileSync('tar', ['-xzf', join(root, packageReport.filename), '-C', root]);
  mkdirSync(join(consumer, 'node_modules', '@sport-club-manager'), { recursive: true });
  renameSync(join(root, 'package'), join(consumer, 'node_modules', '@sport-club-manager', 'contracts'));
  execFileSync('node', ['--input-type=module', '--eval', "import { AuthStateModel } from '@sport-club-manager/contracts'; if (!new AuthStateModel('authenticated').isAuthenticated) process.exit(1);"], {
    cwd: consumer,
    stdio: 'inherit'
  });
  console.log('Consumer package import verified.');
} finally {
  rmSync(root, { recursive: true, force: true });
}
