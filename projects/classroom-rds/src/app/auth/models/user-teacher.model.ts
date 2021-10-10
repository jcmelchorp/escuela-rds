
export interface UserTeacher {
  id: string;
  uid?: string;
  curp?: string;
  rfc: string;
  permission: string
  dayOfBirth?: string;
  gender?: 'Hombre' | 'Mujer';
  role?: string;
  phones?: [{

  }];
  addresses: {
    /** The address type. Acceptable values: custom, home, other, work. */
    type: 'custom' | 'home' | 'other' | 'work',
    /** The street address, such as 1600 Amphitheatre Parkway. Whitespace within the string is ignored; however, newlines are significant. */
    streetAddress: string,
    /** Indicates if the user-supplied address was formatted. Formatted addresses are not currently supported. */
    sourceIsStructured: boolean,
    /** The abbreviated province or state. */
    region: string,
    /** If this is the user's primary address. The addresses list may contain only one primary address. */
    primary: boolean,
    /** The ZIP or postal code, if applicable. */
    postalCode: string;
    /** The post office box, if present. */
    poBox: string,
    /** The town or city of the address. */
    locality: string,
    /** A full and unstructured postal address. This is not synced with the structured address fields. */
    formatted: string,
    /** For extended addresses, such as an address that includes a sub-region. */
    externalAddress: string,
    /** If the address type is custom, this property contains the custom value. */
    customType: string,
    /** The country code. Uses the ISO 3166-1 standard. */
    countryCode: string
    /** Country. */
    country: string
  };
}
