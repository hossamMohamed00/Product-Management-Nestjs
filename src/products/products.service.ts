import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  /**
   * Add new product to the list
   * @param title - Product title
   * @param desc Product description
   * @param price - Product price
   */
  async addProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });

    const result = await newProduct.save();
    return result.id as string;
  }

  /**
   * Get all products
   * @returns List of products
   */
  async getProducts(): Promise<Product[]> {
    const allProducts = await this.productModel.find().exec();
    // Transform products data
    return allProducts;
  }

  /**
   * Get single product from the list
   * @param prodId - The product id to return
   * @returns Product if found
   */
  async getSingleProduct(prodId: string): Promise<Product> {
    const product: Product = await this.findProduct(prodId);
    return product;
  }

  /**
   * Update specified product
   * @param prodId The product id to update
   * @param prodData The new product data
   */
  async updateProduct(
    prodId: string,
    prodData: { title: string; description: string; price: number },
  ): Promise<Product> {
    const product: Product = await this.findProduct(prodId);

    if (prodData.title) product.title = prodData.title;
    if (prodData.description) product.description = prodData.description;
    if (prodData.price && prodData.price > 0) product.price = prodData.price;

    //* Save the product to database
    await product.save();

    return product;
  }

  /**
   * Delete specified product with given id
   * @param prodId The product id
   */
  async deleteProduct(prodId: string): Promise<Product> {
    return (await (await this.findProduct(prodId)).delete()) as Product;
  }

  /**
   * Search for product and return it
   * @param prodId - The product id to find it.
   * @returns Promise resolved with product
   */
  private async findProduct(prodId: string): Promise<Product> {
    try {
      const product: Product = await this.productModel.findById(prodId);

      if (!product) {
        throw new Error();
      }

      return product;
    } catch (error) {
      throw new NotFoundException('Product not found ❌💔');
    }
  }
}
