import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { KeycloakUserPayload, UserRole } from '@app/common/types';
import { Reflector } from '@nestjs/core';
import { Roles } from '@app/common/decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      const secret = `-----BEGIN PUBLIC KEY-----\n${process.env.KEYCLOAK_PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
      const payload = await this.jwtService.verifyAsync<KeycloakUserPayload>(
        token,
        { secret },
      );
      const user = {
        id: payload.sub,
        role: UserRole.USER,
        username: payload.preferred_username,
        email: payload.email,
        emailVerified: payload.email_verified,
        firstName: payload.given_name,
        lastName: payload.family_name,
        fullName: payload.name,
      };
      request['user'] = user;
      const roles = this.reflector.get(Roles, handler);
      return this.matchRoles(roles, user.role);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private matchRoles(roles: UserRole[], userRole: string): boolean {
    if (!roles || !roles.length) {
      return true;
    }
    return roles.some((role) => role === userRole);
  }
}
