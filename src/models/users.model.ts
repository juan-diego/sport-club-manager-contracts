import type { UserRole, UserStatus } from './auth.model.js';
import type { FederationLicense } from './federations.models.js';

/** Lifecycle states of a club membership. @public */
export enum ClubMembershipStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  SUSPENDED = 'SUSPENDED',
  ENDED = 'ENDED'
}

/** Invitation audit information associated with a user. @public */
export interface UserInvitationInfo {
  /** Expiry instant, when an expiry is configured. */
  expiresAt?: Date;
  /** Creation instant, when tracked. */
  createdAt?: Date;
  /** UID of the user that created the invitation. */
  createdByUid?: string;
  /** Redemption instant, when the invitation was used. */
  usedAt?: Date;
  /** Cancellation instant, when the invitation was cancelled. */
  canceledAt?: Date;
  /** UID of the user that cancelled the invitation. */
  canceledByUid?: string;
  /** Lock instant after unsuccessful attempts, when locked. */
  lockedAt?: Date;
  /** Number of recorded failed redemption attempts. */
  failedAttempts: number;
}

/** A user account and its account-level state. @public */
export interface User {
  /** Stable authentication-provider identifier. */
  uid: string;
  /** Normalized email address, when stored by the provider. */
  emailNormalized?: string;
  /** Account lifecycle status. */
  status: UserStatus;
  /** Creation instant, when tracked. */
  createdAt?: Date;
  /** Last-update instant, when tracked. */
  updatedAt?: Date;
  /** Invitation metadata, when account creation used an invitation. */
  invitation?: UserInvitationInfo;

  /** Returns whether this account is active according to its implementation. */
  isActive(): boolean;
}

/** Personal profile data for a user. @public */
export interface UserProfile {
  /** Stable authentication-provider identifier. */
  uid: string;
  /** Given name. */
  firstName: string;
  /** Family name. */
  lastName: string;
  /** Sensitive national identifier, when collected. */
  nationalId?: string;
  /** Date of birth, when collected. */
  birthDate?: Date;
  /** Creation instant, when tracked. */
  createdAt?: Date;
  /** Last-update instant, when tracked. */
  updatedAt?: Date;
}

/** Club-specific membership data for a user. @public */
export interface ClubMembership {
  /** Stable authentication-provider identifier. */
  uid: string;
  /** Club-issued member code. */
  memberCode: string;
  /** Membership lifecycle status. */
  status: ClubMembershipStatus;
  /** Membership start date or instant, when tracked. */
  memberFrom?: Date;
  /** Membership end date or instant, when tracked. */
  memberTo?: Date;
  /** Creation instant, when tracked. */
  createdAt?: Date;
  /** Last-update instant, when tracked. */
  updatedAt?: Date;
}

/** Fully assembled user data exposed to provider consumers. @public */
export interface UserDetail {
  /** Stable authentication-provider identifier. */
  uid: string;
  /** Account-level state, when loaded. */
  account?: User;
  /** Personal profile data. */
  profile: UserProfile;
  /** Assigned application role, when present. */
  role?: UserRole;
  /** Club membership, when present. */
  membership?: ClubMembership;
  /** Federation licenses held by the user. */
  federationLicenses: FederationLicense[];

  /** Returns whether the user has administrator privileges. */
  isAdmin(): boolean;
  /** Returns whether the user owns the club. */
  isOwner(): boolean;
  /** Returns whether the user account is active. */
  isActive(): boolean;
}

/** Input used to update account configuration. @public */
export interface UserConfigurationUpdate {
  /** Requested account lifecycle status. */
  status: UserStatus;
  /** Requested application role. */
  role: UserRole;
}

/** Input used to update sensitive personal profile data. @public */
export interface UserPersonalDataUpdate {
  /** Requested given name. */
  firstName: string;
  /** Requested family name. */
  lastName: string;
  /** Requested national identifier. Callers must handle it as sensitive data. */
  nationalId: string;
  /** Requested date of birth, when supplied. */
  birthDate?: Date;
}

/** Input used to update club membership data. @public */
export interface UserClubDataUpdate {
  /** Requested club member code. */
  memberCode: string;
  /** Requested membership start date or instant. */
  memberFrom: Date;
  /** Requested membership end date or instant. */
  memberTo: Date;
}

/** Input used to create an invitation-backed user. @public */
export interface UserInvitationCreate {
  /** Email address that will receive the invitation. */
  email: string;
  /** Invitee given name. */
  firstName: string;
  /** Invitee family name. */
  lastName: string;
  /** Invitee national identifier. Callers must handle it as sensitive data. */
  nationalId: string;
  /** Invitee date of birth, when supplied. */
  birthDate?: Date;
  /** Initial club member code. */
  memberCode: string;
  /** Initial membership start date or instant. */
  memberFrom: Date;
  /** Initial membership end date or instant. */
  memberTo: Date;
}

/** Result of creating or regenerating a user invitation. @public */
export interface UserInvitationResult {
  /** UID of the invited user. */
  uid: string;
  /** Sensitive invitation code; callers must not log or persist it unnecessarily. */
  invitationCode: string;
  /** Expiry instant of the returned invitation code. */
  expiresAt: Date;
}
