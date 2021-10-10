export interface UserAuth {
  id: string;
  uid?: string;
  isAdmin?: boolean;
  isNew?: boolean;
  isOnline?: boolean;
  isTeacher?: boolean;
  isVerified?: boolean;
  primaryEmail?: string;
  photoUrl?: string;
  name?: {
    givenName?: string;
    familyName?: string;
    fullName?: string
  };
  creationTime?: string;
  lastLoginTime?: string;
}
