import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'role',
      context.getHandler(),
    );
    console.log('Required Roles:', requiredRoles); // Log required roles
    const user = context.switchToHttp().getRequest().user;
    console.log('User from request:', user); // Log user object
    return requiredRoles.some((role) => user?.roles?.includes(role)); // Check user roles
  }
  
}
