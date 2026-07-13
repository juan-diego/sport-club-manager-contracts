# Package Architecture

This document describes the intended architecture and maintenance boundaries for
`@sport-club-manager/contracts`.

## Role In The System

This package sits at the center of the Sport Club Manager architecture.

It defines:

- shared provider contracts
- shared domain model types referenced by those contracts

It is consumed by:

- the application frontend
- the Firebase connector package
- the Firebase backend

## Ownership Boundaries

This package owns:

- TypeScript interfaces and types that represent shared domain concepts
- provider contracts that application code depends on
- package-level compatibility and export rules

This package must not own:

- dependency-injection tokens
- application bootstrapping helpers
- Firebase Auth, Firestore, or Functions integration code
- application feature services, routes, pages, or templates
- backend deployment or runtime configuration

## Current Export Structure

Primary entrypoints:

- root package export for common consumers
- `models` subpath export for shared model types
- `providers` subpath export for provider contracts

Current model groups:

- auth
- users
- club settings
- federations
- spaces

Current provider contracts:

- `AuthProvider`
- `UserDetailProvider`
- `RegistrationProvider`
- `RoleProvider`
- `ClubSettingsProvider`
- `FederationProvider`
- `SpaceProvider`
- `SpaceRegistrationProvider`

The source and generated API report are the detailed contract inventory. Provider methods return
RxJS `Observable` values for reactive reads and `Promise` values for mutations; provider
implementations are responsible for their authorization, validation, and error semantics.

## Reactive Contract Shape

The package uses RxJS `Observable` for reactive provider contracts.

Consumer-specific adapters belong outside this package.

## Compatibility Expectations

- Exported interfaces, enums, classes, and type aliases are shared API.
- Breaking changes must be deliberate and coordinated with all consuming repositories.
- Additive changes are preferred.
- Renaming or moving exported symbols requires documentation updates and consumer rollout work.

## Change Rules

When changing this package, verify all of the following:

- no imports point into application repositories such as frontend or backend source trees
- source dependencies remain limited to RxJS and relative package modules
- no dependency-injection or Firebase implementation details are introduced
- public exports remain intentional and documented
- consumer-facing documentation stays aligned with the code
- every exported declaration has accurate TSDoc, and `npm run api:check` has been run
- the quality gate in `README.md` passes

## Package Boundary

The package contains shared contract and model concerns. Consumer integration and infrastructure
behavior stay in consuming repositories.
