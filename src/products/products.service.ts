import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  constructor() {}
  private products: Product[] = [];
  insertProduct(title: string, description: string, price: number) {
    const productId = Math.random().toString().slice(3, 7);
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProductDetails(productId: string) {
    const result = this.findOne(productId)[0];
    return { ...result };
  }

  update(productId: string, title: string, description: string, price: number) {
    const [product, index] = this.findOne(productId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;
    return (this.products[index] = updatedProduct);
  }

  delete(productId: string) {
    const index = this.findOne(productId)[1];
    this.products.splice(index, 1);
    return { msg: 'Deleted successfully' };
  }

  private findOne(productId: string): [Product, number] {
    const productIndex = this.products.findIndex((val) => val.id == productId);
    const product = this.products[productIndex];
    if (!product) throw new NotFoundException('Could not find any product');
    return [product, productIndex];
  }
}
