import { describe, expect, it } from 'vitest';

import {
  AuthStateModel,
  createEmptyClubSettings,
  createEmptyFieldRuleSettings
} from '../src/index.js';

describe('AuthStateModel', () => {
  it('reports the existing authentication and loading states', () => {
    expect(new AuthStateModel()).toMatchObject({
      status: 'idle',
      isAuthenticated: false,
      isLoading: false
    });
    expect(new AuthStateModel('authenticated').isAuthenticated).toBe(true);
    expect(new AuthStateModel('loading').isLoading).toBe(true);
  });
});

describe('empty club settings factories', () => {
  it('creates the established empty field-rule value', () => {
    expect(createEmptyFieldRuleSettings()).toEqual({
      label: null,
      placeholder: null,
      pattern: null,
      maxLength: null,
      normalization: [],
      helpText: null
    });
  });

  it('creates the established empty club-settings value', () => {
    expect(createEmptyClubSettings()).toEqual({
      countryCode: null,
      timeZone: null,
      sport: { code: null, name: null },
      personalData: {
        nationalId: {
          label: null,
          placeholder: null,
          pattern: null,
          maxLength: null,
          normalization: [],
          helpText: null,
          validatorKey: null
        }
      },
      clubMembership: {
        memberCode: {
          label: null,
          placeholder: null,
          pattern: null,
          maxLength: null,
          normalization: [],
          helpText: null
        }
      },
      federations: {
        regionCode: { enabled: false, allowedValues: [], label: null, helpText: null }
      },
      metadata: { version: null, updatedByUid: null }
    });
  });
});
