import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SigninDto): Promise<any> {
    const user: User = await this.usersService.findByLoginAndPassword(
      signinDto.login,
      signinDto.password,
    );

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    const payload = { userId: user.id, login: user.login };
    const accessToken: string = this.jwtService.sign(payload);
    const refreshToken: string = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
    return { accessToken, refreshToken };
  }

  async signUp(body: SignupDto): Promise<User> {
    return this.usersService.createUser(body.login, body.password);
  }

  async refresh(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const newPayload = { userId: payload.userId, login: payload.login };

      const accessToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      });
      const newRefreshToken = this.jwtService.sign(newPayload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      });

      return { accessToken, refreshToken: newRefreshToken };
    } catch {
      throw new ForbiddenException('Invalid or expired refresh token');
    }
  }
}
