import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth-user/guards/role-guard';
import { AuthGuard } from './auth-user/guards/auth-guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'udtn',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Disable in production
    }),
    ProductModule,
    AuthUserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
  
  ],
})
export class AppModule {}
