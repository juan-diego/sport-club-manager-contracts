import type { AuthState, AuthStatus, AuthUser } from './auth.interface.js';

/** Application roles used for authorization decisions. @public */
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER'
}

/** Account lifecycle statuses. @public */
export enum UserStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}

/**
 * Concrete immutable-by-convention representation of an authentication state.
 *
 * @public
 */
export class AuthStateModel implements AuthState {
  constructor(
    /** Current lifecycle status. */
    public status: AuthStatus = 'idle',
    /** Authenticated user, if one is available. */
    public user?: AuthUser,
    /** Safe error description, if authentication failed. */
    public error?: string
  ) {}

  /** Whether the state represents an authenticated user. */
  get isAuthenticated(): boolean {
    return this.status === 'authenticated';
  }

  /** Whether an authentication operation is in progress. */
  get isLoading(): boolean {
    return this.status === 'loading';
  }
}

/**
 * Email and password credentials supplied directly to an authentication provider.
 * Callers must not log or persist the password.
 *
 * @public
 */
export type AuthCredentials = {
  /** User email address. */
  email: string;
  /** Sensitive plaintext password for immediate provider use only. */
  password: string;
};

/** Credentials required to register through an invitation. @public */
export type RegisterCredentials = AuthCredentials & {
  /** Sensitive invitation code used only for the registration request. */
  invitationCode: string;
};
