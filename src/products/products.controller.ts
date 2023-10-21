import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './products.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(public readonly productService: ProductService) {}
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'New title',
          description: 'This is sample description',
        },
        description: {
          type: 'string',
          example: 'New title',
          description: 'This is sample description',
        },
        price: {
          type: 'string',
          example: 'New title',
          description: 'This is sample description',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({
    status: 200,
    description: 'Product Created Successfully',
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ): any {
    const productId = this.productService.insertProduct(
      title,
      description,
      price,
    );
    return { id: productId };
  }

  @Get()
  @ApiOperation({ summary: 'Get All Products' })
  @ApiResponse({
    status: 200,
    description: 'Products Listed Successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'New title',
            description: 'This is sample description',
          },
          description: {
            type: 'string',
            example: 'New title',
            description: 'This is sample description',
          },
          price: {
            type: 'string',
            example: 'New title',
            description: 'This is sample description',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  getProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Product Details' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter Product Id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product Details Listed Successfully',
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  getProductDetails(@Param('id') productId: string) {
    return this.productService.getProductDetails(productId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit Product' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter Product Id',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'New title',
          description: 'This is sample description',
        },
        description: {
          type: 'string',
          example: 'New title',
          description: 'This is sample description',
        },
        price: {
          type: 'string',
          example: 'New title',
          description: 'This is sample description',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Product Updated Successfully',
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  updateProduct(
    @Param('id') productId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productService.update(productId, title, description, price);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Product' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Enter Product Id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Product Deleted Successfully',
  })
  @ApiResponse({ status: 400, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  deleteProduct(@Param('id') productId: string) {
    return this.productService.delete(productId);
  }
}
