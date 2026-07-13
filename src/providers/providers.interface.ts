import type { Observable } from 'rxjs';

import type { AuthState } from '../models/auth.interface.js';
import type { ClubSettings } from '../models/club-settings.model.js';
import type {
  UserClubDataUpdate,
  UserConfigurationUpdate,
  UserInvitationCreate,
  UserInvitationResult,
  UserPersonalDataUpdate,
  UserDetail
} from '../models/users.model.js';
import type { AuthCredentials, RegisterCredentials, UserRole } from '../models/auth.model.js';
import type { FederationInfo, FederationLicenseMutation } from '../models/federations.models.js';
import type {
  Space,
  SpaceRegistration,
  SpaceRegistrationContext,
  SpaceRegistrationCreate,
  SpaceRegistrationUpdate
} from '../models/space.interface.js';

/** Backend-agnostic authentication operations. @public */
export interface AuthProvider {
  /** Emits authentication-state changes; consumers must handle provider errors. */
  readonly authState$: Observable<AuthState>;

  /** Returns the provider's current cached authentication state. */
  getAuthState(): AuthState;

  /** Authenticates credentials and resolves the resulting state. */
  login(credentials: AuthCredentials): Promise<AuthState>;
  /** Registers invitation credentials and resolves the resulting state. */
  register(credentials: RegisterCredentials): Promise<AuthState>;
  /** Ends the current authenticated session. */
  logout(): Promise<void>;
}

/** Operations for retrieving and maintaining user details. @public */
export interface UserDetailProvider {
  /** Emits the requested user detail and provider errors. */
  get(uid: string): Observable<UserDetail>;
  /** Emits all user details visible to the caller and provider errors. */
  getAll(): Observable<UserDetail[]>;
  /** Persists account status and role changes for a user. */
  updateConfiguration(uid: string, configuration: UserConfigurationUpdate): Promise<void>;
  /** Persists sensitive personal-data changes for a user. */
  updatePersonalData(uid: string, personalData: UserPersonalDataUpdate): Promise<void>;
  /** Persists club-membership changes for a user. */
  updateClubData(uid: string, clubData: UserClubDataUpdate): Promise<void>;
  /** Creates a federation license and resolves its persistent identifier. */
  createFederationLicense(uid: string, license: FederationLicenseMutation): Promise<string>;
  /** Updates an existing federation license. */
  updateFederationLicense(uid: string, licenseId: string, license: FederationLicenseMutation): Promise<void>;
  /** Deletes an existing federation license. */
  deleteFederationLicense(uid: string, licenseId: string): Promise<void>;
}

/** Invitation and registration operations. @public */
export interface RegistrationProvider {
  /** Completes registration for invitation credentials. */
  completeRegistration(credentials: RegisterCredentials): Promise<void>;
  /** Creates an invitation and resolves its sensitive, short-lived result. */
  createUserInvitation(invitation: UserInvitationCreate): Promise<UserInvitationResult>;
  /** Generates a replacement invitation code for a user. */
  regenerateInvitationCode(uid: string): Promise<UserInvitationResult>;
  /** Cancels the user's outstanding invitation. */
  cancelInvitation(uid: string): Promise<void>;
}

/** Privileged role-management operations. Implementations must authorize every call. @public */
export interface RoleProvider {
  /** Assigns an application role to a user. */
  setUserRole(uid: string, role: UserRole): Promise<void>;
  /** Resolves the role assigned to a user. */
  getUserRole(uid: string): Promise<UserRole>;
  /** Resolves roles keyed by user UID. */
  getUserRoles(uids: string[]): Promise<Record<string, UserRole>>;
  /**
   * Initializes the first owner using a one-time sensitive bootstrap secret.
   * Implementations must authorize this operation and must never log the password or secret.
   */
  bootstrapFirstOwner(email: string, password: string, secret: string): Promise<void>;
}

/** Read and write operations for the club-wide settings object. @public */
export interface ClubSettingsProvider {
  /** Emits settings or `null` when no settings record exists. */
  get(): Observable<ClubSettings | null>;
  /** Replaces or persists the supplied settings object. */
  update(settings: ClubSettings): Promise<void>;
}

/** Operations for federation records. @public */
export interface FederationProvider {
  /** Emits all federation records visible to the caller. */
  getAll(): Observable<FederationInfo[]>;
  /** Emits the requested federation record. */
  get(id: string): Observable<FederationInfo>;
  /** Creates a federation and resolves its persistent identifier. */
  create(federation: Omit<FederationInfo, 'id'>): Promise<string>;
  /** Applies the supplied partial federation changes. */
  update(id: string, federation: Partial<FederationInfo>): Promise<void>;
  /** Deletes a federation record. */
  delete(id: string): Promise<void>;
}

/** Operations for reservable spaces. @public */
export interface SpaceProvider {
  /** Emits all spaces visible to the caller. */
  getAll(): Observable<Space[]>;
  /** Emits a space or `undefined` when it does not exist. */
  get(id: string): Observable<Space | undefined>;
  /** Creates a new space. */
  create(space: Omit<Space, 'id'>): Promise<void>;
  /** Applies the supplied partial space changes. */
  update(id: string, space: Partial<Space>): Promise<void>;
  /** Deletes a space. */
  delete(id: string): Promise<void>;
}

/** Operations for reservations of club spaces. @public */
export interface SpaceRegistrationProvider {
  /** Emits registrations for a local club date key in `YYYY-MM-DD` format. */
  getByDate(date: string): Observable<SpaceRegistration[]>;
  /** Emits a user's registrations at or after the supplied absolute instant. */
  getUpcomingForUser(userId: string, fromDateTime: Date): Observable<SpaceRegistration[]>;
  /** Resolves the server and club time context used by registration consumers. */
  getContext(): Promise<SpaceRegistrationContext>;
  /** Creates a space registration. */
  create(registration: SpaceRegistrationCreate): Promise<void>;
  /** Updates a space registration. */
  update(id: string, registration: SpaceRegistrationUpdate): Promise<void>;
  /** Deletes a space registration. */
  delete(id: string): Promise<void>;
}
