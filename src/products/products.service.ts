import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  /**
   * Add new product to the list
   * @param title - Product title
   * @param description Product description
   * @param price - Product price
   */
  addProduct(title: string, description: string, price: number): string {
    const prodId: string = Math.random().toString();
    const newProduct = new Product(prodId, title, description, price);

    this.products.push(newProduct);

    return prodId;
  }

  /**
   * Get all products
   * @returns List of products
   */
  getProducts(): Product[] {
    // Return copy from the products array
    return [...this.products];
  }

  /**
   * Get single product from the list
   * @param prodId - The product id to return
   * @returns Product if found
   */
  getSingleProduct(prodId: string): Product {
    const product: Product = this.findProduct(prodId)[0];
    return { ...product };
  }

  /**
   * Update specified product
   * @param prodId The product id to update
   * @param prodData The new product data
   */
  updateProduct(
    prodId: string,
    prodData: { title: string; desc: string; price: number },
  ) {
    const [product, productIndex] = this.findProduct(prodId);
    const updatedProduct = { ...product };

    if (prodData.title) updatedProduct.title = prodData.title;
    if (prodData.desc) updatedProduct.desc = prodData.desc;
    if (prodData.price && prodData.price > 0)
      updatedProduct.price = prodData.price;

    this.products[productIndex] = updatedProduct;
  }

  /**
   * Delete specified product with given id
   * @param prodId The product id
   */
  deleteProduct(prodId: string) {
    const productIndex: number = this.findProduct(prodId)[1];
    this.products.splice(productIndex, 1);
  }

  /**
   * Search for product and return it along with its index
   * @param prodId - The product id to find it.
   * @returns tuple of [product and index]
   */
  private findProduct(
    prodId: string,
  ): [product: Product, productIndex: number] {
    const productIndex: number = this.products.findIndex(
      (p) => p.id === prodId,
    );
    const product: Product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Product not found ❌💔');
    }
    return [product, productIndex];
  }
}
