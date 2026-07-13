/** Normalization operations applied to configured text fields, in array order. @public */
export type ValueNormalization = 'TRIM' | 'UPPERCASE' | 'REMOVE_SPACES';

/** Configurable presentation and validation rules for a text field. @public */
export interface FieldRuleSettings {
  /** User-visible label, or `null` when the consumer supplies one. */
  label: string | null;
  /** Input placeholder, or `null` when none is configured. */
  placeholder: string | null;
  /** Validation-pattern source, or `null` when no pattern is configured. */
  pattern: string | null;
  /** Maximum input length, or `null` when no limit is configured. */
  maxLength: number | null;
  /** Text normalization operations to apply before validation. */
  normalization: ValueNormalization[];
  /** User-facing help text, or `null` when none is configured. */
  helpText: string | null;
}

/** Field rules for a national identifier. @public */
export interface NationalIdSettings extends FieldRuleSettings {
  /** Validator identifier understood by the consuming application, or `null`. */
  validatorKey: string | null;
}

/** Field rules for a club member code. @public */
export interface MemberCodeSettings extends FieldRuleSettings {}

/** Configuration for an optional federation region-code field. @public */
export interface FederationRegionCodeSettings {
  /** User-visible label, or `null` when the consumer supplies one. */
  label: string | null;
  /** User-facing help text, or `null` when none is configured. */
  helpText: string | null;
  /** Whether this field is enabled for the club. */
  enabled: boolean;
  /** Permitted region-code values; an empty array permits no predefined values. */
  allowedValues: string[];
}

/** Sport selected for a club. @public */
export interface ClubSportSettings {
  /** Sport code, or `null` before configuration. */
  code: string | null;
  /** Sport display name, or `null` before configuration. */
  name: string | null;
}

/** Personal-data settings owned by a club. @public */
export interface ClubPersonalDataSettings {
  /** National-identifier field configuration. */
  nationalId: NationalIdSettings;
}

/** Membership settings owned by a club. @public */
export interface ClubMembershipSettings {
  /** Member-code field configuration. */
  memberCode: MemberCodeSettings;
}

/** Federation settings owned by a club. @public */
export interface ClubFederationSettings {
  /** Federation region-code configuration. */
  regionCode: FederationRegionCodeSettings;
}

/** Audit metadata stored with club settings. @public */
export interface ClubSettingsMetadata {
  /** Optimistic-concurrency or schema version, or `null` when unset. */
  version: number | null;
  /** Last update instant, when tracked by the provider. */
  updatedAt?: Date;
  /** UID of the last updater, or `null` when unset. */
  updatedByUid: string | null;
}

/** Complete configuration shared by a club. @public */
export interface ClubSettings {
  /** ISO-style country code, or `null` before configuration. */
  countryCode: string | null;
  /** IANA time-zone identifier, or `null` before configuration. */
  timeZone: string | null;
  /** Selected sport configuration. */
  sport: ClubSportSettings;
  /** Personal-data configuration. */
  personalData: ClubPersonalDataSettings;
  /** Membership configuration. */
  clubMembership: ClubMembershipSettings;
  /** Federation configuration. */
  federations: ClubFederationSettings;
  /** Audit metadata. */
  metadata: ClubSettingsMetadata;
}

/** Creates the canonical empty text-field rule configuration. @public */
export function createEmptyFieldRuleSettings(): FieldRuleSettings {
  return {
    label: null,
    placeholder: null,
    pattern: null,
    maxLength: null,
    normalization: [],
    helpText: null
  };
}

/** Creates the canonical empty club-settings object without applying business defaults. @public */
export function createEmptyClubSettings(): ClubSettings {
  return {
    countryCode: null,
    timeZone: null,
    sport: {
      code: null,
      name: null
    },
    personalData: {
      nationalId: {
        ...createEmptyFieldRuleSettings(),
        validatorKey: null
      }
    },
    clubMembership: {
      memberCode: createEmptyFieldRuleSettings()
    },
    federations: {
      regionCode: {
        enabled: false,
        allowedValues: [],
        label: null,
        helpText: null
      }
    },
    metadata: {
      version: null,
      updatedByUid: null
    }
  };
}
