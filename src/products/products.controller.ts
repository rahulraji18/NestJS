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

@Controller('products')
export class ProductController {
  constructor(public readonly productService: ProductService) {}
  @Post()
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
  getProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductDetails(@Param('id') productId: string) {
    return this.productService.getProductDetails(productId);
  }

  @Put(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return this.productService.update(productId, title, description, price);
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string) {
    return this.productService.delete(productId);
  }
}
