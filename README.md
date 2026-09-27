# @sport-club-manager/contracts

Shared contracts package for the Sport Club Manager application.

This package is the single source of truth for the provider contracts and shared domain models used
across the Sport Club Manager codebase.

## Purpose

This repository owns:

- provider contracts consumed by application services and implemented by infrastructure packages
- shared domain models referenced by those provider contracts
- package-level documentation describing ownership, exports, and compatibility expectations

This repository does not own:

- dependency-injection token definitions
- Firebase SDK configuration or adapter implementations
- application feature code or screens
- Firebase Cloud Functions code

## Package Layout

- `src/models`
  - shared domain models for auth, users, club settings, federations, and spaces
- `src/providers`
  - backend-agnostic provider contracts
- `src/index.ts`
  - root export surface for common consumers

Published entrypoints:

- `@sport-club-manager/contracts`
- `@sport-club-manager/contracts/models`
- `@sport-club-manager/contracts/providers`

## Dependencies

RxJS is the only published package dependency and provides `Observable` for reactive provider
contracts. The source imports RxJS and its own relative modules only.

Development dependencies provide build, test, lint, documentation, and security tooling. They are
not included in the published package, which contains only `dist` and package metadata.

## Install And Build

Common commands:

```bash
npm run typecheck
npm run build
npm run quality
```

## Quality Gate

Run `npm ci` and `npm run quality` from a clean working tree. The quality gate reports confirmed
secrets, critical or high dependency vulnerabilities, failed checks, and public-API or
documentation mismatches. Medium security findings require a documented risk disposition and owner.

`npm run quality` runs type checking, the source-dependency allowlist check, linting, regression tests,
spelling checks, the generated public-API report, package-content verification, and security checks.
Markdown structure and formatting are reviewed with the associated documentation change. The security
checks require these locally installed command-line tools:

- `gitleaks` for working-tree and full Git-history secret scanning
- `osv-scanner` for lockfile vulnerability scanning
- `semgrep` for local TypeScript and secret-focused static analysis

Install the tools from their official releases or package managers, then confirm their commands
are on `PATH`. The scanners run locally; OSV and npm audit query vulnerability metadata but do not
upload source code.

Review `npm pack --dry-run` output, tracked files, package metadata, `.gitignore`, generated
package contents, and every scanner finding. A confirmed secret requires revocation and removal
from Git history; adding the file to `.gitignore` is insufficient.

## Compatibility Rules

- Treat exported interfaces and model types as shared API.
- Prefer additive changes over breaking signature changes.
- When changing provider contracts, update all consuming repositories that rely on the affected
  contracts.
- Do not add dependency-injection wiring or Firebase implementation details to this package.
- Keep source dependencies limited to RxJS; `npm run check:source-dependencies` enforces this rule.

## Documentation

- [docs/README.md](docs/README.md)
- [docs/reference/package-architecture.md](docs/reference/package-architecture.md)

Every exported contract is documented with TSDoc. Treat the declarations and the generated report
in `etc/api-report/contracts.api.md` as the public API inventory; update the current documentation
in the same change set whenever it changes.
