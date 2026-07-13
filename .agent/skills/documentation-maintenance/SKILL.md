---
name: documentation-maintenance
description: >
  Use this skill whenever work in this repository changes package setup, exports, shared model
  types, provider contracts, compatibility expectations, or architecture boundaries. Trigger even
  when the user does not explicitly mention documentation. The goal is to enforce documentation
  review and updates in the same change set as meaningful package changes.
---

# Documentation Maintenance

## Goal

Treat documentation review as mandatory completion work for meaningful changes in this repository.

The agent must not assume documentation is unaffected. It must review the documentation impact,
update the current source-of-truth docs when needed, and explicitly state the result.

## Trigger Conditions

Use this skill for:

- package setup changes
- build or install changes
- export surface changes
- provider contract changes
- shared domain model changes
- compatibility or versioning expectation changes
- architecture boundary changes
- documentation governance changes

Do not skip this skill just because the request is phrased as implementation, debugging, review,
or refactor work.

## Workflow

1. Inspect the requested or actual code changes.
2. Determine whether the change affects current documentation.
3. Open the affected current docs before finalizing the work.
4. Update the affected docs in the same change set when drift exists.
5. If no doc update is needed, say that explicitly in the final response and explain why.
6. Run the doc-impact checklist in `references/doc-impact-checklist.md`.

## Documentation Routing Map

Map changes to docs as follows:

- `README.md`
  - package purpose
  - installation
  - build and typecheck workflow
  - public export overview
  - consumer guidance

- `docs/reference/package-architecture.md`
  - ownership boundaries
  - export structure
  - reactive contract shape
  - compatibility expectations
  - what must not be added to this package

- `docs/README.md`
  - documentation taxonomy
  - maintenance expectations
  - documentation update rules

## Current Documentation Rules

- Current docs are canonical:
  - `README.md`
  - `docs/reference/*`

Do not leave current truth only in plans, chat output, or migration notes.

## Architecture Rule To Preserve

This repository is the shared contracts layer of the split architecture.

- It owns shared provider contracts.
- It owns shared domain models used by those contracts.
- It must not absorb framework-specific dependency-injection wiring.
- It must not absorb Firebase implementation details.
- It must not depend on frontend or backend source trees.

If the code still has a deliberate limitation, document it honestly. Do not describe the package
as more framework-neutral than it really is.

## Final Response Requirement

For relevant implementation tasks, the final response must include one of:

- which docs were updated, or
- that docs were reviewed and no update was needed, with a short reason

Lack of a documentation impact statement means the task is not complete.

## Anti-Patterns

- Changing exports without updating package docs
- Changing contracts without documenting the new boundary
- Claiming no external contract dependency while RxJS `Observable` remains part of the public API
- Leaving important rules only in migration plans instead of current docs
