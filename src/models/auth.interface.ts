import type { UserDetail } from './users.model.js';
import type { UserRole } from './auth.model.js';

/**
 * Authorization claims attached to an authenticated user.
 *
 * @public
 */
export interface AuthClaims {
  /** Assigned application role, when available. */
  role?: UserRole;
  /** Whether the identity has administrator privileges. */
  admin?: boolean;
  /** Whether the identity owns the club. */
  owner?: boolean;
}

/** Lifecycle states reported by an authentication provider. @public */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

/**
 * Authentication identity and optionally loaded account data.
 *
 * @public
 */
export interface AuthUser {
  /** Stable authentication-provider identifier. */
  uid: string;
  /** Email address supplied by the authentication provider, when available. */
  email?: string;
  /** Authorization claims resolved for this identity, when available. */
  claims?: AuthClaims;
  /** Loaded user detail associated with this identity, when available. */
  profile?: UserDetail;
}

/**
 * Current authentication state returned or emitted by providers.
 *
 * @public
 */
export interface AuthState {
  /** Current lifecycle status. */
  status: AuthStatus;
  /** Authenticated identity; absent when no identity is available. */
  user?: AuthUser;
  /** Safe, user-displayable failure description; never include credentials or secrets. */
  error?: string;
}
