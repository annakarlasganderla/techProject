
import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthDto, AuthResponse } from '../dto/auth.dto';
  import { UsersService } from '../../users/services/users.service';
  import { JwtService } from '@nestjs/jwt';
  
  @Injectable()
  export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}
  
    public async login(authDto: AuthDto): Promise<AuthResponse> {
      const { userName, password } = authDto;
  
      try {
        const user = await this.usersService.findByLogin(userName);
  
        if (
            user &&
            !(await this.usersService.isPasswordsEqual(password, user.password))
          ) {
            throw new UnauthorizedException();
          }
  
        const payload = { username: userName, sub: user.id };
  
        return {
          access_token: await this.jwtService.signAsync(payload, {
            secret: 'ssandkbafdheiwe5234@$#56666',
          }),
        };
      } catch (e) {
        throw new NotFoundException(e.message);
      }
    }
  }
  