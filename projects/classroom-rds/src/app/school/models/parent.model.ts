
export interface Parent {
  userId?: string;
  /** The user's full name formed by concatenating the first and last name values. */
  fullName?: string,
  /** The user's last name. Required when creating a user account. */
  familyName?: string,
  /** The user's first name. Required when creating a user account. */
  givenName?: string
  curp?: string;
  /** The user's gender. The maximum allowed data size for this field is 1Kb. */
  gender?: 'Hombre' | 'Mujer'
  relation?: {
    type?: 'Madre' | 'Padre' | 'Otro',
    custom?: string,
  };
  phones?: [{
    value?: string;
    type?: 'Fijo' | 'Movil' | 'Trabajo';
    primary?: boolean;
    customType?: string
  }];
  email?: string;
  streetAddress?: string,
  neightborhood?: string;
  city?: string;
  postalCode?: string;
  municipio?: string;
  state?: string;
}

