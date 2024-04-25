export enum UserRole {
  USER = 'user',
  MODERATOR = 'moderator',
}

export type KeycloakUserPayload = {
  exp: number;
  realm_access: {
    roles: string[];
  };
  resource_access: { account: { roles: string[] } };
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
};

export type RequestUser = {
  id: string;
  role: UserRole;
  username: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  fullName: string;
};
