// create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product A',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A high-quality product.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 100.5,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Stock quantity of the product',
    example: 20,
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
