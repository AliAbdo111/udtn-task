import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from './product/product.service';
import { Product } from './product/entities/product.entity';

describe('ProductService', () => {
  let service: ProductService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: 'Product1',
      description: 'A great product',
      price: 10,
      stock: 100,
    };
    const product = await service.create(createProductDto);
    expect(product).toBeDefined();
  });

  it('should find all products', async () => {
    const products = await service.findAll();
    expect(products).toBeInstanceOf(Array);
  });
});
