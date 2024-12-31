import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Role('admin')
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @ApiBody({
    description: 'Product data to be created',
    type: CreateProductDto,
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all products' })
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to retrieve',
    type: Number,
  })
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Role('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to update',
    type: Number,
  })
  @ApiBody({
    description: 'Updated product data',
    type: UpdateProductDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Role('admin')
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to delete',
    type: Number,
  })
  async remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}