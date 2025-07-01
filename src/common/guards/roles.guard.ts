// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   ForbiddenException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { UserRole } from '../constants/roles.enum';
// import { User } from '../../user/entity/user.entity';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles || requiredRoles.length === 0) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user: User = request.user;
//     console.log('🔐 Incoming user roles:', user?.roles);
//     console.log('🔒 Required roles:', requiredRoles);
//     console.log('👤 User Roles:', request.user?.roles);
//     const userRoles = user.roles?.map(role => role.name) || [];

//     const hasRole = requiredRoles.some(role => userRoles.includes(role));

//     if (!hasRole) {
//       throw new ForbiddenException('You do not have permission to access this resource');
//     }

//     return true;
//   }
// }
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../constants/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userRoles: string[] = Array.isArray(user?.roles) ? user.roles : [];

    console.log('🔐 Incoming user roles:', userRoles);
    console.log('🔒 Required roles:', requiredRoles);

    const hasRole = requiredRoles.some(role => userRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
