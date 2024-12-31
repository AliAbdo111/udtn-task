import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: any): Promise<any> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: any): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  update(id: number, updateProductDto: any): Promise<Product> {
    return this.productRepository.save({ ...updateProductDto, id });
  }

  async  remove(id: number): Promise<void> {
    await this.productRepository.softDelete(id);
  }
}
