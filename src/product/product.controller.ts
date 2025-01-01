import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth-user/decorators/decorator-role';
import { RolesGuard } from 'src/auth-user/guard/role-guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @ApiBearerAuth('access_token')
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
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