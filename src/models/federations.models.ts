/** Shared identity and scope information for a federation. @public */
export interface FederationInfo {
  /** Persistent federation identifier, absent before creation. */
  id?: string;
  /** Display name of the federation. */
  name: string;
  /** Geographic scope represented by the federation. */
  scope: 'REGIONAL' | 'NATIONAL';
  /** Regional code when the federation has regional scope. */
  regionCode?: string;
}

/** A federation license assigned to a user. @public */
export interface FederationLicense {
  /** Persistent license identifier. */
  id: string;
  /** Federation issuing the license. */
  federation: FederationInfo;
  /** Inclusive start instant of the license validity period. */
  validFrom: Date;
  /** Inclusive end instant of the license validity period. */
  validTo: Date;
}

/** Input used to create or update a federation license. @public */
export interface FederationLicenseMutation {
  /** Identifier of the issuing federation. */
  federationId: string;
  /** Inclusive start instant of the requested validity period. */
  validFrom: Date;
  /** Inclusive end instant of the requested validity period. */
  validTo: Date;
}
