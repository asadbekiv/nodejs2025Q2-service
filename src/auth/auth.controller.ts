import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signinDto: SigninDto) {
    // this.loggingService.log(`Log in ${body.login}`,'Auth');

    return this.authService.signIn(signinDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Public()
  @Post('signup')
  signUp(@Body() signupDto: SignupDto) {
    // this.loggingService.log(`Sign up ${body.login}`,'Auth');
    return this.authService.signUp(signupDto);
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    // this.loggingService.log(`Refresh Token`,'Auth');
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }
    return this.authService.refresh(refreshToken);
  }
}
