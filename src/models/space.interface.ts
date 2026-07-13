/** A reservable club space. @public */
export interface Space {
  /** Persistent space identifier. */
  id: string;
  /** User-visible space name. */
  name: string;
  /** Optional user-visible description. */
  description?: string;
  /** Whether the space can currently accept registrations. */
  isActive: boolean;
}

/** A user's reservation of a club space. @public */
export interface SpaceRegistration {
  /** Persistent registration identifier. */
  id: string;
  /** Identifier of the reserved space. */
  spaceId: string;
  /** Display name captured for the reserved space. */
  spaceName: string;
  /** UID of the registered user. */
  userId: string;
  /** Display name captured for the registered user. */
  userDisplayName: string;
  /** Optional user note. */
  note?: string;
  /** Local club date key in `YYYY-MM-DD` format. */
  date: string;
  /** Local club start time in the consumer's configured format. */
  startTime: string;
  /** Optional slot start time when it differs from the displayed start time. */
  startSlotTime?: string;
  /** Optional local club end time. */
  endTime?: string;
  /** Absolute reservation start instant. */
  startAt: Date;
  /** Absolute reservation end instant, when applicable. */
  endAt?: Date;
  /** Creation instant, when tracked by the provider. */
  createdAt?: Date;
  /** Last-update instant, when tracked by the provider. */
  updatedAt?: Date;
}

/** Input used to create a space registration. @public */
export interface SpaceRegistrationCreate {
  /** Identifier of the space to reserve. */
  spaceId: string;
  /** Optional user note. */
  note?: string;
  /** Local club date key in `YYYY-MM-DD` format. */
  date: string;
  /** Local club start time. */
  startTime: string;
  /** Optional local club end time. */
  endTime?: string;
}

/** Input used to update a space registration. @public */
export interface SpaceRegistrationUpdate {
  /** Identifier of the space to reserve. */
  spaceId: string;
  /** Optional user note. */
  note?: string;
  /** Local club date key in `YYYY-MM-DD` format. */
  date: string;
  /** Local club start time. */
  startTime: string;
  /** Optional local club end time. */
  endTime?: string;
}

/** Server and club time context used to evaluate registrations. @public */
export interface SpaceRegistrationContext {
  /** IANA time-zone identifier for the club. */
  clubTimeZone: string;
  /** Current server instant as an ISO 8601 string. */
  serverNowIso: string;
  /** Current club-local instant as an ISO 8601 string. */
  clubNowIso: string;
  /** Current club date key in `YYYY-MM-DD` format. */
  clubTodayDateKey: string;
}
