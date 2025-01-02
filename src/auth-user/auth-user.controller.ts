import { Controller, Post, Body } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { CreateAuthUserDto } from './dto/create-auth-user.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register User' })
  @ApiBody({
    type: CreateAuthUserDto,
    description: 'Regitration payload',
  })
  register(@Body() body: CreateAuthUserDto) {
    return this.authUserService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({
    type: LoginDto,
    description: 'Regitration payload',
  })
  async login(@Body() body: LoginDto) {
    return await this.authUserService.login(body);
  }
}
