import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const realm_access = request.user.realm_access.roles;
    const roleExists = realm_access.includes('company');
    if (!roleExists) {
      return false;
    }
    return true;
  }
}
