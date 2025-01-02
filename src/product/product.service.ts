import { BadRequestException, Injectable } from '@nestjs/common';
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
  async findAll(page: number = 1, limit: number = 10): Promise<{ data: Product[], meta: { hasPrevious: boolean, hasNext: boolean, total: number } }> {
    const [products, total] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const hasPrevious = page > 1;
    const hasNext = page * limit < total;
  
    return {
      meta: {
        hasPrevious,
        hasNext,
        total,
      },
      data: products,
    };
  }  

  async findOne(id: any): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      select: {},
    });

    if (!product) {
      throw new BadRequestException('Product not found ')
    }
    return product;
  }

  async update(id: number, updateProductDto: any): Promise<any> {
    const product = await this.productRepository.update(id, updateProductDto);
     if (!product) {
      throw new BadRequestException('Product not found ')
    }
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.delete(id);    
    if (!product.affected) {
      throw new BadRequestException('Product not found ')
    }
  }
}
