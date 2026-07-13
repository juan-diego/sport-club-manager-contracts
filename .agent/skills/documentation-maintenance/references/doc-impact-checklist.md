# Documentation Impact Checklist

Run this checklist for any meaningful change in the repository.

## Required Questions

1. Did package setup change?
   - install requirements
   - scripts
   - build or typecheck workflow
   - published entrypoints
   - If yes, review `README.md`

2. Did the public API change?
   - exported interfaces
   - exported model types
   - enums, classes, helpers, or subpath exports
   - If yes, review `README.md` and `docs/reference/package-architecture.md`

3. Did architecture boundaries change?
   - ownership of contracts
   - ownership of shared models
   - framework coupling
   - what is allowed in this package
   - If yes, review `docs/reference/package-architecture.md`

4. Did documentation governance change?
   - documentation taxonomy
   - maintenance expectations
   - current source-of-truth rules
   - If yes, review `docs/README.md`

5. Did quality, security, or release validation change?
   - package scripts, scanners, CI checks, or pre-push requirements
   - If yes, review `README.md` and `docs/README.md`

6. Did exported declaration documentation change?
   - TSDoc purpose, sensitive-data handling, date/time formats, or provider behavior
   - If yes, run the API report and spelling/Markdown checks, then review the affected current docs.

## Completion Rule

Before closing work, explicitly state one of:

- "Updated docs:" followed by the current docs changed
- "Reviewed docs, no updates needed:" followed by the reason
