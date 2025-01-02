import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Role, Roles } from 'src/auth-user/decorators/decorator-role';
import { RolesGuard } from 'src/auth-user/guards/role-guard';
import { AuthGuard } from 'src/auth-user/guards/auth-guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
  @ApiQuery({
    name: 'page',
    description: 'Page number for pagination',
    required: false,
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of items per page',
    required: false,
    type: Number,
    example: 10,
  })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return await this.productService.findAll(page, limit);
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

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  @ApiBearerAuth('access_token')
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
     await this.productService.update(id, updateProductDto);
    return 'product has been updated successfully';
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiBearerAuth('access_token')
  @ApiParam({
    name: 'id',
    description: 'The ID of the product to delete',
    type: Number,
  })
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return 'product has been deleted successfully'

  }
}
