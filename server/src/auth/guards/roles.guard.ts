import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Get roles from @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ],
    );

    // If no roles are defined, allow access
    if (!requiredRoles) {
      return true;
    }

    // Get logged-in user
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Check user's role
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}