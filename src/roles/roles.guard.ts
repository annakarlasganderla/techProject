import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/users/enum/user-type.enum';
import { ROLES_KEY } from './decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, LoginPayload } from 'src/auth/dto/auth.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredRoles) {
      return true;
    }

    const {authorization} = context.switchToHttp().getRequest().headers;
    const  loginPayload: LoginPayload | undefined = await this.jwtService
            .verifyAsync(authorization, {secret: 'ssandkbafdheiwe5234@$#56666' })
            .catch(() => undefined)

    if (!loginPayload) {
        return false;
    }
 
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role == loginPayload.userType );
  }
}