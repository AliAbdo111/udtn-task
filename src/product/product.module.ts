import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthUserModule } from 'src/auth-user/auth-user.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthUserModule, TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, JwtService],
})
export class ProductModule {}
