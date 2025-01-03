import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './guards/auth-guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME || '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthUserModule {}
