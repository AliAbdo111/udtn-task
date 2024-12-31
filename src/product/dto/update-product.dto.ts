// update-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Product A',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'Updated description.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 100.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Stock quantity of the product',
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock: number;
}
