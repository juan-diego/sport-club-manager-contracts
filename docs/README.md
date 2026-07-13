# Documentation Index

This repository holds the current source-of-truth documentation for the shared contracts package.

## Current Documentation

### Reference

- [reference/package-architecture.md](reference/package-architecture.md)
  - Status: `Current`
  - Use for package ownership boundaries, export surface, compatibility expectations, and rules
    for what belongs in this repository.

## Conventions

- `README.md` is for package purpose, consumer guidance, install/build commands, and public API
  orientation.
- `docs/reference/*` is for architectural boundaries, export structure, and maintenance rules for
  the contracts package.
- If package ownership, exports, reactive contract shape, or compatibility expectations change,
  update `README.md` and `docs/reference/package-architecture.md` in the same change set.
- If scripts, validation tooling, or release-gate requirements change, update `README.md` and this
  index in the same change set.
- Every exported declaration must have accurate TSDoc. Run `npm run api:check`, `npm run spell`,
  and `npm run markdown` when reviewing documentation changes.
