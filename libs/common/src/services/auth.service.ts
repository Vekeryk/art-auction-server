import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { KeycloakUserPayload, UserRole } from '@app/common/types';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateToken(token?: string) {
    if (!token) return null;
    try {
      const secret = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
      const payload = await this.jwtService.verifyAsync<KeycloakUserPayload>(
        token,
        { secret },
      );
      return {
        id: payload.sub,
        role: UserRole.USER,
        username: payload.preferred_username,
        email: payload.email,
        emailVerified: payload.email_verified,
        firstName: payload.given_name,
        lastName: payload.family_name,
        fullName: payload.name,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
